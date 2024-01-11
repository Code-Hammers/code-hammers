import { Request, Response, NextFunction } from "express";
import { google, Auth, sheets_v4 } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID as string,
  process.env.GOOGLE_CLIENT_SECRET as string,
  process.env.GOOGLE_REDIRECT_URI as string
);

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

// GET /sheets
const getSheetsData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const sheets: sheets_v4.Sheets = google.sheets({
    version: "v4",
    auth: oauth2Client,
  });

  try {
    const response = await sheets.spreadsheets.value.get({
      spreadsheetId: "SPREAD SHEET ID", // NEED OUR GOOGLE SHEET ID
    });
    res.json(response.data.values);
  } catch (error) {
    next(error);
  }
};

// GET /auth/google

// GET /oauth2callback
