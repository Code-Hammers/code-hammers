import express from 'express';
import { registerUser, authUser } from '../controllers/userController';

const router = express.Router();

router.post('/login', authUser);
router.post('/', registerUser);

export default router;
