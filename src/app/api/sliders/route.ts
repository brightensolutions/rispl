import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import SliderModel from "@/lib/Models/slider"

export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Get only active sliders, sorted by order
    const sliders = await SliderModel.find({ active: true }).sort({ order: 1 })

    return NextResponse.json({ success: true, data: sliders })
  } catch (error) {
    console.error("Error fetching sliders:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch sliders" }, { status: 500 })
  }
}

