import mongoose, { Schema, type Document } from "mongoose"

export interface ServiceCard {
  image: string
  title: string
  description: string
}

export interface Industry extends Document {
  title: string
  slug: string
  description: string
  shortDescription: string
  headerImage: string
  pageTitle: string
  pageSubtitle: string
  mainTitle: string
  highlightedTitle: string
  mainDescription: string
  bottomDescription: string
  buttonText: string
  cards: ServiceCard[]
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const IndustrySchema = new Schema<Industry>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    headerImage: { type: String, required: true },
    pageTitle: { type: String, required: true },
    pageSubtitle: { type: String, required: true },
    mainTitle: { type: String, required: true },
    highlightedTitle: { type: String, required: true },
    mainDescription: { type: String, required: true },
    bottomDescription: { type: String, required: true },
    buttonText: { type: String, required: true, default: "Get Started" },
    cards: [
      {
        image: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export default mongoose.models.Industry || mongoose.model<Industry>("Industry", IndustrySchema)

