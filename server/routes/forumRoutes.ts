import express from "express";
import { addForum } from "../controllers/forumController";
import { protect } from "../middleware/authMiddleware"; //TODO Add admin auth middleware

const router = express.Router();

router.post("/", addForum);

export default router;
