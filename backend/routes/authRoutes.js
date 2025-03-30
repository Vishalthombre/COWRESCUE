import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Organization from "../models/Organization.js";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ✅ Register Normal User
router.post("/user/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Login Normal User
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "15d" });

    res.json({ message: "User login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Register Organization
router.post("/organization/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingOrg = await Organization.findOne({ email });
    if (existingOrg) return res.status(400).json({ error: "Email already in use" });

    const newOrg = new Organization({ name, email, password });
    await newOrg.save();
    res.json({ message: "Organization registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Login Organization
router.post("/organization/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const org = await Organization.findOne({ email });
    if (!org) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: org._id, role: "organization" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Organization login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
