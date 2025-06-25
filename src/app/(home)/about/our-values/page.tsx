import OurValuesTimeline from "./our-values-timeline"
import connectDb from "@/lib/db/db"
import OurValuesModel from "@/lib/Models/our-values"

export default async function OurValuesPage() {
  let ourValuesContent = null

  try {
    await connectDb()
    const content = await OurValuesModel.findOne({})
    if (content) {
      ourValuesContent = content.toObject()
    }
  } catch (error) {
    console.error("Error fetching our-values content:", error)
    // Use default content if database fetch fails
  }

  return <OurValuesTimeline content={ourValuesContent} />
}

