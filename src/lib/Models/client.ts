import mongoose from "mongoose"

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const ClientModel = mongoose.models["client"] || mongoose.model("client", clientSchema)

export default ClientModel

