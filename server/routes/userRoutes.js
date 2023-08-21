import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getPhotoController,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import formidable from "express-formidable"
const router = express.Router();

router.post('/',formidable(), registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/all',protect, getAllUsers)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
//get photo
router.get("/photo/:uid", getPhotoController);
export default router;