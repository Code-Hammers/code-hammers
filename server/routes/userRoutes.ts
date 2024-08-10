import express from 'express';
import { protect } from '../middleware/authMiddleware';
import registerUser from '../controllers/userController/registerUser/registerUser';
import { authUser, getUserById, deleteUserByEmail } from '../controllers/userController';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);

router.use(protect); /* Require Auth for ALL routes below */
router.get('/:userId', getUserById);
//TODO Disabled until admin auth is created
router.delete('/:email', deleteUserByEmail);

export default router;
