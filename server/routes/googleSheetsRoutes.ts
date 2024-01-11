import express from "express";
import {
  startGoogleOAuth,
  handleGoogleOAuthCallback,
} from "../controllers/googleSheetsControllers";

const router = express.Router();

router.get("/auth/google", startGoogleOAuth);
router.get("/auth/google/callback", handleGoogleOAuthCallback);

export default router;
