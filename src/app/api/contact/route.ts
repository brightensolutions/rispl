import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import ContactModel from "@/lib/Models/contact"

export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const data = await req.json()

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    // Create new contact inquiry
    const newContact = new ContactModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      subject: data.subject,
      message: data.message,
      createdAt: new Date(),
    })

    await newContact.save()

    return NextResponse.json({ success: true, message: "Contact inquiry submitted successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error submitting contact inquiry:", error)
    return NextResponse.json({ success: false, message: "Failed to submit contact inquiry" }, { status: 500 })
  }
}

