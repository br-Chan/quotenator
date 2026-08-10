import type { CumulativeChartPoint } from "#/types/chart";
import type { Quote } from "#/types/quotes";
import { parseDate } from "./utils";

const splitOwners = (ownerString: string): string[] => {
	return ownerString.split(",").map((owner) => owner.trim());
};

const getOwners = (quotes: Quote[]): string[] => {
	const ownersSet = new Set<string>();
	for (const quote of quotes) {
		const owners = splitOwners(quote.Owner);
		for (const owner of owners) {
			ownersSet.add(owner);
		}
	}
	return [...ownersSet];
};

const createQuotesByDateMap = (
	quotes: Quote[],
): Map<string, Map<string, number>> => {
	// Create a map of "for each date, how many quotes did each owner have?"
	const quotesByDate = new Map<string, Map<string, number>>(); // Map<date, Map<owner, count>>

	// Populate the quotes by date map
	for (const quote of quotes) {
		const date = quote.Date;

		// Create map for the date if it doesn't exist
		if (!quotesByDate.has(date)) {
			quotesByDate.set(date, new Map());
		}

		// Increment the count for the owner on that date
		const quotesByOwner = quotesByDate.get(date)!;
		const owners = splitOwners(quote.Owner);
		for (const owner of owners) {
			quotesByOwner.set(owner, (quotesByOwner.get(owner) ?? 0) + 1);
		}
	}
	return quotesByDate;
};

const createCumulativeData = (quotes: Quote[]): CumulativeChartPoint[] => {
	// Assume that the data is already sorted chronologically.

	// Create an array of all owners
	const owners = getOwners(quotes);

	const quotesByDate = createQuotesByDateMap(quotes);

	// Set up the cumulative totals for each owner
	const totals: Record<string, number> = {};
	for (const owner of owners) {
		totals[owner] = 0;
	}

	return [...quotesByDate.entries()].map(([date, quotesByOwner]) => {
		// Update the cumulative totals based on the new date
		for (const [owner, count] of quotesByOwner) {
			totals[owner] += count;
		}

		// Add date and cumulative totals to CumulativeChartPoint[]
		return {
			date: parseDate(date),
			...totals,
		};
	});
};

const getTopOwners = (quotes: Quote[], topN: number): string[] => {
	const owners = getOwners(quotes);
	const ownerCounts: Record<string, number> = {};

	// Populate ownerCounts with all quotes' owner counts
	for (const quote of quotes) {
		const owners = splitOwners(quote.Owner);
		for (const owner of owners) {
			ownerCounts[owner] = (ownerCounts[owner] || 0) + 1;
		}
	}

	// Return top N owners sorted by counts in descending order
	return owners
		.filter((owner) => ownerCounts[owner] > 0)
		.sort((a, b) => ownerCounts[b] - ownerCounts[a])
		.slice(0, topN);
};

export { createCumulativeData, getOwners, getTopOwners, splitOwners };
