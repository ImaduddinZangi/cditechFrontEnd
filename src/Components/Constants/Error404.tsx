import React from "react";
import { useNavigate } from "react-router-dom";
import PurpleButton from "../Tags/PurpleButton";

const Error404: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/client-dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">
        Oops! Page not found
      </h2>
      <p className="text-lg mt-2 text-gray-600">
        The page you are looking for doesn't exist.
      </p>
      <PurpleButton text="Go Back to dashboard" className="mt-[2vw]" onClick={handleGoBack} />
    </div>
  );
};

export default Error404;
