import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import ClientModel from "@/lib/Models/client"
import { decodeJwtToken } from "@/lib/Services/queryFn"

// GET all clients (admin)
export async function GET(req: NextRequest) {
  try {
    await connectDb()

    // Verify admin authentication
    const token = req.cookies.get("admin_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = decodeJwtToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    // Get all clients, sorted by order
    const clients = await ClientModel.find({}).sort({ order: 1 })

    return NextResponse.json({ success: true, data: clients })
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch clients" }, { status: 500 })
  }
}

// POST create a new client
export async function POST(req: NextRequest) {
  try {
    await connectDb()

    // Verify admin authentication
    const token = req.cookies.get("admin_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = decodeJwtToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const data = await req.json()

    // Validate required fields
    if (!data.name || !data.image) {
      return NextResponse.json({ success: false, message: "Name and image are required" }, { status: 400 })
    }

    // Create new client
    const newClient = new ClientModel({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await newClient.save()

    return NextResponse.json(
      { success: true, message: "Client created successfully", data: newClient },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating client:", error)
    return NextResponse.json({ success: false, message: "Failed to create client" }, { status: 500 })
  }
}

