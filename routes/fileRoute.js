// productRoutes.js
import express from 'express';
import { isAdmin, protect } from '../middleware/authMiddleware.js';
// import {deleteFileById,getFile,getFileById, updateFileById,} from '../Controllers/fileController.js';
import FilesModel from '../models/filesModel.js';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';


const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;

  console.log(file);

  try {
    // Use upload_stream method to upload from buffer
    const result = await cloudinary.v2.uploader.upload_stream(
      { folder: 'resources' },
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        } else {
          // Create a new instance of the FileModel and save the file data
          const fileInstance = new FilesModel({
            contentType: req.file.mimetype,
            file: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          });

          fileInstance.save()
            .then(() => res.status(200).send('File uploaded successfully'))
            .catch((saveError) => {
              console.error(saveError);
              res.status(500).send('Internal Server Error');
            });
        }
      }
    ).end(file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/getAllFile', async (req, res) => {
  try {
    const allFiles = await FilesModel.find();
    res.status(200).json(allFiles)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error');

  }
})

router.put('/update/:id', async (req, res) => {
console.log(req.file)
    try {
      //current product
      const currentResource = await FilesModel.findById(req.params.id);
console.log(req.file)
      //build the data object
      const data = {
        contentType: req.file.mimetype,
      }

      //modify image conditionnally
      if (req.file !== '') {
          const ResourceId = currentResource.file.public_id;
          if (ResourceId) {
              await cloudinary.uploader.destroy(ResourceId);
          }

          const newResource = await cloudinary.uploader.upload(req.file, {
              folder: "resources",
             
          });

          data.file = {
              public_id: newResource.public_id,
              url: newResource.secure_url
          }
      }

      const ResourceUpdate = await FilesModel.findOneAndUpdate(req.params.id, data, { new: true })

      res.status(200).json({
          success: true,
          ResourceUpdate
      })




  } catch (error) {
console.log(error)
  }
})









router.delete('/deleteproduct/:id', async (req, res) => {
  try {
    const uploads = await FilesModel.findById(req.params.id)
    const resourceId = uploads.file.public_id;

    if (resourceId) {
      await cloudinary.uploader.destroy(resourceId);
    }

    const rmResource = await FilesModel.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: " Resource  deleted",

    })

  } catch (error) {
    console.log(error);

  }
})
export default router;












