import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Quote } from "#/types/quotes";
import type { DataTableFeatures } from "./data-table-features";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Quote>();

export const columns = columnHelper.columns([
	columnHelper.accessor("Quote", {
		header: "Quote",
		cell: (row) => (
			<div className="whitespace-pre-wrap">
				<Markdown remarkPlugins={[remarkGfm]}>{row.getValue()}</Markdown>
			</div>
		),
	}),
	columnHelper.accessor("Owner", {
		header: "Owner",
	}),
	columnHelper.accessor("Context", {
		header: "Context",
		cell: (row) => <div className="whitespace-pre-wrap">{row.getValue()}</div>,
	}),
	columnHelper.accessor("Date", {
		header: ({ column }) => {
			return (
				<button
					className="btn btn-sm btn-ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					type="button"
				>
					Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</button>
			);
		},
		sortFn: "datetime",
	}),
	columnHelper.accessor("Type", {
		header: "Type",
	}),
	// columnHelper.accessor("Link", {
	// 	header: "Link",
	// }),
	columnHelper.accessor("Category", {
		header: "Category",
	}),
]);
