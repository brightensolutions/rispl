import mongoose, { Schema, type Document } from "mongoose"

export interface ServiceFeature {
  title: string
  description: string
  image: string
}

export interface ServiceImage {
  src: string
  alt: string
}

export interface ServiceSection {
  title: string
  description: string
  features?: ServiceFeature[]
  images?: ServiceImage[]
}

export interface Service extends Document {
  slug: string
  title: string
  subtitle: string
  description: string
  headerImage: string
  order: number
  isActive: boolean
  sections: ServiceSection[]
  createdAt: Date
  updatedAt: Date
}

const ServiceSchema = new Schema<Service>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    headerImage: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    sections: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        features: [
          {
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String, required: true },
          },
        ],
        images: [
          {
            src: { type: String, required: true },
            alt: { type: String, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true },
)

export default mongoose.models.Service || mongoose.model<Service>("Service", ServiceSchema)

