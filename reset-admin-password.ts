import dotenv from "dotenv";
dotenv.config({ path: ".env" }); // Load environment variables

import mongoose from "mongoose";
import crypto from "crypto";

// ✅ 1. Connect to MongoDB
async function connectDb() {
  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI not found in environment variables!");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");
}

// ✅ 2. Define Admin model (adjust collection name if needed)
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

// ✅ 3. Password hashing function
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

// ✅ 4. Main logic
async function resetPassword() {
  try {
    await connectDb();

    const email = "admin@gmail.com"; // change if your admin email is different
    const newPassword = "admin123"; // set your new password here
    const hashedPassword = hashPassword(newPassword);

    const admin = await Admin.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (admin) {
      console.log(`✅ Password reset successful for ${email}`);
    } else {
      console.log(`⚠️ No admin found with email: ${email}`);
    }
  } catch (error) {
    console.error("❌ Error resetting password:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

// ✅ 5. Run
resetPassword();
