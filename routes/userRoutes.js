import express from 'express';
const router = express. Router();
import { authUser,registerUser,getUserProfile,logoutUser,updateUserProfile
} from '../Controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
router.post('/signup', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get( '/profile', getUserProfile);

// router.route('/profile').get(getUserProfile).patch(protect,updateUserProfile);
// router.get('/profile',getUserProfile)
export default router;    

