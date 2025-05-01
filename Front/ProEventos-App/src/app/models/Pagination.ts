export class Pagination {
    currentPage: number = 2;
    itemsPerPage: number = 3;
    totalItems: number = 1;
    totalPages: number = 1;
}

export class PaginatedResult<T> {
    result?: T;
    pagination?: Pagination
}