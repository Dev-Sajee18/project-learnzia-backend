// fileRoutes.js

import express from "express";
import multer from "multer";
import { uploadFile, getFiles } from "../Controllers/resourceController.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/upload-files", upload.single("file"), uploadFile);
router.get("/get-files", getFiles);

export default router;
