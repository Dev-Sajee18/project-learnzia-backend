// start upload image
import express from 'express';
const router = express. Router();
import {uploadImage,getImages,deleteImage} from "../Controllers/tutorAddController.js"
import multer from 'multer';

const storage= multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});
const upload = multer({ storage: storage });

router.post('/uploadtutor', upload.single('file'), uploadImage);
router.get('/getimages', getImages);
router.delete('/delete', deleteImage);



export default router;


