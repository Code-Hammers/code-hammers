import express from "express";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../types/customRequest";
import {
  addForum,
  deleteForum,
  getAllForums,
  getForumById,
  updateForum,
} from "../controllers/forumController";

import { createThread } from "../controllers/threadController";
import { protect } from "../middleware/authMiddleware"; //TODO Add admin auth middleware

function mockAuth(req: CustomRequest, res: Response, next: NextFunction) {
  req.user = {
    _id: "6569e218784b4454e0b5bda6",
  };
  next();
}

const router = express.Router();

router.post("/", protect, addForum); //TODO Protect with admin auth
router.get("/", protect, getAllForums);
router.get("/:forumId", protect, getForumById);
router.put("/:forumId", protect, updateForum); //TODO Protect with admin auth
router.delete("/:forumId", protect, deleteForum); //TODO Protect with admin auth

router.post("/:forumId/threads", protect, createThread);

export default router;
