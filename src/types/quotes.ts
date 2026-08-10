const QUOTES_SHEET_NAME = "Quotes";

type Quote = {
	Quote: string;
	Owner: string;
	Context: string;
	Date: string;
	Type: string;
	Link: string;
	Category: Category;
};

const Category = {
	CLOSE_FRIENDS: "Close Friends",
	WDCC_EXEC: "WDCC Exec",
	WDCC: "WDCC",
	ALLIED_TELESIS: "Allied Telesis",
	PART_IV_PROJECT: "Part IV Project",
	OTHER: "Other",
} as const;

type Category = (typeof Category)[keyof typeof Category];

const categoryValues = Object.values(Category) as Category[];

export { QUOTES_SHEET_NAME, type Quote, Category, categoryValues };
