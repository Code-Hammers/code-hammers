import express from "express";
import {
  registerUser,
  authUser,
  getUserById,
  deleteUserByEmail,
} from "../controllers/userController";

const router = express.Router();

router.post("/login", authUser);
router.post("/register/:token", registerUser);
router.delete("/:email", deleteUserByEmail);
router.get("/:userId", getUserById);

export default router;
