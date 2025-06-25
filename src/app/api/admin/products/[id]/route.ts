import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Product from "@/lib/Models/product"
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

    const product = await Product.findOne({ id: resolvedParams.id })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
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
    if (!data.categoryId || !data.name || !data.description || !data.gallery || data.gallery.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update product
    const product = await Product.findOneAndUpdate({ id: resolvedParams.id }, data, { new: true, runValidators: true })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
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

    const product = await Product.findOneAndDelete({ id: resolvedParams.id })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}

