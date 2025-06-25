import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import industry from "@/lib/Models/industry"
import { decodeJwtToken } from "@/lib/Services/queryFn"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params
    
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

    const Industry = await industry.findById(resolvedParams.id)

    if (!Industry) {
      return NextResponse.json({ error: "Industry not found" }, { status: 404 })
    }

    return NextResponse.json(Industry)
  } catch (error) {
    console.error("Error fetching industry:", error)
    return NextResponse.json({ error: "Failed to fetch industry" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params
    
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

    // If slug is being changed, check if the new slug already exists
    if (data.slug) {
      const existingIndustry = await industry.findOne({
        slug: data.slug,
        _id: { $ne: resolvedParams.id },
      })

      if (existingIndustry) {
        return NextResponse.json({ error: "An industry with this slug already exists" }, { status: 400 })
      }
    }

    const Industry = await industry.findByIdAndUpdate(resolvedParams.id, data, { new: true, runValidators: true })

    if (!Industry) {
      return NextResponse.json({ error: "Industry not found" }, { status: 404 })
    }

    return NextResponse.json(Industry)
  } catch (error) {
    console.error("Error updating industry:", error)
    return NextResponse.json({ error: "Failed to update industry" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params
    
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

    const Industry = await industry.findByIdAndDelete(resolvedParams.id)

    if (!Industry) {
      return NextResponse.json({ error: "Industry not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting industry:", error)
    return NextResponse.json({ error: "Failed to delete industry" }, { status: 500 })
  }
}

