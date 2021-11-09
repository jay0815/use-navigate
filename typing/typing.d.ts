export interface NavigateURL<T = Record<string, unknown>> {
    query: T;
    host: string;
    origin: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
}
export interface URLParams<T = Record<string, unknown>> {
    pathname?: string;
    query: T;
}
