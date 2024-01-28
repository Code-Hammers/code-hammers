import express from "express";
import dotenv from "dotenv";

import {
  getAlumniData,
  parseAlumniData,
  syncAlumniData,
} from "../controllers/alumniControllers";

dotenv.config();

const router = express.Router();

router.get("/", getAlumniData, parseAlumniData);
router.get("/sync-alumni-data", syncAlumniData);

export default router;
