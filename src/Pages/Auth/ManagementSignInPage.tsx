import React from "react";
import ManagementSignIn from "../../Components/Auth/ManagementSignIn";
import { useLoginUserMutation } from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layouts/AuthLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagementSignInPage: React.FC = () => {
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
      if (result.user) {
        dispatch(setUser(result.user));
      }
      toast.success("Login successful!", {
        onClose: () => navigate("/dashboard"),
        autoClose: 500,
      });
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
      <ManagementSignIn onSubmit={handleLogin} />
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

export default ManagementSignInPage;
