import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import SliderModel from "@/lib/Models/slider"
import { decodeJwtToken } from "@/lib/Services/queryFn"

// GET all sliders
export async function GET(req: NextRequest) {
  try {
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

    // Get all sliders, sorted by order
    const sliders = await SliderModel.find({}).sort({ order: 1 })

    return NextResponse.json({ success: true, data: sliders })
  } catch (error) {
    console.error("Error fetching sliders:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch sliders" }, { status: 500 })
  }
}

// POST create a new slider
export async function POST(req: NextRequest) {
  try {
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

    // Validate required fields
    if (!data.title || !data.description || !data.image || !data.highlight) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Create new slider
    const newSlider = new SliderModel({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await newSlider.save()

    return NextResponse.json(
      { success: true, message: "Slider created successfully", data: newSlider },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating slider:", error)
    return NextResponse.json({ success: false, message: "Failed to create slider" }, { status: 500 })
  }
}

