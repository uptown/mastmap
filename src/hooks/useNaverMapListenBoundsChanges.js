import { useEffect } from 'react';
import useDebounceState from './useDebounceState';
import { NaverMap } from './useNaverMapV3';

const useNaverMapListenBoundsChanges = (map) => {

  const [bounds, setBounds] = useDebounceState();

  useEffect(() => {
    if (map) {
      setBounds(map.getBounds());
    }
  }, [map]);
  useEffect(() => {
    if (NaverMap && map) {
      let tid;
      const callback = (bounds) => {
        tid = setTimeout(() => {
          setBounds(bounds);
        }, 100);
      };
      const e = NaverMap.Event.addListener(map, 'bounds_changed', callback);
      return () => {
        NaverMap.Event.removeListener(e);
        clearTimeout(tid);
      };
    }
  }, [map, setBounds]);

  return bounds;
};

export default useNaverMapListenBoundsChanges;