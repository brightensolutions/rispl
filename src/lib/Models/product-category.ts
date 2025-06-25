import mongoose, { Schema, type Document } from "mongoose"

export interface ProductFeature {
  title: string
  description: string
}

export interface ProductSpecification {
  name: string
  value: string
}

export interface ProductVariant {
  name: string
  description: string
  features?: string[]
}

export interface ProductCategory extends Document {
  id: string
  title: string
  description: string
  image: string
  type: "equipment" | "consumables"
  icon: string
  name: string
  gallery: string[]
  features?: string[]
  specifications?: ProductSpecification[]
  benefits?: ProductFeature[]
  variants?: ProductVariant[]
  applications?: string[]
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductCategorySchema = new Schema<ProductCategory>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true, enum: ["equipment", "consumables"] },
    icon: { type: String, required: true },
    name: { type: String, required: true },
    gallery: [{ type: String }],
    features: [{ type: String }],
    specifications: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    benefits: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    variants: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        features: [{ type: String }],
      },
    ],
    applications: [{ type: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export default mongoose.models.ProductCategory ||
  mongoose.model<ProductCategory>("ProductCategory", ProductCategorySchema)

