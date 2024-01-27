import express from "express";
import dotenv from "dotenv";
import { getAlumniData } from "../controllers/alumniControllers";

dotenv.config();

const router = express.Router();

router.get("/", getAlumniData);

export default router;
