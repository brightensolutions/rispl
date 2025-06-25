import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Product from "@/lib/Models/product"
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
    const categoryId = url.searchParams.get("categoryId")

    // Build query
    const query: any = {}
    if (categoryId) {
      query.categoryId = categoryId
    }

    const products = await Product.find(query).sort({ order: 1 })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
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
    if (!data.id || !data.categoryId || !data.name || !data.description || !data.gallery || data.gallery.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if product with this ID already exists
    const existingProduct = await Product.findOne({ id: data.id })
    if (existingProduct) {
      return NextResponse.json({ error: "A product with this ID already exists" }, { status: 400 })
    }

    // Create new product
    const product = await Product.create(data)

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

