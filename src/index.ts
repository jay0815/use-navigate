import { useState } from 'react';

import type { NORMALURL } from './typing';
import { spreadURL } from './util';

const useNavigate = () => {
  const [route, setRoute] = useState(spreadURL);

  const replace = (url?: NORMALURL) => {
    try {
      const nextURL = spreadURL(url);
      const { pathname, search } = nextURL;
      window.history.replaceState(new Date().valueOf(), '', pathname + search);
      setRoute(nextURL);
    } catch (e) {
      console.error(`this is some error in ${JSON.stringify(e)}`);
    }
  };

  const push = (url?: NORMALURL) => {
    try {
      const nextURL = spreadURL(url);
      const { pathname, search } = nextURL;
      window.history.pushState(new Date().valueOf(), '', pathname + search);
      setRoute(nextURL);
    } catch (e) {
      console.error(`this is some error in ${JSON.stringify(e)}`);
    }
  };

  const go = (number: unknown) => {
    if (typeof number === 'number') {
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
    go,
  };
};

export default useNavigate;
