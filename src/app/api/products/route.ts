import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import productCategory from "@/lib/Models/product-category"
export async function GET(request: Request) {
  try {
    await connectDb()

    // Get query parameters
    const url = new URL(request.url)
    const type = url.searchParams.get("type")

    // Build query
    const query: any = { isActive: true }
    if (type) {
      query.type = type
    }

    const categories = await productCategory.find(query).sort({ order: 1 })

    return NextResponse.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error("Error fetching product categories:", error)
    return NextResponse.json({ error: "Failed to fetch product categories" }, { status: 500 })
  }
}

