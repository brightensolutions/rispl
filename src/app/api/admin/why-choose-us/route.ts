import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import WhyChooseUsModel from "@/lib/Models/why-choose-us"
import { decodeJwtToken } from "@/lib/Services/queryFn"

// GET - Fetch the Why Choose Us page content for admin
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

    // Find the Why Choose Us page content or create default if none exists
    let whyChooseUsContent = await WhyChooseUsModel.findOne({})

    if (!whyChooseUsContent) {
      // Create default content if none exists
      whyChooseUsContent = await WhyChooseUsModel.create({
        pageTitle: "Why Choose Us",
        pageSubtitle: "Our Packaging Solution protects your Product to scale up to Next Level",
        backgroundImage: "/images/rispl-why-choes-us.jpg",
        cards: [
          {
            title: "Our Packaging Solution",
            description:
              "Our Packaging Solution protects your Product to scale up to Next Level. We have rich expertise with renowned experienced resources to derive the best solutions.",
            icon: "Package",
            gradient: "from-[#012a54] to-[#005281]",
            delay: 0.1,
          },
          {
            title: "Three Decades of Excellence",
            description:
              "People at RISPL has more than Three decades of Experience in Industrial automation & long-term Operational Contracts & are known for Improving load integrity.",
            icon: "Clock",
            gradient: "from-[#005281] to-[#0072a3]",
            delay: 0.2,
          },
          {
            title: "Innovation Commitment",
            description:
              "We are committed for innovation that has resulted in developing & marketing new products that continue to address the market's ever-changing supply chain needs.",
            icon: "Lightbulb",
            gradient: "from-[#0072a3] to-[#bda03b]",
            delay: 0.3,
          },
        ],
        accomplishments: [
          {
            text: "Received large scale appreciation by senior management including Executive Director for high standard of performance in managing, executing with exceptional Quality of work in POY plant of Reliance Industries Ltd.",
          },
          {
            text: "Recieved appreciation by Hindustan Coca Cola Beverages Pvt. Ltd. for exemplary performance in Maintanance and quality related activities.",
          },
          {
            text: "Effectively handled major Manpower crisis in Coca Cola during closure of their plant in Surat, maintaining high compliances letigation.",
          },
          {
            text: "Produced 730 kms. Length of HDPE pipe against established record of 540 kms.",
          },
          {
            text: "Recieved performance safety award in RIL complex level safety competition.",
          },
          {
            text: "Innovation by managing repair of returnable plastic units from scrap & reuse the same without any dimensional change of the unit thus making substantial saving.",
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: whyChooseUsContent })
  } catch (error) {
    console.error("Error fetching why-choose-us content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch why-choose-us content" }, { status: 500 })
  }
}

// PUT - Update the Why Choose Us page content
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
    if (!data.pageTitle || !data.pageSubtitle || !data.cards || !data.accomplishments) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Find and update the Why Choose Us page content
    const whyChooseUsContent = await WhyChooseUsModel.findOne({})

    if (!whyChooseUsContent) {
      // Create new if none exists
      await WhyChooseUsModel.create({
        ...data,
        updatedAt: new Date(),
      })
    } else {
      // Update existing
      await WhyChooseUsModel.findByIdAndUpdate(whyChooseUsContent._id, {
        ...data,
        updatedAt: new Date(),
      })
    }

    return NextResponse.json({ success: true, message: "Why Choose Us content updated successfully" })
  } catch (error) {
    console.error("Error updating why-choose-us content:", error)
    return NextResponse.json({ success: false, message: "Failed to update why-choose-us content" }, { status: 500 })
  }
}

