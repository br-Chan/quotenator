import type {
	ColumnFiltersState,
	PaginationState,
} from "@tanstack/react-table";
import type { Category } from "#/types/quotes";
import type { QuoteSearch } from "#/types/search";

const filtersToSearch = (filters: ColumnFiltersState): QuoteSearch => {
	return {
		q:
			(filters.find((filter) => filter.id === "Quote")?.value as string) ??
			undefined,
		owner:
			(filters.find((filter) => filter.id === "Owner")?.value as string) ??
			undefined,
		category:
			(filters.find((filter) => filter.id === "Category")?.value as Category) ??
			undefined,
	};
};

const searchToFilters = (search: QuoteSearch): ColumnFiltersState => {
	return [
		...(search.q ? [{ id: "Quote", value: search.q }] : []),
		...(search.owner ? [{ id: "Owner", value: search.owner }] : []),
		...(search.category ? [{ id: "Category", value: search.category }] : []),
	];
};

const paginationStateToSearch = (pagination: PaginationState): QuoteSearch => {
	return {
		page: pagination.pageIndex + 1,
		pageSize: pagination.pageSize,
	};
};

const searchToPaginationState = (search: QuoteSearch): PaginationState => {
	return {
		pageIndex: (search.page ?? 1) - 1,
		pageSize: search.pageSize ?? 10,
	};
};

export {
	filtersToSearch,
	searchToFilters,
	paginationStateToSearch,
	searchToPaginationState,
};
