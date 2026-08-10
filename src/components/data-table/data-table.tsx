"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type RowData,
	type SortingState,
	useTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { categoryValues } from "#/types/quotes";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/table";
import { type DataTableFeatures, features } from "./data-table-features";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData extends RowData> {
	columns: ColumnDef<DataTableFeatures, TData>[];
	data: TData[];
	onRowClick?: (rowData: TData) => void;
}

export function DataTable<TData extends RowData>({
	columns,
	data,
	onRowClick = () => {},
}: DataTableProps<TData>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const table = useTable({
		features,
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		state: {
			sorting,
			columnFilters,
		},
	});

	return (
		<div>
			<div className="flex flex-col gap-2 py-2 lg:flex-row lg:justify-between">
				<div className="grid items-center gap-2 lg:grid-cols-4">
					<label className="floating-label min-w-0 w-full">
						<span>Quotes</span>
						<input
							className="input input-sm w-full border-black"
							type="text"
							placeholder="Search quotes"
							value={
								(table.getColumn("Quote")?.getFilterValue() as string) ?? ""
							}
							onChange={(event) =>
								table.getColumn("Quote")?.setFilterValue(event.target.value)
							}
						/>
					</label>
					<label className="floating-label min-w-0 w-full">
						<span>Person</span>
						<input
							className="input input-sm w-full border-black"
							type="text"
							placeholder="Search by person"
							value={
								(table.getColumn("Owner")?.getFilterValue() as string) ?? ""
							}
							onChange={(event) =>
								table.getColumn("Owner")?.setFilterValue(event.target.value)
							}
						/>
					</label>
					<label className="floating-label min-w-0 w-full">
						<span>Category</span>
						<select
							className="select select-sm w-full border-black"
							onChange={(e) =>
								table.getColumn("Category")?.setFilterValue(e.target.value)
							}
							defaultValue=""
							value={
								(table.getColumn("Category")?.getFilterValue() as string) ?? ""
							}
						>
							<option value="">All categories</option>
							{categoryValues.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</label>
					<span className="text-sm text-muted-foreground whitespace-nowrap">
						{table.getFilteredRowModel().rows.length} rows found
					</span>
				</div>
				<DataTablePagination table={table} />
			</div>

			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : (
												<table.FlexRender header={header} />
											)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									className="hover:bg-gray-100 hover:cursor-pointer"
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									onClick={() => onRowClick(row.original)}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											<table.FlexRender cell={cell} />
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
