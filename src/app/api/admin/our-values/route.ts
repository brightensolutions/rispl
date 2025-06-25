import { type NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/db"
import OurValuesModel from "@/lib/Models/our-values"
import { decodeJwtToken } from "@/lib/Services/queryFn"

// GET - Fetch the Our Values page content for admin
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

    // Find the Our Values page content or create default if none exists
    let ourValuesContent = await OurValuesModel.findOne({})

    if (!ourValuesContent) {
      // Create default content if none exists
      ourValuesContent = await OurValuesModel.create({
        pageTitle: "Our Values",
        pageSubtitle: "Our Packaging Solution protects your Product to scale up to Next Level",
        backgroundImage: "/images/rispl-ourValue.jpg",
        values: [
          {
            icon: "Users",
            title: "Customer-Centric Approach",
            description:
              "RISPL places customers at the forefront of everything we do. We are dedicated to understanding our customers' needs, preferences, and challenges to provide tailored packaging solutions.",
            gradient: "from-[#012a54] to-[#005281]",
            category: "Foundation",
          },
          {
            icon: "Shield",
            title: "Quality Excellence",
            description:
              "We maintain an unwavering commitment to quality. Our products and services are designed and delivered with the highest standards in mind.",
            gradient: "from-[#005281] to-[#0072a3]",
            category: "Core Values",
          },
          {
            icon: "Lightbulb",
            title: "Innovation",
            description:
              "Innovation is at the heart of our company. We continuously seek out new technologies, materials, and design approaches to develop cutting-edge packaging solutions.",
            gradient: "from-[#0072a3] to-[#bda03b]",
            category: "Growth",
          },
          {
            icon: "Heart",
            title: "Integrity and Ethics",
            description:
              "We conduct business with the utmost integrity and ethics. Our relationships with customers, partners, and employees are built on trust, honesty, and transparency.",
            gradient: "from-[#bda03b] to-[#ecdc77]",
            category: "Core Values",
          },
          {
            icon: "Leaf",
            title: "Environmental Responsibility",
            description:
              "RISPL recognizes the importance of sustainability. We actively work to reduce environmental impact by offering eco-friendly materials and promoting sustainable practices.",
            gradient: "from-[#ecdc77] to-[#EDC967]",
            category: "Responsibility",
          },
          {
            icon: "TrendingUp",
            title: "Continuous Improvement",
            description:
              "RISPL believes in the power of continuous improvement. We are dedicated to refining our processes and enhancing our offerings.",
            gradient: "from-[#012a54] to-[#005281]",
            category: "Growth",
          },
          {
            icon: "Users2",
            title: "Team Collaboration",
            description:
              "Our success is driven by the collective effort of our talented and diverse team. We foster a collaborative work environment.",
            gradient: "from-[#005281] to-[#0072a3]",
            category: "People",
          },
          {
            icon: "Shuffle",
            title: "Adaptability",
            description:
              "RISPL understands the ever-changing business landscape. We remain adaptable and agile, ready to respond to new challenges and opportunities.",
            gradient: "from-[#0072a3] to-[#bda03b]",
            category: "Growth",
          },
          {
            icon: "HardHat",
            title: "Safety",
            description:
              "Safety is paramount in our operations. We prioritize the well-being of our employees, customers, and partners by adhering to strict safety protocols.",
            gradient: "from-[#bda03b] to-[#ecdc77]",
            category: "Responsibility",
          },
          {
            icon: "HandHeart",
            title: "Community Engagement",
            description:
              "We believe in giving back to the communities where we operate. RISPL actively engages in philanthropic initiatives and supports community development efforts.",
            gradient: "from-[#ecdc77] to-[#EDC967]",
            category: "Responsibility",
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: ourValuesContent })
  } catch (error) {
    console.error("Error fetching our-values content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch our-values content" }, { status: 500 })
  }
}

// PUT - Update the Our Values page content
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
    if (!data.pageTitle || !data.pageSubtitle || !data.values) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Find and update the Our Values page content
    const ourValuesContent = await OurValuesModel.findOne({})

    if (!ourValuesContent) {
      // Create new if none exists
      await OurValuesModel.create({
        ...data,
        updatedAt: new Date(),
      })
    } else {
      // Update existing
      await OurValuesModel.findByIdAndUpdate(ourValuesContent._id, {
        ...data,
        updatedAt: new Date(),
      })
    }

    return NextResponse.json({ success: true, message: "Our Values content updated successfully" })
  } catch (error) {
    console.error("Error updating our-values content:", error)
    return NextResponse.json({ success: false, message: "Failed to update our-values content" }, { status: 500 })
  }
}

