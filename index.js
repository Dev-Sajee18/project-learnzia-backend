import dotenv from 'dotenv'
import express from 'express'
import cors from "cors"
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import { notFound,errorHandler} from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js"
import fileRoute from "./routes/fileRoute.js";
import DbConnection from './DbConnection/DbConnection.js';
// import { drive } from 'googleapis/build/src/apis/drive/index.js';
import drivefile from "./routes/drivefileRoute.js"
import pdfRoutes from "./routes/pdfRoutes.js"
import tutor from "./routes/tutorRoute.js"
import tutorAddRoutes from "./routes/tutorAddRoutes.js"
import multer from 'multer';
import "./models/resourceModel.js"
import payment from "./routes/paymentRoutes.js"
import candidateRoutes from './routes/candidateRoutes.js';

// import resourcepdf from "./routes/resourceRoutes.js"
const app = express(); 
dotenv.config(); 
app.use (cors())
app.use("/files", express.static("files"));
app.use('/zipfiles', express.static('zipfiles'));



app.use(express.json());
app.use(express.urlencoded( {extended: true }))
app.use(cookieParser())
app.use("/api/users",userRoutes)
app.use("/api/file", fileRoute)
app.use("/api/drive", drivefile)
app.use("/api/pdf" ,pdfRoutes)
app.use("/api/tutor" ,tutor)
app.use("/api/addtutor" ,tutorAddRoutes)
// app.use("/api/resource" ,resourcepdf)
app.use("/api/payment" ,payment)
app.use('/api/candidate', candidateRoutes);



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});



// these are the codes for uploading pdf files and store in multer local zipfiles.


const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage });


app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});


app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});







// these are the codes for uploading zip files, images and store in multer local zipfiles.

import ZipModel from './models/zipModel.js';
const storagezip = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./zipfiles"); // Store zip files and images in the "zipfiles" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use a unique filename
  },
});

const uploadzip = multer({ storage: storagezip });
app.post("/upload-zipfiles", uploadzip.fields([{ name: "zip", maxCount: 1 }, { name: "image", maxCount: 1 }]), async (req, res) => {
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

// Route to download a specific zip file
app.get("/download-zipfile/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "zipfiles", filename);
  res.download(filePath, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).json({ error: 'Failed to download file' });
    }
  });
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



app.get("/",(req,res) => res.send("server is ready"));
app.use(notFound)
app.use(errorHandler)

DbConnection();
app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
}) 







