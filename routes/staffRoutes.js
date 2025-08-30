  const express = require("express");
  const File = require("../models/File.js");

  const router = express.Router();

  // GET all staff
  router.get("/", async (req, res) => {
    try {
      const staff = await File.find(); // get all staff records
      res.json(staff);
    } catch (err) {
      console.error("Error fetching staff:", err);
      res.status(500).json({ message: "Failed to fetch staff records" });
    }
  });

  // You can later add POST (add new staff), PUT (update), DELETE (remove)
  module.exports = router;
