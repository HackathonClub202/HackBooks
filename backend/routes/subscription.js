// routes/subscription.js
const express = require("express");
const Subscription = require("../models/Subscription");
const adminAuth = require("../middleware/auth");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const router = express.Router();

// Add a new subscriber
router.post("/add", adminAuth, async (req, res) => {
  const { name, email, mobile } = req.body;

  try {
    const newSubscriber = new Subscription({ name, email, mobile });
    await newSubscriber.save();
    res.status(201).json({ message: "Subscriber added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding subscriber", error: error.message });
  }
});

// Delete a subscriber
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Subscriber deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subscriber", error: error.message });
  }
});

// Bulk upload subscribers via CSV
router.post("/bulk-upload", adminAuth, (req, res) => {
  const upload = multer({ dest: "uploads/" }).single("file");

  upload(req, res, (err) => {
    if (err) return res.status(500).json({ message: "File upload error" });

    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          await Subscription.insertMany(results);
          res.status(201).json({ message: "Subscribers uploaded successfully" });
        } catch (error) {
          res.status(500).json({ message: "Error uploading subscribers", error: error.message });
        }
      });
  });
});

module.exports = router;
