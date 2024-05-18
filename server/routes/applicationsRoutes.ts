import express from "express";
import {
  getAllApplications,
  getStatuses,
} from "../controllers/applicationsController";

const router = express.Router();

router.get("/", getAllApplications);
router.get("/statuses", getStatuses);

export default router;
