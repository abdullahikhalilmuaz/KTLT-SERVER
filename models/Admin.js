const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adminCode: { type: String, default: process.env.ADMIN_SECRET }, // default instead of required
});

module.exports = mongoose.model("Admin", adminSchema);
