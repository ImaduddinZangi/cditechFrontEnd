import React, { useState } from "react";
import ClientSignIn from "../../Components/Auth/ClientSignIn";
import { useLoginClientMutation } from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setToken, setClient } from "../../redux/features/clientSlice";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layouts/AuthLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = "your-site-key-here";

const ClientSignInPage: React.FC = () => {
  const [loginClient] = useLoginClientMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const resetFailedAttempts = () => setFailedAttempts(0);

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const loginData: any = { email, password };
      if (failedAttempts >= 3 && recaptchaToken) {
        loginData.recaptchaToken = recaptchaToken;
      }

      const result = await loginClient(loginData).unwrap();
      dispatch(setToken(result.access_token));
      resetFailedAttempts();
      if (result.refresh_token) {
        localStorage.setItem("refresh_token", result.refresh_token);
      }
      if (result.client) {
        dispatch(setClient(result.client));
        if (result.client.user.two_factor_enabled) {
          toast.success("Login successful!", {
            onClose: () => navigate("/client-dashboard"),
            autoClose: 1000,
          });
        } else {
          toast.success("Two-factor authentication required!", {
            onClose: () => navigate("/2fa"),
            autoClose: 1000,
          });
        }
      }
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Login error: " + error.data.message);
        setFailedAttempts((prev) => prev + 1);
      } else if (error instanceof Error) {
        toast.error("Login error: " + error.message);
        setFailedAttempts((prev) => prev + 1);
      } else {
        toast.error("An unknown error occurred");
        setFailedAttempts((prev) => prev + 1);
      }
      console.error("Login error:", error);
    }
  };

  return (
    <AuthLayout>
      <ClientSignIn onSubmit={handleLogin} />

      {failedAttempts >= 3 && (
        <div className="mt-[1vw]">
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
          />
        </div>
      )}

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

export default ClientSignInPage;
