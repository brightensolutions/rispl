import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import ContactModel from "@/lib/Models/contact"
import { decodeJwtToken } from "@/lib/Services/queryFn"

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

    // Get query parameters for pagination
    const url = new URL(req.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const status = url.searchParams.get("status") || ""

    // Build query
    const query: any = {}
    if (status) {
      query.status = status
    }

    // Get total count for pagination
    const total = await ContactModel.countDocuments(query)

    // Get contacts with pagination
    const contacts = await ContactModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch contacts" }, { status: 500 })
  }
}

