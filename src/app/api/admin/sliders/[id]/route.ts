import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import SliderModel from "@/lib/Models/slider"
import { decodeJwtToken } from "@/lib/Services/queryFn"

// GET a single slider by ID
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params

    await connectDb()

    // Verify admin authentication
    const token = req.cookies.get("admin_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = decodeJwtToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const slider = await SliderModel.findById(resolvedParams.id)

    if (!slider) {
      return NextResponse.json({ success: false, message: "Slider not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: slider })
  } catch (error) {
    console.error("Error fetching slider:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch slider" }, { status: 500 })
  }
}

// PUT update a slider
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params

    await connectDb()

    // Verify admin authentication
    const token = req.cookies.get("admin_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = decodeJwtToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const data = await req.json()

    // Update the slider
    const updatedSlider = await SliderModel.findByIdAndUpdate(
      resolvedParams.id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true },
    )

    if (!updatedSlider) {
      return NextResponse.json({ success: false, message: "Slider not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Slider updated successfully",
      data: updatedSlider,
    })
  } catch (error) {
    console.error("Error updating slider:", error)
    return NextResponse.json({ success: false, message: "Failed to update slider" }, { status: 500 })
  }
}

// DELETE a slider
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params

    await connectDb()

    // Verify admin authentication
    const token = req.cookies.get("admin_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = decodeJwtToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const deletedSlider = await SliderModel.findByIdAndDelete(resolvedParams.id)

    if (!deletedSlider) {
      return NextResponse.json({ success: false, message: "Slider not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Slider deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting slider:", error)
    return NextResponse.json({ success: false, message: "Failed to delete slider" }, { status: 500 })
  }
}

