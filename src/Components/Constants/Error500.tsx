import React from "react";
import { useNavigate } from "react-router-dom";
import PurpleButton from "../Tags/PurpleButton";

const Error500: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/client-dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">500</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">
        Server Error
      </h2>
      <p className="text-lg mt-2 text-gray-600">
        Something went wrong on our side. Please try again later.
      </p>
      <PurpleButton text="Go Back to dashboard" className="mt-[2vw]" onClick={handleGoBack} />
    </div>
  );
};

export default Error500;
