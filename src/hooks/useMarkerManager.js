import {
  useCallback,
  useState,
} from 'react';
import { NaverMap } from './useNaverMapV3';


const useMarkerManager = () => {

  const [markers, setMarkers] = useState([]);
  const addMarker = useCallback((map, { lat, lon, content }) => {
    if (!NaverMap) {
      return;
    }
    const marker = new NaverMap.Marker({
      map: map,
      position: NaverMap.LatLng(lon, lat),
    });

    const info = new NaverMap.InfoWindow({
      content,
    });

    NaverMap.Event.addListener(marker, 'click', function (e) {
      if (info.getMap()) {
        info.close();
      } else {
        info.open(map, marker);
      }
    });
    markers.push(marker);
    return marker;
  }, [markers]);
  const resetMarker = useCallback(() => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
  }, [markers]);

  const removeMarker = useCallback((marker) => {
    marker.setMap(null);
    setMarkers(markers.filter((v) => v !== marker));
  }, [markers]);

  return {
    addMarker,
    resetMarker,
    removeMarker,
  };
};

export default useMarkerManager;