import mongoose from "mongoose"

const socialLinksSchema = new mongoose.Schema({
  linkedin: { type: String, default: "#" },
  twitter: { type: String, default: "#" },
  email: { type: String, default: "mailto:example@domain.com" },
})

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  subRole: { type: String, default: "" },
  image: { type: String, required: true },
  social: { type: socialLinksSchema, default: () => ({}) },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const TeamMemberModel = mongoose.models["teamMember"] || mongoose.model("teamMember", teamMemberSchema)

export default TeamMemberModel

