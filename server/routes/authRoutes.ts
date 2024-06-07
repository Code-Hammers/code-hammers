import express from 'express';

import { authSession } from '../controllers/authController';

const router = express.Router();

router.get('/validate-session', authSession);

export default router;
