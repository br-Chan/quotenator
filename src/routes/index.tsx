import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Status } from "use-google-sheets";
import { columns } from "#/components/data-table/columns";
import { DataTable } from "#/components/data-table/data-table";
import { useQuotes } from "#/hooks/useQuotes";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const navigate = useNavigate({ from: Route.id });

	const { status, quotes, error } = useQuotes();

	if (status === Status.pending) {
		return <div>Loading...</div>;
	}

	if (status === Status.error) {
		return <div>Error: {error?.message}</div>;
	}

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
		</div>
	);
}
