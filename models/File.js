const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  staffName: { type: String, required: true },
  staffIdNumber: { type: String, required: true },
  department: { type: String, required: true },

  // system generated number (always unique, required)
  fileNumber: { type: String, required: true, unique: true },

  // office file number (optional, not unique)
  officeFileNumber: { type: String, default: "" },

  documentPath: { type: String },

  // Tracking info (default values until updated)
  transferredTo: { type: String, default: "" },
  purpose: { type: String, default: "" },
  collected: { type: Boolean, default: false },
  returned: { type: Boolean, default: false },
  collectionDate: { type: String, default: "" },
  returningDate: { type: String, default: "" },
  collectorName: { type: String, default: "" },
});

module.exports = mongoose.model("File", fileSchema);
