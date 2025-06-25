import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import adminModel from "@/lib/Models/admin"
import { findOneRecord , verifyPassword,
    generateJwtToken,
    findOneAndUpdateRecord,
    ensureDefaultAdmin, } from "@/lib/Services/queryFn"

export async function POST(req: NextRequest) {
  try {
    await connectDb()

    // Ensure default admin exists
    await ensureDefaultAdmin()

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    const admin = await findOneRecord(adminModel, { email })

    if (!admin) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    const isPasswordValid = verifyPassword(admin.password, password)

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Generate new token
    const token = generateJwtToken(admin._id.toString())

    // Update admin with new token
    await findOneAndUpdateRecord(adminModel, { _id: admin._id }, { token })

    // Set HTTP-only cookie with the token
    const response = NextResponse.json({ success: true, message: "Login successful" }, { status: 200 })

    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during login" }, { status: 500 })
  }
}

