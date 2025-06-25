import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import adminModel from "@/lib/Models/admin"
import { findOneRecord, decodeJwtToken } from "@/lib/Services/queryFn" 

export async function GET(req: NextRequest) {
  try {
    await connectDb()

    const token = req.cookies.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const decoded = decodeJwtToken(token)

    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const admin = await findOneRecord(adminModel, { _id: decoded.id })

    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin not found" }, { status: 401 })
    }

    return NextResponse.json(
      {
        success: true,
        admin: {
          id: admin._id,
          email: admin.email,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during verification" }, { status: 500 })
  }
}

