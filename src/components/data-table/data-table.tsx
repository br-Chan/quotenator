"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type PaginationState,
	type RowData,
	useTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
	filtersToSearch,
	paginationStateToSearch,
	searchToFilters,
	searchToPaginationState,
} from "#/lib/search";
import { categoryValues } from "#/types/quotes";
import type { QuoteSearch } from "#/types/search";
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
	quoteSearch: QuoteSearch;
	onSearchChange: (updates: QuoteSearch) => void;
}

export function DataTable<TData extends RowData>({
	columns,
	data,
	onRowClick = () => {},
	quoteSearch,
	onSearchChange,
}: DataTableProps<TData>) {
	const columnFilters: ColumnFiltersState = useMemo(
		() => searchToFilters(quoteSearch),
		[quoteSearch],
	);
	const pagination: PaginationState = useMemo(
		() => searchToPaginationState(quoteSearch),
		[quoteSearch],
	);

	const table = useTable({
		features,
		data,
		columns,
		onColumnFiltersChange: (updater) => {
			const newFilters =
				typeof updater === "function" ? updater(columnFilters) : updater;

			onSearchChange({
				...filtersToSearch(newFilters),
				page: undefined,
			});
		},
		onPaginationChange: (updater) => {
			const newPagination =
				typeof updater === "function" ? updater(pagination) : updater;
			onSearchChange({
				...paginationStateToSearch(newPagination),
			});
		},
		autoResetPageIndex: false,
		state: {
			columnFilters,
			pagination,
		},
	});

	const [textInputValues, setTextInputValues] = useState<{
		[key: string]: string;
	}>({
		Quote: (table.getColumn("Quote")?.getFilterValue() as string) ?? "",
		Owner: (table.getColumn("Owner")?.getFilterValue() as string) ?? "",
	});

	const debouncedOnSearchChange = useDebouncedCallback(
		(column: string, value: string) => {
			table.getColumn(column)?.setFilterValue(value);
		},
		150,
	);

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
							value={textInputValues.Quote}
							onChange={(event) => {
								setTextInputValues((previous) => ({
									...previous,
									Quote: event.target.value,
								}));
								debouncedOnSearchChange("Quote", event.target.value);
							}}
						/>
					</label>
					<label className="floating-label min-w-0 w-full">
						<span>Person</span>
						<input
							className="input input-sm w-full border-black"
							type="text"
							placeholder="Search by person"
							value={textInputValues.Owner}
							onChange={(event) => {
								setTextInputValues((previous) => ({
									...previous,
									Owner: event.target.value,
								}));
								debouncedOnSearchChange("Owner", event.target.value);
							}}
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
