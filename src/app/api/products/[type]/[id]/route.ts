import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import productCategory from "@/lib/Models/product-category"

export async function GET(request: Request, { params }: { params: Promise<{ type: string; id: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params
    
    await connectDb()

    // Validate type parameter
    if (resolvedParams.type !== "equipment" && resolvedParams.type !== "consumables") {
      return NextResponse.json({ error: "Invalid product type" }, { status: 400 })
    }

    const category = await productCategory.findOne({
      id: resolvedParams.id,
      type: resolvedParams.type,
      isActive: true,
    })

    if (!category) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: category,
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
