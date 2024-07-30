// File path: src/pages/ManagementSignInPage.tsx

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
      if (error instanceof Error) {
        toast.error("Login error: " + error.message);
        console.error("Login error:", error);
      } else {
        toast.error("An unknown error occurred.");
        console.error("An unknown error occurred:", error);
      }
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
