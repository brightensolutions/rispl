import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import MissionVisionModel from "@/lib/Models/mission-vision"
import { decodeJwtToken } from "@/lib/Services/queryFn"

// GET mission-vision content for admin
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

    // Find the mission-vision content
    let content = await MissionVisionModel.findOne({})

    // If no content exists, create default content
    if (!content) {
      content = await MissionVisionModel.create({
        mission:
          "To Develop Innovative, Optimal, Recyclable and Sustainable Packaging Solutions & Supply Chain for our Customer. Always Deliver Products and services to exceed customer expectations.",
        vision:
          "Our vision is to work towards Next Generation Packaging and improve current packaging standards of the industry.",
        chairmanMessage:
          "It is my promise that we will continue to invest and do our part to help the people wherever we operate.",
        chairmanName: "Mr. Aadil Patel",
        chairmanTitle: "Chairman, RISPL Group",
        chairmanImage: "/images/aadil.jpg",
        backgroundImage: "/images/our-mission-bg.jpg",
        yearsExperience: 25,
        updatedAt: new Date(),
      })
    }

    return NextResponse.json({ success: true, data: content })
  } catch (error) {
    console.error("Error fetching mission-vision content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch mission-vision content" }, { status: 500 })
  }
}

// PUT update mission-vision content
export async function PUT(req: NextRequest) {
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
    const requiredFields = [
      "mission",
      "vision",
      "chairmanMessage",
      "chairmanName",
      "chairmanTitle",
      "chairmanImage",
      "backgroundImage",
      "yearsExperience",
    ]

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ success: false, message: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Find and update the mission-vision content
    const content = await MissionVisionModel.findOne({})

    if (content) {
      // Update existing content
      Object.assign(content, {
        ...data,
        updatedAt: new Date(),
      })
      await content.save()
    } else {
      // Create new content if none exists
      await MissionVisionModel.create({
        ...data,
        updatedAt: new Date(),
      })
    }

    return NextResponse.json({
      success: true,
      message: "Mission-Vision content updated successfully",
    })
  } catch (error) {
    console.error("Error updating mission-vision content:", error)
    return NextResponse.json({ success: false, message: "Failed to update mission-vision content" }, { status: 500 })
  }
}

