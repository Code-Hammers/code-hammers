import express from "express";
import {
  createApplication,
  getAllApplications,
  getStatuses,
} from "../controllers/applicationsController";

const router = express.Router();

router.get("/", getAllApplications);
router.post("/", createApplication);
router.get("/statuses", getStatuses);

export default router;
