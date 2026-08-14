type QuoteSearch = {
	page?: number;
	pageSize?: number;
	q?: string;
	owner?: string;
	category?: string;
};

const validateQuoteSearch = (search: Record<string, unknown>): QuoteSearch => {
	return {
		page:
			Number(search?.page) !== 1 && !Number.isNaN(Number(search?.page))
				? Number(search?.page)
				: undefined,
		pageSize:
			Number(search?.pageSize) !== 10 && !Number.isNaN(Number(search?.pageSize))
				? Number(search?.pageSize)
				: undefined,
		q: String(search?.q) !== "undefined" ? String(search?.q) : undefined,
		owner:
			String(search?.owner) !== "undefined" ? String(search?.owner) : undefined,
		category:
			String(search?.category) !== "undefined"
				? String(search?.category)
				: undefined,
	};
};

export { type QuoteSearch, validateQuoteSearch };
