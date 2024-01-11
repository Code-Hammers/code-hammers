import express from "express";
import {
  getSheetData,
  startGoogleOAuth,
  handleGoogleOAuthCallback,
} from "../controllers/googleSheetsControllers";

const router = express.Router();

router.get("/sheets", getSheetData);
router.get("/auth/google", startGoogleOAuth);
router.get("/auth/google/callback", handleGoogleOAuthCallback);

export default router;
