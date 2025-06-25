import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import ProductCategory from "@/lib/Models/product-category"
import { decodeJwtToken } from "@/lib/Services/queryFn"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params

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

    const category = await ProductCategory.findOne({ id: resolvedParams.id })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error fetching product category:", error)
    return NextResponse.json({ error: "Failed to fetch product category" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params

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
    if (!data.title || !data.description || !data.image || !data.type || !data.icon || !data.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update category
    const category = await ProductCategory.findOneAndUpdate({ id: resolvedParams.id }, data, {
      new: true,
      runValidators: true,
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error updating product category:", error)
    return NextResponse.json({ error: "Failed to update product category" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params

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

    const category = await ProductCategory.findOneAndDelete({ id: resolvedParams.id })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product category:", error)
    return NextResponse.json({ error: "Failed to delete product category" }, { status: 500 })
  }
}

