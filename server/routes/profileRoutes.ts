import express from "express";
import {
  registerUser,
  authUser,
  getUserById,
  deleteUserByEmail,
} from "../controllers/userController";

import { createProfile } from "../controllers/profileController";

const router = express.Router();

router.post("/create", createProfile);

export default router;
