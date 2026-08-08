import { Button } from "@base-ui/react/button";
import { Select } from "@base-ui/react/select";
import { type ReactTable, type RowData } from "@tanstack/react-table";
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
		<div className="flex items-center justify-between px-2">
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<Select.Root
						value={`${table.state.pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<Select.Label className="text-sm font-medium">
							Rows per page:
						</Select.Label>
						<Select.Trigger className="border rounded px-2 py-1 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:cursor-pointer">
							<Select.Value placeholder={table.state.pagination.pageSize} />
						</Select.Trigger>
						<Select.Portal>
							<Select.Backdrop />
							<Select.Positioner>
								<Select.Popup className="border bg-white cursor-pointer">
									<Select.List>
										{[10, 20, 25, 30, 40, 50].map((pageSize) => (
											<Select.Item
												className="px-2 hover:bg-gray-100 hover:pointer-cursor"
												key={pageSize}
												value={`${pageSize}`}
											>
												{pageSize}
											</Select.Item>
										))}
									</Select.List>
								</Select.Popup>
							</Select.Positioner>
						</Select.Portal>
					</Select.Root>
				</div>
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}
				</div>
				<div className="flex items-center gap-2">
					<Button
						className="items-center justify-center hidden lg:flex border rounded size-8 hover:bg-gray-100 hover:cursor-pointer disabled:*:opacity-50 disabled:cursor-not-allowed"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to first page</span>
						<ChevronsLeft />
					</Button>
					<Button
						className="flex items-center justify-center border rounded size-8 hover:bg-gray-100 hover:cursor-pointer disabled:*:opacity-50 disabled:cursor-not-allowed"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft />
					</Button>
					<Button
						className="flex items-center justify-center border rounded size-8 hover:bg-gray-100 hover:cursor-pointer disabled:*:opacity-50 disabled:cursor-not-allowed"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRight />
					</Button>
					<Button
						className="items-center justify-center hidden lg:flex border rounded size-8 hover:bg-gray-100 hover:cursor-pointer disabled:*:opacity-50 disabled:cursor-not-allowed"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to last page</span>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</div>
	);
}
