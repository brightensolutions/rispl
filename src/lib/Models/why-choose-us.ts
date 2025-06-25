import mongoose from "mongoose"

// Schema for each card in the Why Choose Us section
const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // Store the icon name
  gradient: { type: String, required: true },
  delay: { type: Number, default: 0.1 },
})

// Schema for accomplishments
const accomplishmentSchema = new mongoose.Schema({
  text: { type: String, required: true },
})

// Main Why Choose Us schema
const whyChooseUsSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true, default: "Why Choose Us" },
  pageSubtitle: {
    type: String,
    required: true,
    default: "Our Packaging Solution protects your Product to scale up to Next Level",
  },
  backgroundImage: {
    type: String,
    required: true,
    default: "/images/rispl-why-choes-us.jpg",
  },
  cards: [cardSchema],
  accomplishments: [accomplishmentSchema],
  updatedAt: { type: Date, default: Date.now },
})

const WhyChooseUsModel = mongoose.models["whychooseus"] || mongoose.model("whychooseus", whyChooseUsSchema)

export default WhyChooseUsModel

