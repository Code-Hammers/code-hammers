import express from "express";
import {
  addForum,
  deleteForum,
  getAllForums,
  getForumById,
  updateForum,
} from "../controllers/forumController";
import { protect } from "../middleware/authMiddleware"; //TODO Add admin auth middleware

const router = express.Router();

router.post("/", addForum); //TODO Protect with admin auth
router.get("/", getAllForums);
router.get("/:forumId", getForumById);
router.put("/:forumId", updateForum); //TODO Protect with admin auth
router.delete("/:forumId", deleteForum); //TODO Protect with admin auth

export default router;
