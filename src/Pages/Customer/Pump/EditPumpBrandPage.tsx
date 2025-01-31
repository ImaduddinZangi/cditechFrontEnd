import React, { useState } from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddPumpBrand from "../../../Components/Customer/Pump/AddPumpBrand";
import {
  useGetPumpBrandByIdQuery,
  useUpdatePumpBrandMutation,
} from "../../../redux/api/pumpBrandApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { PumpBrand } from "../../../redux/features/pumpBrandSlice";
import Loader from "../../../Components/Constants/Loader";

const EditPumpBrandPage: React.FC = () => {
  const { pumpId } = useParams<{ pumpId: string }>();
  const [loading, setLoading] = useState(false);
  const { data: pumpBrand, isLoading } = useGetPumpBrandByIdQuery(pumpId!);
  const [updatePumpBrand] = useUpdatePumpBrandMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleUpdatePumpBrand = async (pumpBrandData: PumpBrand) => {
    try {
      setLoading(true);
      const result = await updatePumpBrand(pumpBrandData).unwrap();
      toast.success("Pump Brand updated successfully!", {
        onClose: () => navigate("/manage-pump-brands"),
        autoClose: 1000,
      });
      console.log("Pump brand updated successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Updating Pump Brand: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Updating Pump Brand: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Updating Pump Brand:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <ClientLayout breadcrumb="Edit Pump Brand">
      {loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        <AddPumpBrand
          onSubmit={handleUpdatePumpBrand}
          initialData={pumpBrand}
        />
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

export default EditPumpBrandPage;
