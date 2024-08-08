import express from 'express';

import { seedRegistrationDatabase } from '../controllers/devController';

const router = express.Router();

router.get('/', seedRegistrationDatabase);

export default router;
