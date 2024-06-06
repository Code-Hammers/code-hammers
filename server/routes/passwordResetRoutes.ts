import express from 'express';

import { sendPasswordResetEmail } from '../controllers/passwordResetController';

const router = express.Router();

router.post('/', sendPasswordResetEmail);

export default router;
