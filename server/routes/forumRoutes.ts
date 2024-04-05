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

import {
  listPostsByThreadId,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";

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
router.put("/:forumId/threads/:threadId", protect, updateThread);
router.delete("/:forumId/threads/:threadId", protect, deleteThread); //TODO Protect with admin auth

//Post Routes
router.get("/:forumId/threads/:threadId/posts", protect, listPostsByThreadId);
router.post("/:forumId/threads/:threadId/posts", protect, createPost);
router.put("/:forumId/threads/:threadId/posts/:postId", protect, updatePost);
router.delete("/:forumId/threads/:threadId/posts/:postId", protect, deletePost); //TODO Protect with admin auth

export default router;
