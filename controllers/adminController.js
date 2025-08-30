const Admin = require("../models/Admin");

// Signup Admin
const signupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // create admin with adminCode from env
    const newAdmin = new Admin({
      name,
      email,
      password,
      adminCode: process.env.ADMIN_SECRET,
    });

    await newAdmin.save();
    res
      .status(201)
      .json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login Admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password, adminCode } = req.body;

    // find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // check password
    if (admin.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // check admin code
    if (admin.adminCode !== adminCode) {
      return res.status(400).json({ message: "Invalid admin code" });
    }

    // ✅ return only safe fields
    res.status(200).json({
      message: "Admin login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signupAdmin, loginAdmin };
