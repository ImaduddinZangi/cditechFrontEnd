import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetInspectionByIdQuery,
  useUpdateInspectionMutation,
} from "../../redux/api/inspectionApi";
import ClientLayout from "../../Layouts/ClientLayout";
import {
  EditInspection,
  Inspection,
} from "../../redux/features/inspectionSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Constants/Loader";
import UpdateInspection from "../../Components/Inspection/UpdateInspection";

const EditInspectionPage: React.FC = () => {
  const { inspectionId } = useParams<{ inspectionId: string }>();
  const [loading, setLoading] = useState(false);
  const {
    data: inspection,
    isLoading,
    error,
  } = useGetInspectionByIdQuery(inspectionId || "");
  const [updateInspection] = useUpdateInspectionMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleSubmit = async (inspectionData: EditInspection) => {
    try {
      setLoading(true);
      await updateInspection(inspectionData).unwrap();
      toast.success("Inspection updated successfully!", {
        onClose: () => navigate("/manage-inspections"),
        autoClose: 1000,
      });
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Updating Inspection: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Updating Inspection: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Updating Inspection:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error loading inspection details.</div>;

  const initialData: Inspection = {
    ...inspection!,
    clientId: inspection?.client?.id ?? null,
  };

  return (
    <ClientLayout breadcrumb="Edit Inspection">
      {loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        inspection &&
        <UpdateInspection
          onSubmit={handleSubmit}
          initialData={initialData}
        />
      )
      }
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

export default EditInspectionPage;
