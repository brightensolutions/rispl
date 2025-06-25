import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import industry from "@/lib/Models/industry"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params

    await connectDb()

    const Industry = await industry.findOne({
      slug: resolvedParams.slug,
      isActive: true,
    })

    if (!Industry) {
      return NextResponse.json({ error: "Industry not found" }, { status: 404 })
    }

    return NextResponse.json(Industry)
  } catch (error) {
    console.error("Error fetching industry:", error)
    return NextResponse.json({ error: "Failed to fetch industry" }, { status: 500 })
  }
}

