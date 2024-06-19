import express from 'express';
import {
  registerUser,
  authUser,
  getUserById,
  // deleteUserByEmail,
} from '../controllers/userController';

import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);

//TODO Disabled until admin auth is created
//router.delete("/:email", protect, deleteUserByEmail);
router.get('/:userId', protect, getUserById);

export default router;
