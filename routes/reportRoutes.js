// routes/reportRoutes.js
const express = require("express");
const File = require("../models/File.js"); // your File model

const router = express.Router();

// GET /api/reports
router.get("/", async (req, res) => {
  try {
    const departments = [
      "Personnel",
      "PHCC",
      "ESSD",
      "Agric",
      "WATSAN",
      "Works",
    ];

    const stats = await Promise.all(
      departments.map(async (dept) => {
        const totalStaff = await File.countDocuments({ department: dept });

        const filesCollected = await File.countDocuments({
          department: dept,
          collected: true,
        });

        const filesReturned = await File.countDocuments({
          department: dept,
          returned: true,
        });

        return {
          department: dept,
          totalStaff,
          filesCollected,
          filesReturned,
        };
      })
    );

    res.json({ departments: stats });
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});

// 👇 CommonJS export
module.exports = router;
