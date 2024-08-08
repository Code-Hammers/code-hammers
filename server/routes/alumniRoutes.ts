import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getAllAlumniData } from '../controllers/alumniController';

const router = express.Router();

router.use(protect); /* Require Auth for ALL routes below */
router.get('/', getAllAlumniData);

export default router;
