const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// GET all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET notifications for specific department or all
router.get("/department/:dept", async (req, res) => {
  try {
    const { dept } = req.params;
    const notifications = await Notification.find({
      $or: [{ target: "all" }, { target: dept }],
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single notification
router.get("/:id", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new notification
router.post("/", async (req, res) => {
  try {
    const { title, message, type, target, admin } = req.body;

    // Validate required fields
    if (!title || !message) {
      return res.status(400).json({
        message: "Title and message are required",
      });
    }

    const notification = new Notification({
      title,
      message,
      type: type || "info",
      target: target || "all",
      admin: admin || "Admin",
    });

    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE notification
router.put("/:id", async (req, res) => {
  try {
    const { title, message, type, target, isActive } = req.body;

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { title, message, type, target, isActive },
      { new: true, runValidators: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE notification
router.delete("/:id", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SOFT DELETE notification (set isActive to false)
router.patch("/:id/deactivate", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({
      message: "Notification deactivated successfully",
      notification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
