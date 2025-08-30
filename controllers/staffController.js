// controllers/staffController.js
const User = require("../models/User");

// GET all staff
const getAllStaff = async (req, res) => {
  try {
    const staff = await User.find(); // fetch all staff from User collection
    res.json(staff);
  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).json({ message: "Failed to fetch staff records" });
  }
};

// GET single staff by ID
const getStaffById = async (req, res) => {
  try {
    const staff = await User.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.json(staff);
  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).json({ message: "Failed to fetch staff record" });
  }
};

// CREATE new staff
const createStaff = async (req, res) => {
  try {
    const newStaff = new User(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    console.error("Error creating staff:", err);
    res.status(400).json({ message: "Failed to create staff record" });
  }
};

// UPDATE staff
const updateStaff = async (req, res) => {
  try {
    const updatedStaff = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json(updatedStaff);
  } catch (err) {
    console.error("Error updating staff:", err);
    res.status(400).json({ message: "Failed to update staff record" });
  }
};

// DELETE staff
const deleteStaff = async (req, res) => {
  try {
    const deletedStaff = await User.findByIdAndDelete(req.params.id);
    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.json({ message: "Staff deleted successfully" });
  } catch (err) {
    console.error("Error deleting staff:", err);
    res.status(500).json({ message: "Failed to delete staff record" });
  }
};

module.exports = {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
};
