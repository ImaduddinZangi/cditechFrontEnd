import React, { useState } from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddPumpBrand from "../../../Components/Customer/Pump/AddPumpBrand";
import { useCreatePumpBrandMutation } from "../../../redux/api/pumpBrandApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { PumpBrand } from "../../../redux/features/pumpBrandSlice";
import Loader from "../../../Components/Constants/Loader";

const AddPumpBrandPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const result = await createPumpBrand(pumpBrandData).unwrap();
      toast.success("Pump Brand added successfully!", {
        onClose: () => navigate("/manage-pump-brands"),
        autoClose: 1000,
      });
      console.log("Pump created successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Pump Brand: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Adding Pump Brand: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Adding Pump Brand:", error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout breadcrumb="Add Pump Brand">
      {loading ? (
       <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
      <AddPumpBrand onSubmit={handleAddPumpBrand} />
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
    </ClientLayout>
  );
};

export default AddPumpBrandPage;
