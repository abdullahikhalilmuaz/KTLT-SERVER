require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // allows JSON request body parsing

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "running",
    message: "Katsina Local Government API",
    version: "1.0.0",
  });
});

// User routes placeholder (we'll create soon)
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admins", require("./routes/adminRoutes")); // admins
app.use("/api/files", require("./routes/fileRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/staff", require("./routes/staffRoutes.js"));
app.use("/api/profile", require("./routes/profileRoutes"));

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
