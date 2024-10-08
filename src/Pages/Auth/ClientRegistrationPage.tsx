import React from "react";
import {
  ClientRegisterRequest,
  useRegisterClientMutation,
} from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setToken, setClient } from "../../redux/features/clientSlice";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layouts/AuthLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddClient from "../../Components/Auth/AddClient";

const ClientRegistrationPage: React.FC = () => {
  const [registerClient] = useRegisterClientMutation();
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

  const handleRegistration = async (
    registrationData: ClientRegisterRequest
  ) => {
    try {
      const result = await registerClient(registrationData).unwrap();
      dispatch(setToken(result.access_token));
      if (result.client) {
        dispatch(setClient(result.client));
      }
      toast.success("Registration successful!", {
        onClose: () => navigate("/client-login"),
        autoClose: 1000,
      });
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Registration error: " + error.data.message);
      } else if (error instanceof Error) {
        toast.error("Registration error: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthLayout>
      <AddClient onSubmit={handleRegistration} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
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

export default ClientRegistrationPage;
