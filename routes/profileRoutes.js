// routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/profileController");

// Middleware to protect routes (you'll need to implement this based on your auth system)
// const auth = require("../middleware/auth");

// GET /api/profile/:id - Get user profile
router.get("/:id", getProfile);

// PUT /api/profile/:id - Update user profile
router.put("/:id", updateProfile);

// POST /api/profile/:id/change-password - Change password
router.post("/:id/change-password", changePassword);

module.exports = router;
