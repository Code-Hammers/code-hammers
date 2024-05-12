import express from "express";
import {
  uploadProfilePicture,
  generatePresignedUrl,
} from "../controllers/imageController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/profile-picture/:userID",
  protect,
  upload.single("profilePicture"),
  uploadProfilePicture
);

//TODO Not currently being used
router.get("/generate-url", generatePresignedUrl);

export default router;
