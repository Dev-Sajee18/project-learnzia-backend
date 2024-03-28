import { Schema, model } from "mongoose";

const pdfSchema = new Schema({
  title: String,
  pdf: String,
  image: String,
  price: Number, // Change the type to Number
  description: String,
});

const PdfDetails = model("PdfDetails", pdfSchema);

export default PdfDetails;




// import { Schema, model } from "mongoose";

// const pdfSchema = new Schema({
//   title: String,
//   pdf: String,
//   image: String,
//   price: {
//     type: String,
//     get: (v) => `LKR ${v}`, // This getter function adds "LKR " to the price when retrieving the value from the database
//     set: (v) => v.replace("LKR ", ""), // This setter function removes "LKR " from the price before saving it to the database
//   },
//   description: String,
// });

// const PdfDetails = model("PdfDetails", pdfSchema);

// export default PdfDetails;