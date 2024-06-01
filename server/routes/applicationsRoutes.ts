import express from "express";
import {
  createApplication,
  getAllApplications,
  getStatuses,
  updateApplication,
  getApplicationById,
  getAggregatedUserStats,
} from "../controllers/applicationsController";

const router = express.Router();

router.get("/statuses", getStatuses);
router.get("/aggregated-user-stats", getAggregatedUserStats);
router.get("/", getAllApplications);
router.get("/:id", getApplicationById);
router.post("/", createApplication);
router.put("/:id", updateApplication);

export default router;
