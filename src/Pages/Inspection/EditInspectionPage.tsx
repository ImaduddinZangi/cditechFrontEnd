import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetInspectionByIdQuery,
  useUpdateInspectionMutation,
} from "../../redux/api/inspectionApi";
import ClientLayout from "../../Layouts/ClientLayout";
import RouteModal from "../../Components/Inspection/RouteModal";
import {
  EditInspection,
  Inspection,
} from "../../redux/features/inspectionSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Constants/Loader";
import PurpleButton from "../../Components/Tags/PurpleButton";
import UpdateInspection from "../../Components/Inspection/UpdateInspection";

const EditInspectionPage: React.FC = () => {
  const { inspectionId } = useParams<{ inspectionId: string }>();
  const {
    data: inspection,
    isLoading,
    error,
  } = useGetInspectionByIdQuery(inspectionId || "");
  const [updateInspection] = useUpdateInspectionMutation();
  const [route, setRoute] = useState<
    Array<{ latitude: number; longitude: number }>
  >([]);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
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
    }
  };

  const handleRouteModalSave = (
    selectedRoute: Array<{ latitude: number; longitude: number }>
  ) => {
    setRoute(selectedRoute);
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
      {inspection && (
        <div>
          <div className="space-x-[1vw] m-[2vw]">
            <PurpleButton
              text="Route"
              type="button"
              onClick={() => setIsRouteModalOpen(true)}
            />
          </div>
          <UpdateInspection onSubmit={handleSubmit} initialData={initialData} />
          <RouteModal
            isOpen={isRouteModalOpen}
            onClose={() => setIsRouteModalOpen(false)}
            onSave={handleRouteModalSave}
            initialRoute={route}
          />
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
        </div>
      )}
    </ClientLayout>
  );
};

export default EditInspectionPage;
