import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import AddPump from "../../Components/Pump/AddPump";
import { useCreatePumpMutation } from "../../redux/api/pumpApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddPumpPage: React.FC = () => {
  const [createPump] = useCreatePumpMutation();
  const navigate = useNavigate();

  const handleAddPump = async (
    assetId: string,
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
        hp,
        serial,
        installedDate,
        avgAmps,
        maxAmps,
        warranty
      }).unwrap();
      
      toast.success("Pump added successfully!", {
        onClose: () => navigate("/client-dashboard"),
        autoClose: 1000,
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

  return (
    <ClientLayout breadcrumb="Add Pump">
      <AddPump onSubmit={handleAddPump} />
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
    </ClientLayout>
  );
};

export default AddPumpPage;
