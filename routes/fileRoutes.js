const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // <-- multer middleware
const {
  createFile,
  getFiles,
  getFileById,
  updateFile,
  deleteFile,
} = require("../controllers/fileController");

// CRUD routes
router.post("/", upload.single("document"), createFile);
router.get("/", getFiles);
router.get("/:id", getFileById);
router.put("/:id", updateFile);
router.delete("/:id", deleteFile);

module.exports = router;
