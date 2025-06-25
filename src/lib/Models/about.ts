import mongoose from "mongoose"

// Schema for each section in the About page
const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  icon: { type: String, required: true }, // Store the icon name
  items: [{ type: String }], // For lists like services or technologies
})

// Main About page schema
const aboutSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true, default: "About Us" },
  pageSubtitle: {
    type: String,
    required: true,
    default: "Meet our experienced professionals dedicated to your success",
  },
  backgroundImage: {
    type: String,
    required: true,
    default: "/images/rispl-comapny.jpg",
  },
  sections: [sectionSchema],
  updatedAt: { type: Date, default: Date.now },
})

const AboutModel = mongoose.models["about"] || mongoose.model("about", aboutSchema)

export default AboutModel

