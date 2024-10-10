import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import EditPump from "../../../Components/Customer/Pump/EditPump";
import {
  useUpdatePumpMutation,
  useGetPumpByIdQuery,
} from "../../../redux/api/pumpApi";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/Constants/Loader";
import { toast } from "react-toastify";

const EditPumpPage: React.FC = () => {
  const { pumpId } = useParams<{ pumpId: string }>();
  const {
    data: pumpData,
    isLoading,
    isError,
  } = useGetPumpByIdQuery(pumpId || "");
  const [updatePump] = useUpdatePumpMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleEditPump = async (formData: FormData) => {
    try {
      await updatePump({ id: pumpId, formData }).unwrap();
      toast.success("pump updated successfully!", {
        onClose: () => navigate("/client-dashboard"),
        autoClose: 1000,
      });
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Updating pump: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Updating pump: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Updating pump:", error);
    }
  };

  if (isLoading)
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  if (isError) return <div>Error loading Pump details</div>;

  return (
    <ClientLayout breadcrumb="Edit Pump">
      <EditPump initialData={pumpData} onEdit={handleEditPump} />
    </ClientLayout>
  );
};

export default EditPumpPage;
