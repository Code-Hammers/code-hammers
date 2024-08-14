import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { authSession } from '../controllers/authController';

const router = express.Router();

router.use(protect); /* Require Auth for ALL routes below */
router.get('/validate-session', authSession);

export default router;
