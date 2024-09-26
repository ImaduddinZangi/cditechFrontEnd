import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../Layouts/AuthLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLogin from "../../../Components/UserGroups/Users/UserLogin";
import { useLoginUserMutation } from "../../../redux/api/authApi";
import { setToken } from "../../../redux/features/clientUserSlice";

const ClientSignInPage: React.FC = () => {
  const [loginUser] = useLoginUserMutation();
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
      const result = await loginUser({ email, password }).unwrap();
      dispatch(setToken(result.access_token));
      if (result.client) {
        // dispatch(setClientUser(result.user));
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
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Login error: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else if (error instanceof Error) {
        toast.error("Login error: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      }
      console.error("Login error:", error);
    }
  };

  return (
    <AuthLayout>
      <UserLogin onSubmit={handleLogin} />
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
