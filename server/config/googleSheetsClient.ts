import { google, sheets_v4 } from "googleapis";

const googleSheetsClient = (): sheets_v4.Sheets => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./server/config/serviceKey.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
};

export default googleSheetsClient;
