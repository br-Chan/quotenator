import { fetchGoogleSheetsData } from "google-sheets-mapper";
import { QUOTES_SHEET_NAME, type Quote } from "#/types";

const getQuotes = async () => {
	if (
		!import.meta.env.VITE_GOOGLE_API_KEY ||
		!import.meta.env.VITE_GOOGLE_SHEETS_ID
	) {
		throw new Error(
			"Missing Google API key or Google Sheets ID in environment variables.",
		);
	}

	try {
		const sheets = await fetchGoogleSheetsData({
			apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
			sheetId: import.meta.env.VITE_GOOGLE_SHEETS_ID,
			sheetsOptions: [
				{
					id: QUOTES_SHEET_NAME,
				},
			],
		});

		const quotesSheet = sheets.find((sheet) => sheet.id === "Quotes");

		return quotesSheet?.data as Quote[];
	} catch (error) {
		console.error("Error fetching quotes:", error);
		throw error;
	}
};

export default getQuotes;
