import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
