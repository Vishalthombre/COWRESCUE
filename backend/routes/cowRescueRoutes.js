import express from "express";
import CowRescue from "../models/CowRescue.js";
import cloudinary from "../config/cloudinary.js";


const router = express.Router();

// ✅ Fix: Change "/" to "/rescues" so frontend works correctly
router.get("/rescues", async (req, res) => {
  try {
    const rescues = await CowRescue.find();
    res.json(rescues);
  } catch (error) {
    console.error("Error fetching rescues:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Upload Rescue Report
router.post("/upload", async (req, res) => {
  try {
    const { username, usercontact, location, breed, healthStatus, image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Upload Image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "cow_rescue",
      resource_type: "image",
    });

    // Save to MongoDB
    const newRescue = new CowRescue({
      username,
      usercontact,
      location,
      breed,
      healthStatus,
      imageUrl: uploadResponse.secure_url,
    });

    await newRescue.save();
    res.json({ message: "Rescue report submitted!", data: newRescue });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
