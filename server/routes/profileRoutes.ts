import express from "express";
import { protect } from "../middleware/authMiddleware";

import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "../controllers/profileController";

const router = express.Router();

router.post("/", protect, createProfile);
router.put("/:userID", protect, updateProfile);
router.get("/:userID", protect, getProfileById);
router.get("/", protect, getAllProfiles);

export default router;
