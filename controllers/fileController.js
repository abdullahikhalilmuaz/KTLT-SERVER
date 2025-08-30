const File = require("../models/File");

// Utility to generate system file number
const generateSystemFileNumber = async () => {
  const count = await File.countDocuments();
  return `KTLG/${new Date().getFullYear()}/${String(count + 1).padStart(
    3,
    "0"
  )}`;
};

// Create File
const createFile = async (req, res) => {
  try {
    const {
      staffName,
      staffIdNumber,
      department,
      gradeLevel,
      transferredTo,
      purpose,
      collectionDate,
      collectorName,
      officeFileNumber, // new optional field
    } = req.body;

    // System-generated file number
    const fileNumber = await generateSystemFileNumber();

    const newFile = new File({
      staffName,
      staffIdNumber,
      department,
      gradeLevel,
      transferredTo: transferredTo || "",
      purpose: purpose || "",
      collectionDate: collectionDate || null,
      collectorName: collectorName || "",
      fileNumber,
      officeFileNumber: officeFileNumber || "",
      documentPath: req.file ? req.file.path : null, // docx upload
    });

    await newFile.save();
    res.status(201).json({ message: "File record created", file: newFile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all files
const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single file by ID
const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update file
const updateFile = async (req, res) => {
  try {
    const updatedFile = await File.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedFile)
      return res.status(404).json({ message: "File not found" });

    res.status(200).json({ message: "File updated", file: updatedFile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete file
const deleteFile = async (req, res) => {
  try {
    const deletedFile = await File.findByIdAndDelete(req.params.id);
    if (!deletedFile)
      return res.status(404).json({ message: "File not found" });

    res.status(200).json({ message: "File deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFile,
  getFiles,
  getFileById,
  updateFile,
  deleteFile,
};
