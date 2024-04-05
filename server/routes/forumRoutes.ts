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
  deleteThread,
  getThreadById,
  listThreadsByForumId,
  updateThread,
} from "../controllers/threadController";
import { protect } from "../middleware/authMiddleware"; //TODO Add admin auth middleware

const router = express.Router();

//Forum Routes
router.post("/", protect, addForum); //TODO Protect with admin auth
router.get("/", protect, getAllForums);
router.get("/:forumId", protect, getForumById);
router.put("/:forumId", protect, updateForum); //TODO Protect with admin auth
router.delete("/:forumId", protect, deleteForum); //TODO Protect with admin auth

//Thread Routes
router.post("/:forumId/threads", protect, createThread);
router.get("/:forumId/threads", protect, listThreadsByForumId);
router.get("/:forumId/threads/:threadId", protect, getThreadById);
router.put("/:forumId/threads/:threadId", protect, updateThread); //TODO Protect with admin auth
router.delete("/:forumId/threads/:threadId", protect, deleteThread); //TODO Protect with admin auth

export default router;
