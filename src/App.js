import * as axios from 'axios';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import './App.css';
import useGeoLocation from './hooks/useGeoLocation';
import useMarkerManager from './hooks/useMarkerManager';
import useNaverMapListenBoundsChanges from './hooks/useNaverMapListenBoundsChanges';
import useNaverMapV3, { newCenter } from './hooks/useNaverMapV3';

function App() {
  const ref = useRef();
  const getGeoLocation = useGeoLocation();
  const [map, setMap] = useState();
  const [currentGeo, setCurrentGeo] = useState();
  const {
    resetMarker,
    addMarker,
  } = useMarkerManager();

  const mapBounds = useNaverMapListenBoundsChanges(map);

  const loadNaverMap = useNaverMapV3('hkwn4l6a2c');

  useEffect(() => {
    getGeoLocation(({ lat, lon }) => {
      setCurrentGeo({
        lat,
        lon,
      });
    }, () => {
      alert('위치정보를 가져오는데 실패했습니다.');
    });
  }, [getGeoLocation]);

  useEffect(() => {
    if (!(ref.current && loadNaverMap)) {
      return;
    }
    if (currentGeo) {
      if (!map) {
        setMap(loadNaverMap(ref, currentGeo, 16));
      } else {
        map.setCenter(newCenter(currentGeo));
      }
    }
  }, [ref, currentGeo, loadNaverMap, map]);

  useEffect(() => {
    console.log(mapBounds);
    if (mapBounds) {
      const ne = map.getBounds().getNE();
      const sw = map.getBounds().getSW();
      axios.get(`http://api.adrinerdp.co/getSpots?lon1=${sw.lng()}&lon2=${ne.lng()}&lat1=${ne.lat()}&lat2=${sw.lat()}`).then((r) => {
        resetMarker();
        r.data.forEach((each) => {
          addMarker(map, {
            lat: Number.parseFloat(each.lat),
            lon: Number.parseFloat(each.lng),
            content: `
            <pre>
               ${JSON.stringify(each, undefined, 2)}
            </pre>
            `,
          });
        });
      });
    }
  }, [mapBounds, map]);

  return (
    <div className="App">
      <div
        ref={ref}
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />
    </div>
  );
}

export default App;
