import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { toast } from "react-toastify";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import InputField from "../Tags/InputField";

interface RouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (route: Array<{ latitude: number; longitude: number }>) => void;
  initialRoute?: Array<{ latitude: number; longitude: number }>;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const initialCenter = { lat: 40.7128, lng: -74.006 };

const libraries: ("places" | "drawing")[] = ["places"];

const RouteModal: React.FC<RouteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialRoute,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
    libraries,
  });

 
  const [startPoint, setStartPoint] = useState<{
    lat: number;
    lng: number;
  } | null>(
    initialRoute?.[0]
      ? { lat: initialRoute[0].latitude, lng: initialRoute[0].longitude }
      : null
  );

  const [endPoint, setEndPoint] = useState<{ lat: number; lng: number } | null>(
    initialRoute?.[1]
      ? { lat: initialRoute[1].latitude, lng: initialRoute[1].longitude }
      : null
  );

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (startPoint && endPoint) {
      fetchDirections(endPoint);
    }
  }, [startPoint, endPoint]);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        mapRef.current?.panTo(place.geometry.location);
        mapRef.current?.setZoom(15);
      } else {
        toast.error("No details available for this location.");
      }
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!startPoint) {
      setStartPoint({ lat: e.latLng!.lat(), lng: e.latLng!.lng() });
    } else if (!endPoint) {
      setEndPoint({ lat: e.latLng!.lat(), lng: e.latLng!.lng() });
      fetchDirections({ lat: e.latLng!.lat(), lng: e.latLng!.lng() });
    }
  };

  const fetchDirections = (endPoint: { lat: number; lng: number }) => {
    if (startPoint) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: startPoint,
          destination: endPoint,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
          } else {
            console.error("Directions request failed due to " + status);
            toast.error(
              "Failed to fetch directions. Please check your API key and permissions."
            );
          }
        }
      );
    }
  };

  const handleSave = () => {
    if (startPoint && endPoint) {
      onSave([
        { latitude: startPoint.lat, longitude: startPoint.lng },
        { latitude: endPoint.lat, longitude: endPoint.lng },
      ]);
      onClose();
    } else {
      toast.error("Please select both a starting and an ending point.");
    }
  };

  const handleMarkerDragEnd = (
    position: google.maps.LatLngLiteral,
    type: "start" | "end"
  ) => {
    if (type === "start") {
      setStartPoint(position);
      if (endPoint) {
        fetchDirections(endPoint);
      }
    } else {
      setEndPoint(position);
      fetchDirections(position);
    }
  };

  const handleDeleteMarker = (type: "start" | "end") => {
    if (type === "start") {
      setStartPoint(null);
      setDirections(null);
    } else {
      setEndPoint(null);
      setDirections(null);
    }
  };

  if (!isOpen || !isLoaded || loadError) {
    if (loadError) {
      toast.error("Error loading Google Maps. Please try again later.");
    }
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
        <h2 className="text-2xl mb-4">Select Route</h2>
        <div className="mb-4">
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <InputField
              ref={inputRef}
              fieldType="text"
              placeholder="Enter a location to center the map"
              name="location"
            />
          </Autocomplete>
        </div>
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={startPoint || initialCenter}
            zoom={10}
            onClick={handleMapClick}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            {startPoint && (
              <Marker
                position={startPoint}
                label="Start"
                draggable
                onDragEnd={(e) =>
                  handleMarkerDragEnd(e.latLng!.toJSON(), "start")
                }
                onDblClick={() => handleDeleteMarker("start")}
              />
            )}
            {endPoint && (
              <Marker
                position={endPoint}
                label="End"
                draggable
                onDragEnd={(e) =>
                  handleMarkerDragEnd(e.latLng!.toJSON(), "end")
                }
                onDblClick={() => handleDeleteMarker("end")}
              />
            )}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <PurpleButton type="button" text="Save Route" onClick={handleSave} />
          <WhiteButton type="button" text="Cancel" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default RouteModal;

// import React, { useState, useRef, useEffect } from "react";
// import {
//   GoogleMap,
//   DirectionsRenderer,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { Autocomplete } from "@react-google-maps/api";
// import { toast } from "react-toastify";
// import PurpleButton from "../Tags/PurpleButton";
// import WhiteButton from "../Tags/WhiteButton";
// import InputField from "../Tags/InputField";
// import CustomMarker from "./Constants/CustomMarker";

// interface RouteModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (route: Array<{ latitude: number; longitude: number }>) => void;
//   initialRoute?: Array<{ latitude: number; longitude: number }>;
// }

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const initialCenter = { lat: 40.7128, lng: -74.006 };

// const libraries: ("places" | "drawing")[] = ["places"];

// const RouteModal: React.FC<RouteModalProps> = ({
//   isOpen,
//   onClose,
//   onSave,
//   initialRoute,
// }) => {
//   const { isLoaded, loadError } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
//     libraries,
//   });

//   const [startPoint, setStartPoint] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(
//     initialRoute?.[0]
//       ? { lat: initialRoute[0].latitude, lng: initialRoute[0].longitude }
//       : null
//   );

//   const [endPoint, setEndPoint] = useState<{ lat: number; lng: number } | null>(
//     initialRoute?.[1]
//       ? { lat: initialRoute[1].latitude, lng: initialRoute[1].longitude }
//       : null
//   );

//   const [directions, setDirections] =
//     useState<google.maps.DirectionsResult | null>(null);

//   const mapRef = useRef<google.maps.Map | null>(null);
//   const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   useEffect(() => {
//     if (startPoint && endPoint) {
//       fetchDirections(endPoint);
//     }
//   }, [startPoint, endPoint]);

//   const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
//     autocompleteRef.current = autocomplete;
//   };

//   const onPlaceChanged = () => {
//     if (autocompleteRef.current !== null) {
//       const place = autocompleteRef.current.getPlace();
//       if (place.geometry && place.geometry.location) {
//         mapRef.current?.panTo(place.geometry.location);
//         mapRef.current?.setZoom(15);
//       } else {
//         toast.error("No details available for this location.");
//       }
//     }
//   };

//   const handleMapClick = (e: google.maps.MapMouseEvent) => {
//     if (!startPoint) {
//       setStartPoint({ lat: e.latLng!.lat(), lng: e.latLng!.lng() });
//     } else if (!endPoint) {
//       setEndPoint({ lat: e.latLng!.lat(), lng: e.latLng!.lng() });
//       fetchDirections({ lat: e.latLng!.lat(), lng: e.latLng!.lng() });
//     }
//   };

//   const fetchDirections = (endPoint: { lat: number; lng: number }) => {
//     if (startPoint) {
//       const directionsService = new google.maps.DirectionsService();
//       directionsService.route(
//         {
//           origin: startPoint,
//           destination: endPoint,
//           travelMode: google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === google.maps.DirectionsStatus.OK && result) {
//             setDirections(result);
//           } else {
//             console.error("Directions request failed due to " + status);
//             toast.error(
//               "Failed to fetch directions. Please check your API key and permissions."
//             );
//           }
//         }
//       );
//     }
//   };

//   const handleSave = () => {
//     if (startPoint && endPoint) {
//       onSave([
//         { latitude: startPoint.lat, longitude: startPoint.lng },
//         { latitude: endPoint.lat, longitude: endPoint.lng },
//       ]);
//       onClose();
//     } else {
//       toast.error("Please select both a starting and an ending point.");
//     }
//   };

//   const handleMarkerDragEnd = (
//     position: google.maps.LatLngLiteral,
//     type: "start" | "end"
//   ) => {
//     if (type === "start") {
//       setStartPoint(position);
//       if (endPoint) {
//         fetchDirections(endPoint);
//       }
//     } else {
//       setEndPoint(position);
//       fetchDirections(position);
//     }
//   };

//   const handleDeleteMarker = (type: "start" | "end") => {
//     if (type === "start") {
//       setStartPoint(null);
//       setDirections(null);
//     } else {
//       setEndPoint(null);
//       setDirections(null);
//     }
//   };

//   if (!isOpen || !isLoaded || loadError) {
//     if (loadError) {
//       toast.error("Error loading Google Maps. Please try again later.");
//     }
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
//         <h2 className="text-2xl mb-4">Select Route</h2>
//         <div className="mb-4">
//           <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
//             <InputField
//               ref={inputRef}
//               fieldType="text"
//               placeholder="Enter a location to center the map"
//               id="location"
//               name="location"
//             />
//           </Autocomplete>
//         </div>
//         <div>
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={startPoint || initialCenter}
//             zoom={10}
//             onClick={handleMapClick}
//             onLoad={(map) => {
//               mapRef.current = map;
//             }}
//           >
//             {startPoint && (
//               <CustomMarker
//                 position={startPoint}
//                 label="Start"
//                 map={mapRef.current}
//                 gmpDraggable
//                 onDragEnd={(position) => handleMarkerDragEnd(position, "start")}
//                 onDblClick={() => handleDeleteMarker("start")}
//               />
//             )}
//             {endPoint && (
//               <CustomMarker
//                 position={endPoint}
//                 label="End"
//                 map={mapRef.current}
//                 gmpDraggable
//                 onDragEnd={(position) => handleMarkerDragEnd(position, "end")}
//                 onDblClick={() => handleDeleteMarker("end")}
//               />
//             )}
//             {directions && <DirectionsRenderer directions={directions} />}
//           </GoogleMap>
//         </div>
//         <div className="mt-4 flex justify-end space-x-2">
//           <PurpleButton type="button" text="Save Route" onClick={handleSave} />
//           <WhiteButton type="button" text="Cancel" onClick={onClose} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RouteModal;
