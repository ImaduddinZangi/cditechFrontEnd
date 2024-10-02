import { useEffect } from "react";
import { useRefreshTokenMutation } from "../redux/api/authApi";

export const useTokenRefresh = () => {
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const interval = setInterval(async () => {
      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token) {
        try {
          await refreshToken({ refresh_token });
          console.log("Token refreshed automatically!");
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshToken]);

  return null;
};
