import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from '../controllers/profileController';

const router = express.Router();

router.use(protect); /* Require Auth for ALL routes below */

router.post('/', createProfile);
router.put('/:userID', updateProfile);
router.get('/:userID', getProfileById);
router.get('/', getAllProfiles);

export default router;
