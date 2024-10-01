import React, { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const ViewFullMap: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-[2vw] bg-white shadow-lg rounded-lg font-inter overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onMapLoad}
      />
    </div>
  );
};

export default ViewFullMap;
