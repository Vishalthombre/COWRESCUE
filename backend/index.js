import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cowRescueRoutes from "./routes/cowRescueRoutes.js"; // ✅ Import Cow Rescue Routes
import authRoutes from "./routes/authRoutes.js"; // ✅ Import Authentication Routes

dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// ✅ Initialize Express App
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // ✅ Increase payload size limit
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // ✅ Allow large form submissions

// ✅ Test API Route
app.get("/", (req, res) => {
  res.send("Cow Rescue API is running...");
});

// ✅ Mount Routes
app.use("/api/cows", cowRescueRoutes); // 🐄 Cow Rescue Routes
app.use("/api/auth", authRoutes); // 🔒 Authentication Routes (Login/Register)

// ✅ Catch-all 404 Error
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
