import React from "react";
import ClientSignIn from "../../Components/Auth/ClientSignIn";
import {
  useLoginClientMutation,
  useLazyRefreshTokenQuery,
} from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setToken, setClient } from "../../redux/features/clientSlice";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layouts/AuthLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientSignInPage: React.FC = () => {
  const [loginClient] = useLoginClientMutation();
  const [refreshToken] = useLazyRefreshTokenQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await loginClient({ email, password }).unwrap();
      dispatch(setToken(result.access_token));
      if (result.client) {
        dispatch(setClient(result.client));
        if (result.client.user.two_factor_enabled) {
          toast.success("Login successful!", {
            onClose: () => navigate("/client-dashboard"),
            autoClose: 500,
          });
        } else {
          toast.success("Two-factor authentication required!", {
            onClose: () => navigate("/2fa"),
            autoClose: 500,
          });
        }
      }

      const refreshTokenInterval = setInterval(async () => {
        try {
          const refreshResult = await refreshToken().unwrap();
          localStorage.setItem("token", refreshResult.access_token);
          dispatch(setToken(refreshResult.access_token));
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }, 900000);

      return () => clearInterval(refreshTokenInterval);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Login error: " + error.data.message);
      } else if (error instanceof Error) {
        toast.error("Login error: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <AuthLayout>
      <ClientSignIn onSubmit={handleLogin} />
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthLayout>
  );
};

export default ClientSignInPage;
