import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import TeamMemberModel from "@/lib/Models/team-member"

export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Get only active team members, sorted by order
    const teamMembers = await TeamMemberModel.find({ active: true }).sort({ order: 1 })

    return NextResponse.json({ success: true, data: teamMembers })
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch team members" }, { status: 500 })
  }
}

