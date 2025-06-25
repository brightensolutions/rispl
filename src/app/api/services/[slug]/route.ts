import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import Service from "@/lib/Models/service"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params

    await connectDb()

    // Decode the URL slug to handle spaces and special characters
    const decodedSlug = decodeURIComponent(resolvedParams.slug)

    // Try to find the service by slug (exact match)
    let service = await Service.findOne({
      slug: decodedSlug,
      isActive: true,
    })

    // If not found, try a case-insensitive search
    if (!service) {
      service = await Service.findOne({
        slug: { $regex: new RegExp(`^${decodedSlug}$`, "i") },
        isActive: true,
      })
    }

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error("Error fetching service:", error)
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 })
  }
}

