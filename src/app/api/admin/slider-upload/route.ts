import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { decodeJwtToken } from "@/lib/Services/queryFn"

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
    const token = req.cookies.get("admin_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = decodeJwtToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 })
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ success: false, message: "Only image files are allowed" }, { status: 400 })
    }

    // Generate a unique filename with folder structure
    const cleanFileName = file.name.replace(/\s+/g, "-")
    const filename = `rispl/slider/${Date.now()}-${cleanFileName}`

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
      message: "File uploaded successfully",
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ success: false, message: "Failed to upload file" }, { status: 500 })
  }
}

// This config is important to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
}

