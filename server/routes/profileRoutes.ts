import express from "express";

import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "../controllers/profileController";

const router = express.Router();

router.post("/", createProfile);
router.patch("/:userID", updateProfile);
router.get("/:userID", getProfileById);
router.get("/", getAllProfiles);

export default router;
