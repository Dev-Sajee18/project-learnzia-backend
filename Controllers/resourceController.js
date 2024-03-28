// fileController.js

import PdfSchema from "../models/resourceModel.js";

const uploadFile = async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  // const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: __filename });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};

const getFiles = async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
};

export { uploadFile, getFiles };
