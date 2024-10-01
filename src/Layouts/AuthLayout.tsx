import React, { ReactNode } from "react";
import Image from "/assets/Content.png";
import AuthFooter from "../Components/Constants/AuthFooter";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full flex flex-row items-center h-16 px-4">
        <img
          src={Image}
          alt="logo"
          className="w-16 h-16 md:w-8 md:h-8 object-contain"
        />
        <p className="text-2xl md:text-xl font-medium text-dark-0 ml-4">
          Inspection Manager Pro
        </p>
      </div>
      <div className="flex-grow flex justify-center items-center overflow-auto">
        {children}
      </div>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
