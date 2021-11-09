import type { NavigateURL, URLParams } from './typing';
/**
 *
 * @param URL searchParams
 * @returns Object
 */
export declare const getQuery: (searchParams: URLSearchParams) => Record<string, unknown>;
export declare const spreadURL: (url?: string | URLParams<Record<string, unknown>> | undefined) => NavigateURL;
