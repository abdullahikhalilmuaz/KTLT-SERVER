const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["info", "warning", "urgent"],
      default: "info",
    },
    target: {
      type: String,
      enum: ["all", "Personnel", "PHCC", "ESSD", "Agric", "WATSAN", "Works"],
      default: "all",
    },
    admin: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
