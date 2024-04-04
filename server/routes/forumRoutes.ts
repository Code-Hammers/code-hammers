import express from "express";
import {
  addForum,
  deleteForum,
  getAllForums,
  getForumById,
  updateForum,
} from "../controllers/forumController";

import {
  createThread,
  listThreadsByForumId,
} from "../controllers/threadController";
import { protect } from "../middleware/authMiddleware"; //TODO Add admin auth middleware

const router = express.Router();

router.post("/", protect, addForum); //TODO Protect with admin auth
router.get("/", protect, getAllForums);
router.get("/:forumId", protect, getForumById);
router.put("/:forumId", protect, updateForum); //TODO Protect with admin auth
router.delete("/:forumId", protect, deleteForum); //TODO Protect with admin auth

router.post("/:forumId/threads", protect, createThread);
router.get("/:forumId/threads", protect, listThreadsByForumId);

export default router;
