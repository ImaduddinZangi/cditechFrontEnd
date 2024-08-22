import React, { useState } from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import Pumps from "../../../Components/Customer/Pump/Pumps";
import { useCreatePumpMutation } from "../../../redux/api/pumpApi";
import { useNavigate } from "react-router-dom";
import AddPump from "../../../Components/Customer/Pump/AddPump";
import { ToastContainer, toast } from "react-toastify";

const AssetPumps: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createPump] = useCreatePumpMutation();
  const navigate = useNavigate();

  const handleAddPump = async (
    assetId: string,
    name: string,
    brandId: string,
    serial: string,
    warranty: string,
    installedDate: string,
    avgAmps: number,
    maxAmps: number,
    hp: number
  ) => {
    try {
      const result = await createPump({
        assetId,
        brandId,
        name,
        hp,
        serial,
        installedDate,
        avgAmps,
        maxAmps,
        warranty,
      }).unwrap();

      toast.success("Pump added successfully!", {
        onClose: () => navigate("/asset-pumps"),
        autoClose: 500,
      });
      console.log("Pump created successfully", result);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error adding Pump: " + error.message);
        console.error("Error adding Pump:", error);
      } else {
        toast.error("An unknown error occurred.");
        console.error("An unknown error occurred:", error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <ClientLayout breadcrumb="Asset Pumps">
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
    </ClientLayout>
  );
};

export default AssetPumps;
