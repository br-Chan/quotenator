import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Quote } from "#/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Function expects date to be of form DD/MM/YYYY
export function formatDate(date: string): string {
	const [day, month, year] = date.split("/");
	const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
	return Intl.DateTimeFormat("en-NZ", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(parsedDate);
}

export function findNextQuoteInCategory(
	quotes: Quote[],
	currentQuoteIndex: number,
): number | null {
	const currentQuote = quotes[currentQuoteIndex];
	const nextQuoteIndex = quotes.findIndex(
		(q, i) => i > currentQuoteIndex && q.Category === currentQuote.Category,
	);
	return nextQuoteIndex !== -1 ? nextQuoteIndex : null;
}

export function findPreviousQuoteInCategory(
	quotes: Quote[],
	currentQuoteIndex: number,
): number | null {
	const currentQuote = quotes[currentQuoteIndex];
	const previousQuoteIndex = quotes.findLastIndex(
		(q, i) => i < currentQuoteIndex && q.Category === currentQuote.Category,
	);
	return previousQuoteIndex !== -1 ? previousQuoteIndex : null;
}
