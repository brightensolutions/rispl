import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import AboutModel from "@/lib/Models/about"
import { decodeJwtToken } from "@/lib/Services/queryFn"

// GET - Fetch the About page content for admin
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

    // Find the About page content or create default if none exists
    let aboutContent = await AboutModel.findOne({})

    if (!aboutContent) {
      // Create default content if none exists
      aboutContent = await AboutModel.create({
        pageTitle: "About Us",
        pageSubtitle: "Meet our experienced professionals dedicated to your success",
        backgroundImage: "/images/rispl-comapny.jpg",
        sections: [
          {
            title: "Who We Are",
            content:
              "We are a group of technocrats with a wealth of experience and expertise behind us, with the Company name as Imperial Pack Masterz (RISPL). We offer Customized Packaging solutions, with well supported service support, to diverse customer segments with trusted Products & best practices.",
            icon: "Building2",
            items: [],
          },
          {
            title: "Our Services",
            content:
              "RISPL is one of well-known Industrial Packaging Solutions Providers, which Covers full range of Secondarily packaging requirements.",
            icon: "PackageCheck",
            items: [
              "Labeling",
              "Wrapping",
              "Strapping",
              "Taping",
              "Case packing",
              "Shrink Packaging",
              "Protective Packaging",
              "Services",
              "Consultancy",
              "Consumables",
              "Packaging Evaluations",
              "Contract Packaging",
            ],
          },
          {
            title: "International Partnerships",
            content:
              "We are also representing Various International Brands (Automation Equipment Manufacturers) to handle large and corporates business requirements for automation across India.",
            icon: "Globe2",
            items: [],
          },
          {
            title: "Technology & Innovation",
            content:
              "We adopted new Palletizing Technology in the Logistic, Supply Chain & Warehouse industry and follow 5's Ps:",
            icon: "Settings2",
            items: ["Pallet Stability", "Pallet Replacement", "Profitable", "Product Protection", "Product Efficiency"],
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: aboutContent })
  } catch (error) {
    console.error("Error fetching about content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch about content" }, { status: 500 })
  }
}

// PUT - Update the About page content
export async function PUT(req: NextRequest) {
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
    if (!data.pageTitle || !data.pageSubtitle || !data.sections) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Find and update the About page content
    const aboutContent = await AboutModel.findOne({})

    if (!aboutContent) {
      // Create new if none exists
      await AboutModel.create({
        ...data,
        updatedAt: new Date(),
      })
    } else {
      // Update existing
      await AboutModel.findByIdAndUpdate(aboutContent._id, {
        ...data,
        updatedAt: new Date(),
      })
    }

    return NextResponse.json({ success: true, message: "About content updated successfully" })
  } catch (error) {
    console.error("Error updating about content:", error)
    return NextResponse.json({ success: false, message: "Failed to update about content" }, { status: 500 })
  }
}

