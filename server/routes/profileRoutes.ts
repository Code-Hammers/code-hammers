import express from "express";

import {
  createProfile,
  getAllProfiles,
  getProfileById,
} from "../controllers/profileController";

const router = express.Router();

router.post("/create", createProfile);
router.get("/:userID", getProfileById);
router.get("/", getAllProfiles);

export default router;
