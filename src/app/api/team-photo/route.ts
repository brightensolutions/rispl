import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import TeamPhotoModel from "@/lib/Models/team-photo"

export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Find the team photo content (there should be only one document)
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
    console.error("Error fetching team photo:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch team photo" }, { status: 500 })
  }
}

