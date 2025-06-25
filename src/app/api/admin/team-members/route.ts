import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import TeamMemberModel from "@/lib/Models/team-member"
import { decodeJwtToken } from "@/lib/Services/queryFn"

// GET all team members
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

    // Get all team members, sorted by order
    const teamMembers = await TeamMemberModel.find({}).sort({ order: 1 })

    return NextResponse.json({ success: true, data: teamMembers })
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch team members" }, { status: 500 })
  }
}

// POST create a new team member
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
    if (!data.name || !data.role || !data.image) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Create new team member
    const newTeamMember = new TeamMemberModel({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await newTeamMember.save()

    return NextResponse.json(
      { success: true, message: "Team member created successfully", data: newTeamMember },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json({ success: false, message: "Failed to create team member" }, { status: 500 })
  }
}

