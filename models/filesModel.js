import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  file: {
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }

},  // Buffer to store file data
  contentType: String,  // MIME type of the file
  created_at: { type: Date, default: Date.now }
});

const FilesModel = mongoose.model('Files', fileSchema);

export default  FilesModel;




