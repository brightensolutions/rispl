import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import industry from "@/lib/Models/industry"
import { decodeJwtToken } from "@/lib/Services/queryFn"
export async function GET(request: Request) {
  try {
    // Get token from cookies instead of headers
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

    await connectDb()

    const industries = await industry.find().sort({ order: 1 })

    return NextResponse.json(industries)
  } catch (error) {
    console.error("Error fetching industries:", error)
    return NextResponse.json({ error: "Failed to fetch industries" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Get token from cookies instead of headers
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

    await connectDb()

    const data = await request.json()

    // Create a URL-friendly slug from the title if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
    } else {
      // Ensure the slug is URL-friendly even if provided
      data.slug = data.slug
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
    }

    // Check if slug already exists
    const existingIndustry = await industry.findOne({ slug: data.slug })
    if (existingIndustry) {
      return NextResponse.json({ error: "An industry with this slug already exists" }, { status: 400 })
    }

    const Industry = await industry.create(data)

    return NextResponse.json(Industry)
  } catch (error) {
    console.error("Error creating industry:", error)
    return NextResponse.json({ error: "Failed to create industry" }, { status: 500 })
  }
}

