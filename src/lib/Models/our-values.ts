import mongoose from "mongoose"

// Schema for each value card in the Our Values section
const valueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // Store the icon name
  gradient: { type: String, required: true },
  category: { type: String, required: true },
})

// Main Our Values schema
const ourValuesSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true, default: "Our Values" },
  pageSubtitle: {
    type: String,
    required: true,
    default: "Our Packaging Solution protects your Product to scale up to Next Level",
  },
  backgroundImage: {
    type: String,
    required: true,
    default: "/images/rispl-ourValue.jpg",
  },
  values: [valueSchema],
  updatedAt: { type: Date, default: Date.now },
})

const OurValuesModel = mongoose.models["ourvalues"] || mongoose.model("ourvalues", ourValuesSchema)

export default OurValuesModel

