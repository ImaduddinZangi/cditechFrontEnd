import React, { useState } from "react";
import Pumps from "../../../Components/Customer/Pump/Pumps";
import { useCreatePumpMutation } from "../../../redux/api/pumpApi";
import { useNavigate } from "react-router-dom";
import AddPump from "../../../Components/Customer/Pump/AddPump";
import { ToastContainer, toast } from "react-toastify";
import { Pump } from "../../../redux/features/pumpSlice";

const AssetPumps: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createPump] = useCreatePumpMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleAddPump = async (pumpData: Pump) => {
    try {
      const result = await createPump(pumpData).unwrap();
      toast.success("Pump added successfully!", {
        onClose: () => navigate("/manage-customer"),
        autoClose: 500,
      });
      console.log("Pump created successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Creating Pump: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else if (error instanceof Error) {
        toast.error("Error Creating Pump: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      }
      console.error("Error Creating Pump:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Pumps onClick={handleModalOpen} />
      <AddPump
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleAddPump}
      />
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
    </>
  );
};

export default AssetPumps;
