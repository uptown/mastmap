import { useCallback } from 'react';


const useGeoLocation = () => {
  return useCallback((onSuccess, onError = undefined) => {
    navigator.geolocation.getCurrentPosition((position) => {
      onSuccess({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    }, (error) => {
      if (onError) {
        onError({
          code: error.code,
          message: error.message,
        });
      }
    });
  }, []);
};

export default useGeoLocation;