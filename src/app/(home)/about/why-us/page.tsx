import WhyChooseUsSection from "./why-choose-us-section"
import connectDb from "@/lib/db/db"
import WhyChooseUsModel from "@/lib/Models/why-choose-us"

export default async function WhyChooseUsPage() {
  let whyChooseUsContent = null

  try {
    await connectDb()
    const content = await WhyChooseUsModel.findOne({})
    if (content) {
      whyChooseUsContent = content.toObject()
    }
  } catch (error) {
    console.error("Error fetching why-choose-us content:", error)
    // Use default content if database fetch fails
  }

  return <WhyChooseUsSection content={whyChooseUsContent} />
}

