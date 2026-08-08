import { createFileRoute, Link } from "@tanstack/react-router";
import { Status } from "use-google-sheets";
import { useQuotes } from "#/hooks/useQuotes";
import { formatDate } from "#/lib/utils";

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
		<div className="p-8 container mx-auto items-center justify-center gap-2 flex flex-col">
			<div className="w-lg flex flex-row justify-between py-2">
				<Link
					className="border rounded px-4 py-2 w-fit hover:bg-gray-100 hover:cursor-pointer"
					to="/"
				>
					Back
				</Link>
				<button
					type="button"
					className="border rounded px-4 py-2 w-fit hover:bg-gray-100 hover:cursor-pointer"
				>
					Copy Image
				</button>
			</div>

			<div className="relative flex flex-col items-center justify-center aspect-square w-lg p-4 bg-radial from-amber-100 to-amber-200">
				<p className="mt-4 text-4xl text-center caudex-bold-italic">
					{quote.Quote}
				</p>
				<div className="absolute bottom-4 items-center justify-center text-center">
					<p>~</p>
					<p className="text-lg italic">{quote.Owner},</p>
					<p className="text-md">{formatDate(quote.Date)}</p>
				</div>
			</div>
		</div>
	);
}
