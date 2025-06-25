import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import ProductCategory from "@/lib/Models/product-category"
import { decodeJwtToken } from "@/lib/Services/queryFn"

export async function GET(request: Request) {
  try {
    // Get token from cookies
    const cookieHeader = request.headers.get("cookie") || ""
    const tokenCookie = cookieHeader.split(";").find((c) => c.trim().startsWith("admin_token="))

    if (!tokenCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = tokenCookie.split("=")[1]
    const decoded = decodeJwtToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDb()

    // Get query parameters
    const url = new URL(request.url)
    const type = url.searchParams.get("type")

    // Build query
    const query: any = {}
    if (type) {
      query.type = type
    }

    const categories = await ProductCategory.find(query).sort({ order: 1 })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching product categories:", error)
    return NextResponse.json({ error: "Failed to fetch product categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Get token from cookies
    const cookieHeader = request.headers.get("cookie") || ""
    const tokenCookie = cookieHeader.split(";").find((c) => c.trim().startsWith("admin_token="))

    if (!tokenCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = tokenCookie.split("=")[1]
    const decoded = decodeJwtToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDb()

    const data = await request.json()

    // Validate required fields
    if (!data.id || !data.title || !data.description || !data.image || !data.type || !data.icon || !data.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if category with this ID already exists
    const existingCategory = await ProductCategory.findOne({ id: data.id })
    if (existingCategory) {
      return NextResponse.json({ error: "A category with this ID already exists" }, { status: 400 })
    }

    // Create new category
    const category = await ProductCategory.create(data)

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error creating product category:", error)
    return NextResponse.json({ error: "Failed to create product category" }, { status: 500 })
  }
}

