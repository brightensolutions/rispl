import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import TeamMemberModel from "@/lib/Models/team-member"
import { decodeJwtToken } from "@/lib/Services/queryFn"

// GET a single team member by ID
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

    const teamMember = await TeamMemberModel.findById(resolvedParams.id)

    if (!teamMember) {
      return NextResponse.json({ success: false, message: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: teamMember })
  } catch (error) {
    console.error("Error fetching team member:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch team member" }, { status: 500 })
  }
}

// PUT update a team member
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

    // Update the team member
    const updatedTeamMember = await TeamMemberModel.findByIdAndUpdate(
      resolvedParams.id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true },
    )

    if (!updatedTeamMember) {
      return NextResponse.json({ success: false, message: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Team member updated successfully",
      data: updatedTeamMember,
    })
  } catch (error) {
    console.error("Error updating team member:", error)
    return NextResponse.json({ success: false, message: "Failed to update team member" }, { status: 500 })
  }
}

// DELETE a team member
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

    const deletedTeamMember = await TeamMemberModel.findByIdAndDelete(resolvedParams.id)

    if (!deletedTeamMember) {
      return NextResponse.json({ success: false, message: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Team member deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting team member:", error)
    return NextResponse.json({ success: false, message: "Failed to delete team member" }, { status: 500 })
  }
}

