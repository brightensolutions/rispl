import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import ClientModel from "@/lib/Models/client"

// GET all active clients (public API)
export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Get only active clients, sorted by order
    const clients = await ClientModel.find({ active: true }).sort({ order: 1 })

    return NextResponse.json({ success: true, data: clients })
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch clients" }, { status: 500 })
  }
}

