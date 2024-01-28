import { Request, Response, NextFunction } from "express";
import axios from "axios";
import syncDataFromGoogleSheets from "../utils/syncDataFromGoogleSheets";

interface AlumniData {
  [key: string]: string;
}

const getAlumniData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("HIT!");

  const csvURL = process.env.GOOGLE_SHEETS_URL;

  if (typeof csvURL !== "string") {
    console.error("GOOGLE_SHEETS_URL is not defined");
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  try {
    const sheetsData = await axios.get<string>(csvURL);

    res.locals.alumniData = sheetsData.data;
    console.log(sheetsData);
    next();
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

const parseAlumniData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(res.locals.AlumniData);
  if (typeof res.locals.alumniData !== "string") {
    console.error("Alumni data is not a string");
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  const rows = res.locals.alumniData.split(/\r?\n/);
  const headers = rows[0].split(",");
  const data: AlumniData[] = [];
  for (let i = 1; i < rows.length; i++) {
    const rowData = rows[i].split(",");
    const rowObject: AlumniData = {};
    for (let j = 0; j < headers.length; j++) {
      rowObject[headers[j]] = rowData[j];
    }
    data.push(rowObject);
  }

  res.locals.parsedAlumniData = data;
  res.json({ data: data });
};

const syncAlumniData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("sync hit!");
  try {
    await syncDataFromGoogleSheets();
    console.log("Data sync completed successfully.");
    res.status(200).json({
      message: "Data synchronization with Google Sheets is successful.",
    });
  } catch (error) {
    console.error("Error during data synchronization:", error);
    res.status(500).json({ error: "Data synchronization failed." });
  }
};
export { getAlumniData, parseAlumniData, syncAlumniData };
