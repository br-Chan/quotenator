import useGoogleSheets, { Status } from "use-google-sheets";
import type { Quote } from "#/types";

export const useQuotes = () => {
	if (
		!import.meta.env.VITE_GOOGLE_API_KEY ||
		!import.meta.env.VITE_GOOGLE_SHEETS_ID
	) {
		throw new Error(
			"Missing Google API key or Google Sheets ID in environment variables.",
		);
	}
	const { status, data, error } = useGoogleSheets({
		apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
		sheetId: import.meta.env.VITE_GOOGLE_SHEETS_ID,
		sheetsOptions: [
			{
				id: "Quotes",
			},
		],
	});

	const quotes: Quote[] = [];
	if (status === Status.success && data.length !== 0) {
		const quotesSheet = data.find((sheet) => sheet.id === "Quotes");

		quotes.push(...(quotesSheet?.data as Quote[]));
	}

	return { status, quotes, error };
};
