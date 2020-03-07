import { useCallback } from 'react';

const clientMode = typeof window !== 'undefined';
export const NaverMap = clientMode && window.NaverMap;

const useNaverMapV3 = () => {
  return useCallback((ref, { lat, lon }, zoom = 10) => {
    if (NaverMap && ref.current) {
      ref.current.id = Date.now().toString(32) + Array(5).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
      return new NaverMap.Map(ref.current.id, {
        center: new NaverMap.LatLng(lat, lon),
        zoom,
      });
    }
    return null;
  }, []);
};

export const newCenter = ({ lat, lon }) => {
  return new NaverMap.LatLng(lat, lon);
};
export default useNaverMapV3;