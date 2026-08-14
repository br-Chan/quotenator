import {
	createFileRoute,
	useLoaderData,
	useNavigate,
} from "@tanstack/react-router";
import { CumulativeChart } from "#/components/chart/cumulative-chart";
import { OwnerChart } from "#/components/chart/owner-chart";
import { columns } from "#/components/data-table/columns";
import { DataTable } from "#/components/data-table/data-table";
import { type QuoteSearch, validateQuoteSearch } from "#/types/search";

export const Route = createFileRoute("/")({
	component: Home,
	pendingComponent: HomePending,
	validateSearch: (search: Record<string, unknown>): QuoteSearch => {
		return validateQuoteSearch(search);
	},
});

function Home() {
	const quoteSearch = Route.useSearch();
	const navigate = useNavigate({ from: Route.id });

	const quotes = useLoaderData({
		from: "__root__",
	});

	return (
		<div className="p-8">
			<h1 className="text-4xl font-bold">The Quotenator</h1>
			<div className="container mx-auto py-10">
				<DataTable
					columns={columns}
					data={quotes}
					onRowClick={(rowData) =>
						navigate({
							to: "/q/$quoteRow",
							params: { quoteRow: (quotes.indexOf(rowData) + 1).toString() },
						})
					}
					quoteSearch={quoteSearch}
					onSearchChange={(updates) => {
						navigate({
							search: (prev: QuoteSearch) => ({ ...prev, ...updates }),
							replace: true,
						});
					}}
				/>
			</div>

			<h2 className="text-3xl mb-4 text-center">Top Quoters</h2>
			<CumulativeChart quotes={quotes} />

			<h2 className="text-3xl mb-4 text-center">Quotes Leaderboard</h2>
			<OwnerChart quotes={quotes} />
		</div>
	);
}

function HomePending() {
	return (
		<div className="p-8">
			<h1 className="text-4xl font-bold">The Quotenator</h1>
			<div className="container mx-auto py-10">Loading...</div>
		</div>
	);
}
