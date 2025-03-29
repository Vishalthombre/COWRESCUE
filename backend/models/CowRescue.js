import mongoose from "mongoose";

const CowRescueSchema = new mongoose.Schema({
  username: { type: String, required: true },
  usercontact: { type: String, required: true },
  location: { type: String, required: true },
  breed: { type: String, required: true },
  healthStatus: { type: String, required: true, default: "Unknown" },
  imageUrl: { type: String, required: true }, // Cloudinary image URL
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("CowRescue", CowRescueSchema);
