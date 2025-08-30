// controllers/profileController.js
const User = require("../models/User");

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id; // Depending on your auth setup

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id;
    const updates = req.body;

    // Remove password from updates if present
    delete updates.password;

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check current password (plain text comparison for now)
    if (user.password !== currentPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};
