import {
  useCallback,
  useState,
} from 'react';

const useDebounceState = (initialValueOrFunction, debounce = 500) => {
  const [data, setData] = useState(initialValueOrFunction);
  const [tids] = useState([]);
  const attempt = useCallback((newData) => {
    if (tids.length) {
      tids.forEach((tid) => {
        clearTimeout(tid);
      });
    }
    tids.push(setTimeout(() => {
      setData(newData);
    }, debounce));
  }, [tids, setData]);


  return [data, attempt];
};

export default useDebounceState;