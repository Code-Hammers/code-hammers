import googleSheetsClient from "./googleSheetsClient";

const fetchSheetData = async (
  spreadsheetId: string,
  range: string
): Promise<string[][]> => {
  const sheets = googleSheetsClient();

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data.values as string[][];
  } catch (error) {
    console.error("The API returned an error: " + error);
    throw error;
  }
};

export default fetchSheetData;
