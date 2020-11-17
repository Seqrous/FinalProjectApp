export interface ResponsePageCredentials<T> {
    pageSize: number;
    currentPage: number;
    totalPages: number;
    totalCount: number;
    items: T[];
}