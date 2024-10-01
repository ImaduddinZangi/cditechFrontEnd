import React from "react";
import ForgotPassword from "../../Components/Auth/ForgotPassword";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "../../Layouts/AuthLayout";

const ForgotPasswordPage: React.FC = () => {
  const handleForgotPassword = (email: string) => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@example.com") {
          resolve("Password reset link sent successfully.");
        } else {
          reject(new Error("Email not found."));
        }
      }, 1500);
    })
      .then((message) => {
        toast.success(message);
      })
      .catch((error: Error) => {
        toast.error(error.message);
      });
  };

  return (
    <AuthLayout>
      <ForgotPassword onSubmit={handleForgotPassword} />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
