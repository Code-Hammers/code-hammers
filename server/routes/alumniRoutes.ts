import express from 'express';

import { protect } from '../middleware/authMiddleware';
import { getAllAlumniData } from '../controllers/alumniControllers';

const router = express.Router();

router.get('/', protect, getAllAlumniData);

export default router;
