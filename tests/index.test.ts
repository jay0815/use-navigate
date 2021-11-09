import '@testing-library/jest-dom';

import { act, renderHook } from '@testing-library/react-hooks/dom';

import useNavigate from '../src';

test('', () => {
  const { result } = renderHook(() => useNavigate());
  // replace full pathname
  const FULL_PATHNAME = '/ab/c';
  act(() => {
    result.current.push(FULL_PATHNAME);
  });

  expect(result.current.route.pathname).toBe(FULL_PATHNAME);
  // replace last pathname
  const LAST_PATHNAME = 'ab/c';
  act(() => {
    result.current.push(LAST_PATHNAME);
  });

  expect(result.current.route.pathname).toMatch(LAST_PATHNAME);
});
