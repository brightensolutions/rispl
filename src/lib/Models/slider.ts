import mongoose from "mongoose"

const sliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  highlight: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const SliderModel = mongoose.models["slider"] || mongoose.model("slider", sliderSchema)

export default SliderModel

