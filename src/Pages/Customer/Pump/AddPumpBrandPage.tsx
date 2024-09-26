import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddPumpBrand from "../../../Components/Customer/Pump/AddPumpBrand";
import { useCreatePumpBrandMutation } from "../../../redux/api/pumpBrandApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { PumpBrand } from "../../../redux/features/pumpBrandSlice";

const AddPumpBrandPage: React.FC = () => {
  const [createPumpBrand] = useCreatePumpBrandMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleAddPumpBrand = async (pumpBrandData: PumpBrand) => {
    try {
      const result = await createPumpBrand(pumpBrandData).unwrap();
      toast.success("Pump Brand added successfully!", {
        onClose: () => navigate("/add-pump"),
        autoClose: 500,
      });
      console.log("Pump created successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Pump Brand: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else if (error instanceof Error) {
        toast.error("Error Adding Pump Brand: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      }
      console.error("Error Adding Pump Brand:", error);
    }
  };

  return (
    <ClientLayout breadcrumb="Add Pump Brand">
      <AddPumpBrand onSubmit={handleAddPumpBrand} />
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

export default AddPumpBrandPage;
