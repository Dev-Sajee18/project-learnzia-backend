// productRoutes.js
import express from 'express';

import { isAdmin, protect } from '../middleware/authMiddleware.js';
// import { UploadREsource, GetAllResources, UpdateResouce, DeleteResource } from '../Controllers/fileController.js';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import generateToken from '../utils/generateToken.js';
import { TutorSignUp ,
    tutorDelete,getAllTutors} from '../Controllers/tutorController.js'; //getAllTs,TutorsLogin,

import bcryptjs from 'bcryptjs'

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// router.post('/signup', upload.single('file'),TutorSignUp);
router.post('/signup',TutorSignUp);


// router.post('/login',TutorsLogin)

router.put('/TimeUpdate')


router.delete('/:email',tutorDelete)

router.get('/getalltutors',getAllTutors)

export default router;








