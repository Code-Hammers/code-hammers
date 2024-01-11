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
const getSheetData = async (
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
    //TODO REFACTOR ERROR HANDLING
    next(error);
  }
};

// GET /auth/google
const startGoogleOAuth = (req: Request, res: Response): void => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.redirect(url);
};

// GET /oauth2callback
const handleGoogleOAuthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { code } = req.query as { code: string };
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    //TODO MUST SAVE TO USER/SERVER DATA BASE HERE
    res.redirect("/api/sheets");
  } catch (error) {
    //TODO REFACTOR ERROR HNDLING
    next(error);
  }
};
export { getSheetData, startGoogleOAuth, handleGoogleOAuthCallback };
