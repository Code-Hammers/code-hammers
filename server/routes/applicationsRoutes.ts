import express from "express";
import { getAllApplications } from "../controllers/applicationsController";

const router = express.Router();

router.get("/", getAllApplications);

export default router;
