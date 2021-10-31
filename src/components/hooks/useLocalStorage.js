import { useState, useEffect } from 'react';

export default function useLocalStorage(key, init) {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(key)) ?? init,
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
