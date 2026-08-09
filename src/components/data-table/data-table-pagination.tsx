import type { ReactTable, RowData } from "@tanstack/react-table";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import type { DataTableFeatures } from "./data-table-features";

interface DataTablePaginationProps<TData extends RowData> {
	table: ReactTable<DataTableFeatures, TData>;
}

export function DataTablePagination<TData extends RowData>({
	table,
}: DataTablePaginationProps<TData>) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-6 lg:gap-8">
				<div className="flex items-center gap-2">
					<label className="select select-sm border-black">
						<span className="label border-black">Rows per page</span>
						<select
							onChange={(e) => table.setPageSize(Number(e.target.value))}
							value={`${table.state.pagination.pageSize}`}
						>
							{[10, 20, 25, 30, 40, 50].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									{pageSize}
								</option>
							))}
						</select>
					</label>
				</div>
				<div className="flex w-25 items-center justify-center text-sm font-medium">
					Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}
				</div>
				<div className="flex items-center gap-2">
					<button
						type="button"
						className="btn btn-outline btn-sm lg:flex hidden btn-square"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to first page</span>
						<ChevronsLeft />
					</button>
					<button
						type="button"
						className="btn btn-outline btn-sm btn-square"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft />
					</button>
					<button
						type="button"
						className="btn btn-outline btn-sm btn-square"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRight />
					</button>
					<button
						type="button"
						className="btn btn-outline btn-sm lg:flex hidden btn-square"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to last page</span>
						<ChevronsRight />
					</button>
				</div>
			</div>
		</div>
	);
}
