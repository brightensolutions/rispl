import mongoose from "mongoose"

const teamPhotoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  ctaText: { type: String, default: "Learn more about our team" },
  ctaLink: { type: String, default: "#" },
  updatedAt: { type: Date, default: Date.now },
})

const TeamPhotoModel = mongoose.models["teamPhoto"] || mongoose.model("teamPhoto", teamPhotoSchema)

export default TeamPhotoModel

