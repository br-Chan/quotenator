import {
	createFileRoute,
	useLoaderData,
	useNavigate,
} from "@tanstack/react-router";
import { CumulativeChart } from "#/components/chart/cumulative-chart";
import { columns } from "#/components/data-table/columns";
import { DataTable } from "#/components/data-table/data-table";

export const Route = createFileRoute("/")({
	component: Home,
	pendingComponent: HomePending,
});

function Home() {
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
				/>
			</div>
			<h2 className="text-3xl mb-4 text-center">Top Quoters</h2>
			<CumulativeChart quotes={quotes} />
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
