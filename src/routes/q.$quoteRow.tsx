import { createFileRoute } from "@tanstack/react-router";
import { Status } from "use-google-sheets";
import { useQuotes } from "#/hooks/useQuotes";

export const Route = createFileRoute("/q/$quoteRow")({
	component: RouteComponent,
});

function RouteComponent() {
	const { quoteRow } = Route.useParams();

	const { status, quotes, error } = useQuotes();

	if (status === Status.pending) {
		return <div>Loading...</div>;
	}

	if (status === Status.error) {
		return <div>Error: {error?.message}</div>;
	}

	const quote = quotes[parseInt(quoteRow, 10) - 1];

	return (
		<div className="p-8">
			<h1 className="text-4xl font-bold">Quote Row: {quoteRow}</h1>
			<p className="mt-4 text-lg">{quote.Quote}</p>
			<p>{quote.Owner}</p>
			<p>{quote.Context}</p>
			<p>{quote.Date}</p>
		</div>
	);
}
