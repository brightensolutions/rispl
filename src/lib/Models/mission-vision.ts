import mongoose from "mongoose"

const missionVisionSchema = new mongoose.Schema({
  mission: { type: String, required: true },
  vision: { type: String, required: true },
  chairmanMessage: { type: String, required: true },
  chairmanName: { type: String, required: true },
  chairmanTitle: { type: String, required: true },
  chairmanImage: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  yearsExperience: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
})

const MissionVisionModel = mongoose.models["missionVision"] || mongoose.model("missionVision", missionVisionSchema)

export default MissionVisionModel

