import { jwtDecode } from "jwt-decode";

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
