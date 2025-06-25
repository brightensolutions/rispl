import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import industry from "@/lib/Models/industry"

export async function GET() {
  try {
    await connectDb()

    const industries = await industry.find({ isActive: true }).sort({ order: 1 }).select("title slug shortDescription")

    return NextResponse.json(industries)
  } catch (error) {
    console.error("Error fetching industries:", error)
    return NextResponse.json({ error: "Failed to fetch industries" }, { status: 500 })
  }
}

