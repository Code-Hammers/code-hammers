import express from "express";

import { getAllAlumniData } from "../controllers/alumniControllers";

const router = express.Router();

router.get("/", getAllAlumniData);

export default router;
