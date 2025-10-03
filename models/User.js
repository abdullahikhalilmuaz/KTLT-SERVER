// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Existing fields
    gradeLevel: { type: String, default: "" },
    department: { type: String, default: "" },
    phone: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    lastLogin: { type: Date, default: Date.now },

    // CHANGED: Replaced 'position' with 'portfolio'
    portfolio: { type: String, default: "" },

    // New staff record fields
    verificationNumber: { type: String, default: "" },
    nFileNumber: { type: String, default: "" },
    dateOfFirstAppointment: { type: Date, default: null },
    dateOfPresentAppointment: { type: Date, default: null },
    dateOfBirth: { type: Date, default: null },
    ktlgNumber: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
