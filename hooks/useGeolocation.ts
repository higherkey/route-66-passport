"use client";
import { useState, useEffect } from 'react';

export interface GeoState {
  lat: number | null;
  lng: number | null;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({
    lat: null,
    lng: null,
    error: null
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, error: "Geolocation is not supported by your browser" }));
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        error: null
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setState(s => ({ ...s, error: error.message }));
    };

    const watcher = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return state;
}
