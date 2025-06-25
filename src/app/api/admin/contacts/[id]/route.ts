import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import ContactModel from "@/lib/Models/contact"
import { decodeJwtToken } from "@/lib/Services/queryFn"

// GET a single contact by ID
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

    const contact = await ContactModel.findById(resolvedParams.id)

    if (!contact) {
      return NextResponse.json({ success: false, message: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: contact })
  } catch (error) {
    console.error("Error fetching contact:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch contact" }, { status: 500 })
  }
}

// PATCH update a contact's status
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    // Update the contact status
    const updatedContact = await ContactModel.findByIdAndUpdate(
      resolvedParams.id,
      { status: data.status },
      { new: true },
    )

    if (!updatedContact) {
      return NextResponse.json({ success: false, message: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Contact status updated successfully",
      data: updatedContact,
    })
  } catch (error) {
    console.error("Error updating contact status:", error)
    return NextResponse.json({ success: false, message: "Failed to update contact status" }, { status: 500 })
  }
}

// DELETE a contact
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

    const deletedContact = await ContactModel.findByIdAndDelete(resolvedParams.id)

    if (!deletedContact) {
      return NextResponse.json({ success: false, message: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return NextResponse.json({ success: false, message: "Failed to delete contact" }, { status: 500 })
  }
}

