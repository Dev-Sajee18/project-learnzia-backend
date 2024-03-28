// const mongoose = require("mongoose");
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ZipSchema = new Schema({
  title: String,
  zip: String, // File path for the zip file
  image: String, // File path for the image
  price: Number,
  description: String,
});

const ZipModel = mongoose.model("ZipDetails", ZipSchema);

export default ZipModel;
