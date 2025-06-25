import mongoose from "mongoose"

const withdrawalSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  amount: { type: Number, required: true },
  withdrawalMethod: { type: String, enum: ["upi", "bank"], required: true },
  upiId: { type: String },
  bankDetails: {
    accountNumber: { type: String },
    ifscCode: { type: String },
    accountHolderName: { type: String },
  },
  passbookImage: { type: String },
  referralincome: { type: Number},
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
})

const WithdrawalModel = mongoose.models.Withdrawal || mongoose.model("Withdrawal", withdrawalSchema)

export default WithdrawalModel
