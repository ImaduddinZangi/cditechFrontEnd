import React, { useCallback, useRef, useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { toast } from "react-toastify";
import { useGetCustomersQuery } from "../../redux/api/customerApi";
import Loader from "../Constants/Loader";
import { Customer } from "../../redux/features/customerSlice";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const initialCenter = { lat: 40.7128, lng: -74.006 };

const ViewCustomersMap: React.FC = () => {
  const { data: customers, isLoading, isError } = useGetCustomersQuery();
  const [customerMarkers, setCustomerMarkers] = useState<any[]>([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const geocodeAddresses = useCallback(async () => {
    const geocodedMarkers: any[] = [];
    const geocoder = new google.maps.Geocoder();

    if (!customers) return;

    for (const customer of customers) {
      try {
        const serviceResults = await geocoder.geocode({
          address: customer.service_address,
        });
        if (serviceResults.results.length > 0) {
          geocodedMarkers.push({
            id: customer.id + "-service",
            customer,
            position: serviceResults.results[0].geometry.location,
            type: "service",
          });
        }
        const billingResults = await geocoder.geocode({
          address: customer.billing_address,
        });
        if (billingResults.results.length > 0) {
          geocodedMarkers.push({
            id: customer.id + "-billing",
            customer,
            position: billingResults.results[0].geometry.location,
            type: "billing",
          });
        }
      } catch (error) {
        toast.error(`Failed to geocode address for ${customer.name}`);
      }
    }

    setCustomerMarkers(geocodedMarkers);
  }, [customers]);

  useEffect(() => {
    if (isLoaded && customers) {
      geocodeAddresses();
    }
  }, [isLoaded, customers, geocodeAddresses]);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleMarkerClick = (marker: any, map: google.maps.Map) => {
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="text-center">
          <img
            src="${getCustomerPhotoUrl(marker.customer)}"
            alt="Customer"
            class="w-[6vw] h-[6vw] rounded-full"
          />
          <h3 class="mt-[0.5vw] text-[1.2vw] text-darkgray-0 font-semibold">
            ${marker.customer.name}
          </h3>
          <p class="text-gray-0">${marker.customer.email}</p>
          <p class="text-gray-0">${marker.customer.phone}</p>
          <p class="text-gray-0">
            ${
              marker.type === "service"
                ? marker.customer.service_address
                : marker.customer.billing_address
            }
          </p>
        </div>
      `,
    });

    infoWindow.setPosition(marker.position);
    infoWindow.open(map);
    infoWindowRef.current = infoWindow;
  };

  const getCustomerPhotoUrl = (customer: Customer) => {
    const defaultImageUrl = "/assets/no-image.jpg";
    const photoUrl = customer.photos.length
      ? `https://inspection-point-s3.s3.us-east-2.amazonaws.com/${customer.photos[0]}`
      : defaultImageUrl;
    return photoUrl;
  };

  if (loadError || isError) {
    return <div>Error loading Google Maps</div>;
  }

  if (isLoading || !isLoaded) {
    return (
      <div className="w-full h-[70h] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="m-[2vw] bg-white shadow-lg rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={10}
        onLoad={onMapLoad}
      >
        {customerMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={{
              url: getCustomerPhotoUrl(marker.customer),
              scaledSize: new google.maps.Size(50, 50),
            }}
            onClick={() => handleMarkerClick(marker, mapRef.current!)}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default ViewCustomersMap;
