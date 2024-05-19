import express from "express";
import {
  createApplication,
  getAllApplications,
  getStatuses,
  updateApplication,
} from "../controllers/applicationsController";

const router = express.Router();

router.get("/", getAllApplications);
router.post("/", createApplication);
router.put("/", updateApplication);
router.get("/statuses", getStatuses);

export default router;
