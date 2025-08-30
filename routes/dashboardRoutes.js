const express = require("express");
const File = require("../models/File");
const router = express.Router();

// GET /api/dashboard/stats
router.get("/stats", async (req, res) => {
  try {
    const totalStaff = await File.countDocuments();

    const filesCollected = await File.countDocuments({ collected: true });
    const filesReturned = await File.countDocuments({ returned: true });

    const pendingReturns = filesCollected - filesReturned;

    res.json({
      totalStaff,
      filesCollected,
      filesReturned,
      pendingReturns,
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
});

// GET /api/dashboard/recent
router.get("/recent", async (req, res) => {
  try {
    const recentActivities = await File.find()
      .sort({ updatedAt: -1 }) // assumes timestamps: true in schema
      .limit(5);

    // Map into frontend-friendly format
    const activities = recentActivities.map((f) => ({
      name: f.staffName,
      action: f.returned
        ? "File returned"
        : f.collected
        ? "File collected"
        : "File created",
      date: f.updatedAt,
      status: f.returned ? "returned" : f.collected ? "collected" : "pending",
    }));

    res.json({ activities });
  } catch (err) {
    console.error("Error fetching recent activities:", err);
    res.status(500).json({ message: "Failed to fetch recent activities" });
  }
});

module.exports = router;
