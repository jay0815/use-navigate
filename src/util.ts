import type { NavigateURL, URLParams } from './typing';

/**
 *
 * @param URL searchParams
 * @returns Object
 */
export const getQuery = (
  searchParams: URLSearchParams,
): Record<string, unknown> => {
  const query = searchParams;
  const keys = [...query.keys()];
  const n = keys.length - 1;
  // fast json
  const res = keys.reduce((before, local, index) => {
    const value = query.getAll(local);
    // 非 number 、 string 类型时 需要加 引号
    const next = `${before}"${local}":${
      value.length > 1 ? `${JSON.stringify(value)}` : `"${value[0]}"`
    }`;
    return `${next}${index !== n ? ',' : ''}`;
  }, '');
  return JSON.parse(`{ ${res} }`) as Record<string, unknown>;
};
/**
 *
 * @param {String} url
 * @returns
 */
const formatURL = (url: string | URLParams) => {
  let nextURL = '';
  if (typeof url === 'string') {
    if (!/^http[s]?:\/\//.test(url)) {
      if (/^\//.test(url)) {
        nextURL = window.location.origin + url;
      } else {
        const path = window.location.pathname.split('/');
        path.pop();
        nextURL = window.location.origin + path.concat(url).join('/');
      }
    }
  } else {
    const { query, pathname = window.location.pathname } = url;
    const search = new URLSearchParams();
    const keys = Object.keys(query);
    if (keys.length) {
      keys.forEach((key) => {
        const value = query[key];
        // append will auto format value into string
        search.append(key, value as string);
      });
      nextURL = `${pathname}?${search.toString()}`;
    } else {
      nextURL = pathname;
    }
    nextURL = window.location.origin + nextURL;
  }
  return nextURL;
};

export const spreadURL = (url?: string | URLParams): NavigateURL => {
  const nextUrl = url ? formatURL(url) : window.location.href;
  const { host, origin, pathname, port, protocol, search, searchParams } =
    new URL(nextUrl);
  return {
    query: getQuery(searchParams),
    host,
    origin,
    pathname,
    port,
    protocol,
    search,
  };
};
