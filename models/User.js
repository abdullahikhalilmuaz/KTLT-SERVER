// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gradeLevel: { type: String, default: "" },
    department: { type: String, default: "" },
    phone: { type: String, default: "" },
    position: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
