import express from "express";

import { seedRegistrationDatabase } from "../controllers/devControllers";

const router = express.Router();

router.get("/", seedRegistrationDatabase);

export default router;
