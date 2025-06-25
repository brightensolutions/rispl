import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import TeamPhotoModel from "@/lib/Models/team-photo"
import { decodeJwtToken } from "@/lib/Services/queryFn"

// GET team photo content for admin
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

    // Find the team photo content
    let teamPhoto = await TeamPhotoModel.findOne({})

    // If no content exists, create default content
    if (!teamPhoto) {
      teamPhoto = await TeamPhotoModel.create({
        title: "Team - Adil Group Of Industries",
        description: "Together we work towards excellence, innovation, and customer satisfaction.",
        image: "/images/group-photo.avif",
        ctaText: "Learn more about our team",
        ctaLink: "#",
        updatedAt: new Date(),
      })
    }

    return NextResponse.json({ success: true, data: teamPhoto })
  } catch (error) {
    console.error("Error fetching team photo content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch team photo content" }, { status: 500 })
  }
}

// PUT update team photo content
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
    const requiredFields = ["title", "description", "image"]

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ success: false, message: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Find and update the team photo content
    const teamPhoto = await TeamPhotoModel.findOne({})

    if (teamPhoto) {
      // Update existing content
      Object.assign(teamPhoto, {
        ...data,
        updatedAt: new Date(),
      })
      await teamPhoto.save()
    } else {
      // Create new content if none exists
      await TeamPhotoModel.create({
        ...data,
        updatedAt: new Date(),
      })
    }

    return NextResponse.json({
      success: true,
      message: "Team photo content updated successfully",
    })
  } catch (error) {
    console.error("Error updating team photo content:", error)
    return NextResponse.json({ success: false, message: "Failed to update team photo content" }, { status: 500 })
  }
}

