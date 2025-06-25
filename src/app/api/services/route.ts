import { NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import  Service  from "@/lib/Models/service"
export async function GET() {
  try {
    await connectDb()

    const services = await Service.find({ isActive: true }).sort({ order: 1 }).select("title slug description")

    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

