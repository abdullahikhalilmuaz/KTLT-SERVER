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
      .sort({ _id: -1 }) // Sort by latest created (using _id since no createdAt)
      .limit(5);

    // Map into frontend-friendly format with proper dates
    const activities = recentActivities.map((file) => {
      let action = "File created";
      let status = "pending";
      let date = "No date";

      // Use returningDate if file is returned, otherwise collectionDate if collected
      if (file.returned && file.returningDate) {
        action = "File returned";
        status = "returned";
        date = file.returningDate;
      } else if (file.collected && file.collectionDate) {
        action = "File collected";
        status = "collected";
        date = file.collectionDate;
      } else if (file.collected) {
        action = "File collected";
        status = "collected";
        date = "No date";
      }

      return {
        name: file.staffName,
        action: action,
        status: status,
        date: date,
      };
    });

    res.json({ activities });
  } catch (err) {
    console.error("Error fetching recent activities:", err);
    res.status(500).json({ message: "Failed to fetch recent activities" });
  }
});

module.exports = router;
