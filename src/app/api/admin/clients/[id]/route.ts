import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import ClientModel from "@/lib/Models/client"
import { decodeJwtToken } from "@/lib/Services/queryFn"

// GET a single client by ID
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params
    
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

    const client = await ClientModel.findById(resolvedParams.id)

    if (!client) {
      return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: client })
  } catch (error) {
    console.error("Error fetching client:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch client" }, { status: 500 })
  }
}

// PUT update a client
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params
    
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

    // Update the client
    const updatedClient = await ClientModel.findByIdAndUpdate(
      resolvedParams.id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true },
    )

    if (!updatedClient) {
      return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Client updated successfully",
      data: updatedClient,
    })
  } catch (error) {
    console.error("Error updating client:", error)
    return NextResponse.json({ success: false, message: "Failed to update client" }, { status: 500 })
  }
}

// DELETE a client
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params Promise to get the actual values
    const resolvedParams = await params
    
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

    const deletedClient = await ClientModel.findByIdAndDelete(resolvedParams.id)

    if (!deletedClient) {
      return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Client deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting client:", error)
    return NextResponse.json({ success: false, message: "Failed to delete client" }, { status: 500 })
  }
}
