import express from "express";
import {
  addForum,
  getAllForums,
  getForumById,
  updateForum,
} from "../controllers/forumController";
import { protect } from "../middleware/authMiddleware"; //TODO Add admin auth middleware

const router = express.Router();

router.post("/", addForum);
router.get("/", getAllForums);
router.get("/:forumId", getForumById);
router.put("/:forumId", updateForum);

export default router;
