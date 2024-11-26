import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface UserPayload {
  clientId: string;
  email: string;
  name: string;
}

export const getUserFromToken = (): UserPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<UserPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const getUserId = (): string | null => {
  const user = getUserFromToken();
  return user ? user.clientId : null;
};

export const getAddressFromLatLng = async (lat: number, lng: number) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const address =
      response.data.results[0]?.formatted_address || "Address not found";
    return address;
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Error fetching address";
  }
};

export const getLatLngFromAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const location = response.data.results[0]?.geometry?.location;
    return location || null;
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
};
