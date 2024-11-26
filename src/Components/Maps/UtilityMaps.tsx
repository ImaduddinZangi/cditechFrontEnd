import React from "react";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import Loader from "../Constants/Loader";

interface UtilityMapsProps {
    mapType: "customers" | "assets" | "inspections" | "tasks";
    data: Array<{
        id: string;
        lat: number;
        lng: number;
        label: string;
    }>;
    lines?: Array<{
        start: { lat: number; lng: number };
        end: { lat: number; lng: number };
        color: string;
    }>;
}

const containerStyle = {
    width: "100%",
    height: "500px",
};

const center = {
    lat: 37.7749,
    lng: -122.4194,
};

const UtilityMaps: React.FC<UtilityMapsProps> = ({ mapType, data, lines = [] }) => {

    console.log("lat/lng: ", lines);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API || "",
    });

    if (!isLoaded) {
        return (
            <div className="w-full h-[70vh] flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
            <h2 className="text-lg font-semibold text-center p-2 bg-gray-100">
                {mapType.charAt(0).toUpperCase() + mapType.slice(1)} Map
            </h2>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                options={{
                    mapTypeId: google.maps.MapTypeId.HYBRID,
                    fullscreenControl: false,
                    streetViewControl: false,
                    mapTypeControl: true,
                }}
            >
                {/* Markers */}
                {data.map((item) => (
                    <Marker
                        key={item.id}
                        position={{ lat: item.lat, lng: item.lng }}
                        label={{
                            text: item.label,
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "bold",
                        }}
                    />
                ))}

                {/* Polylines */}
                {lines.map((line, index) => (
                    <Polyline
                        key={index}
                        path={[line.start, line.end]}
                        options={{
                            strokeColor: line.color,
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                        }}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default UtilityMaps;
