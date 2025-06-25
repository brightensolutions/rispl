import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import MissionVisionModel from "@/lib/Models/mission-vision"

// GET mission-vision content
export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Find the mission-vision content (there should be only one document)
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

