import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { uploadProfilePicture, generatePresignedUrl } from '../controllers/imageController';

const router = express.Router();

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(protect); /* Require Auth for ALL routes below */
router.post('/profile-picture/:userID', upload.single('profilePicture'), uploadProfilePicture);

//TODO Not currently being used
router.get('/generate-url', generatePresignedUrl);

export default router;
