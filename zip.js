const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const ZipModel = require("./models/zipModel.js"); // Assuming the schema is defined in a separate file

const app = express();
// const PORT = process.env.PORT || 3002;

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./zipfiles"); // Store zip files and images in the "zipfiles" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use a unique filename
  },
});

const upload = multer({ storage: storage });

// Middleware to handle JSON parsing
app.use(express.json());

// Route to upload zip files and images
app.post("/upload-zipfiles", upload.fields([{ name: "zip", maxCount: 1 }, { name: "image", maxCount: 1 }]), async (req, res) => {
  const { title, price, description } = req.body;
  const zip = req.files["zip"][0].path;
  const image = req.files["image"][0].path;

  try {
    await ZipModel.create({ title, zip, image, price, description });
    res.send({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Route to get all uploaded files
app.get("/get-zipfiles", async (req, res) => {
  try {
    const files = await ZipModel.find();
    res.send({ status: "ok", data: files });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Route to delete a file
app.delete("/delete-zipfile/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await ZipModel.findByIdAndDelete(id);
    res.send({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

// MongoDB connection
// mongoose.connect("mongodb://localhost:27017/your-database", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
