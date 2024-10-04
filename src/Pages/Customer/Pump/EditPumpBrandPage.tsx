import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddPumpBrand from "../../../Components/Customer/Pump/AddPumpBrand";
import {
  useGetPumpBrandByIdQuery,
  useUpdatePumpBrandMutation,
} from "../../../redux/api/pumpBrandApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { PumpBrand } from "../../../redux/features/pumpBrandSlice";

const EditPumpBrandPage: React.FC = () => {
  const { pumpId } = useParams<{ pumpId: string }>();
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
      const result = await updatePumpBrand(pumpBrandData).unwrap();
      toast.success("Pump Brand updated successfully!", {
        onClose: () => navigate("/pump-brands-table"),
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
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ClientLayout breadcrumb="Edit Pump Brand">
      <AddPumpBrand onSubmit={handleUpdatePumpBrand} initialData={pumpBrand} />
    </ClientLayout>
  );
};

export default EditPumpBrandPage;
