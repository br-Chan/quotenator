const SHEET_NAME = "Quotes";

type Quote = {
	Quote: string;
	Owner: string;
	Context: string;
	Date: string;
	Type: string;
	Link: string;
	Category: string;
};

export { SHEET_NAME, type Quote };
