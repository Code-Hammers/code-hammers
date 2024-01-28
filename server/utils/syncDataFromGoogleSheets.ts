import fetchSheetData from "../config/googleFetch";
import Alumni from "../models/alumniModel";

interface AlumniData {
  company: string;
  name: string;
  email: string;
  linkedIn: string;
  campus: string;
  cohort: number;
  jobTitle: string;
  industry?: string;
  cities: string[];
}

async function syncDataFromGoogleSheets(): Promise<void> {
  const SPREADSHEET_ID = "1IMJnWFmdQU--JZ8rs4e39ri3GuYIGLYVsLP6MLdEzrE";
  const RANGE = "Alumni Directory!A1:J";

  try {
    const sheetData: string[][] = await fetchSheetData(SPREADSHEET_ID, RANGE);

    for (let i = 1; i < sheetData.length; i++) {
      console.log(i);
      const row = sheetData[i];

      const alumniData: AlumniData = {
        company: row[0].trim(),
        name: row[1].trim(),
        email: row[2].trim(),
        linkedIn: row[3].trim(),
        campus: row[4].trim(),
        cohort: parseInt(row[5]),
        jobTitle: row[6].trim(),
        industry: row[7] ? row[7].trim() : undefined,
        cities: row.slice(8).map((city) => city.trim()),
      };

      await Alumni.findOneAndUpdate({ email: alumniData.email }, alumniData, {
        upsert: true,
      });
    }

    console.log("Data sync completed successfully.");
  } catch (error) {
    console.error("Error during data sync:", error);
    //TODO Review error handling on this
  }
}

export default syncDataFromGoogleSheets;
