import React from "react";
import NewPassword from "../../Components/Auth/NewPassword";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "../../Layouts/AuthLayout";

const NewPasswordPage: React.FC = () => {
  const handleNewPassword = (password: string, confirmPassword: string) => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (password === confirmPassword) {
          resolve("Password reset successful!");
        } else {
          reject(new Error("Passwords do not match!"));
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
      <NewPassword onSubmit={handleNewPassword} />
    </AuthLayout>
  );
};

export default NewPasswordPage;
