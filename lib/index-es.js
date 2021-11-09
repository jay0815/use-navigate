import { useState } from "react";
const getQuery = (searchParams) => {
  const query = searchParams;
  const keys = [...query.keys()];
  const n = keys.length - 1;
  const res = keys.reduce((before, local, index) => {
    const value = query.getAll(local);
    const next = `${before}"${local}":${value.length > 1 ? `${JSON.stringify(value)}` : `"${value[0]}"`}`;
    return `${next}${index !== n ? "," : ""}`;
  }, "");
  return JSON.parse(`{ ${res} }`);
};
const formatURL = (url) => {
  let nextURL = "";
  if (typeof url === "string") {
    if (!/^http[s]?:\/\//.test(url)) {
      if (/^\//.test(url)) {
        nextURL = window.location.origin + url;
      } else {
        const path = window.location.pathname.split("/");
        path.pop();
        nextURL = window.location.origin + path.concat(url).join("/");
      }
    }
  } else {
    const { query, pathname = window.location.pathname } = url;
    const search = new URLSearchParams();
    const keys = Object.keys(query);
    if (keys.length) {
      keys.forEach((key) => {
        const value = query[key];
        search.append(key, value);
      });
      nextURL = `${pathname}?${search.toString()}`;
    } else {
      nextURL = pathname;
    }
    nextURL = window.location.origin + nextURL;
  }
  return nextURL;
};
const spreadURL = (url) => {
  const nextUrl = url ? formatURL(url) : window.location.href;
  const { host, origin, pathname, port, protocol, search, searchParams } = new URL(nextUrl);
  return {
    query: getQuery(searchParams),
    host,
    origin,
    pathname,
    port,
    protocol,
    search
  };
};
const useNavigate = () => {
  const [route, setRoute] = useState(spreadURL);
  const replace = (url) => {
    try {
      const nextURL = spreadURL(url);
      const { pathname, search } = nextURL;
      window.history.replaceState(new Date().valueOf(), "", pathname + search);
      setRoute(nextURL);
    } catch (e) {
      console.error(`this is some error in ${JSON.stringify(e)}`);
    }
  };
  const push = (url) => {
    try {
      const nextURL = spreadURL(url);
      const { pathname, search } = nextURL;
      window.history.pushState(new Date().valueOf(), "", pathname + search);
      setRoute(nextURL);
    } catch (e) {
      console.error(`this is some error in ${JSON.stringify(e)}`);
    }
  };
  const go = (number) => {
    if (typeof number === "number") {
      window.history.go(number);
    } else {
      console.error(`${JSON.stringify(number)} is not number`);
    }
  };
  const goBack = () => {
    window.history.back();
  };
  return {
    replace,
    goBack,
    push,
    route,
    go
  };
};
export { useNavigate as default };
//# sourceMappingURL=index-es.js.map
