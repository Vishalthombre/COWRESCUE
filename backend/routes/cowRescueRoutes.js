import express from "express";
import CowRescue from "../models/CowRescue.js";
import cloudinary from "../config/cloudinary.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Fetch all rescues
router.get("/rescues", async (req, res) => {
  try {
    const rescues = await CowRescue.find();
    res.json(rescues);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Upload Rescue Report (Only for logged-in users)
router.post("/upload", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ error: "Only normal users can submit a rescue request" });
    }

    const { username, usercontact, location, breed, healthStatus, image } = req.body;

    if (!image) return res.status(400).json({ error: "No image provided" });

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "cow_rescue",
      resource_type: "image",
    });

    const newRescue = new CowRescue({
      username,
      usercontact,
      location,
      breed,
      healthStatus,
      imageUrl: uploadResponse.secure_url,
      userId: req.user.id, // Save user ID for deletion validation
    });

    await newRescue.save();
    res.json({ message: "Rescue report submitted!", data: newRescue });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete Rescue Report (Only by the user who created it)
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ error: "Only normal users can delete their rescue requests" });
    }

    const { id } = req.params;
    const rescue = await CowRescue.findById(id);

    if (!rescue) return res.status(404).json({ error: "Rescue not found" });

    if (rescue.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    await CowRescue.findByIdAndDelete(id);
    res.json({ message: "Rescue deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
