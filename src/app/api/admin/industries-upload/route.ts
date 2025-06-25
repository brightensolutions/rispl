import { NextResponse } from "next/server"
import { decodeJwtToken } from "@/lib/Services/queryFn"
import { put } from "@vercel/blob"

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(request: Request) {
  try {
    // Verify admin authentication from cookies
    const cookieHeader = request.headers.get("cookie") || ""
    const tokenCookie = cookieHeader.split(";").find((c) => c.trim().startsWith("admin_token="))

    if (!tokenCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = tokenCookie.split("=")[1]
    const decoded = decodeJwtToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Process the file upload
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 })
    }

    // Get file as array buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate a unique filename
    const timestamp = Date.now()
    const filename = `rispl/industries/${timestamp}-${file.name.replace(/\s+/g, "-")}`

    // Upload to Vercel Blob
    const { url } = await put(filename, buffer, {
      contentType: file.type,
      access: "public",
    })

    return NextResponse.json({ success: true, url })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

