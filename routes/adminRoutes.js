const express = require("express");
const router = express.Router();
const { signupAdmin, loginAdmin } = require("../controllers/adminController");

// Signup
router.post("/signup", signupAdmin);

// Login (requires adminCode)
router.post("/login", loginAdmin);

module.exports = router;
