import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetInspectionByIdQuery,
  useUpdateInspectionMutation,
} from "../../redux/api/inspectionApi";
import InspectionForm from "../../Components/Inspection/AddInspection";
import ClientLayout from "../../Layouts/ClientLayout";
import RouteModal from "../../Components/Inspection/RouteModal";
import { Inspection, GetInspection } from "../../redux/features/inspectionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Constants/Loader";
import PurpleButton from "../../Components/Tags/PurpleButton";

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

  const handleSubmit = async (data: Inspection) => {

    try {
      await updateInspection({
        ...data,
        id: inspectionId,
        route,
      }).unwrap();
      toast.success("Inspection updated successfully!", {
        onClose: () => navigate("/inspection-table"),
        autoClose: 500,
      });
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Updating Inspection: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else if (error instanceof Error) {
        toast.error("Error Updating Inspection: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
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

  const initialData: GetInspection = {
    ...inspection!,
    clientId: inspection?.client?.id ?? null,
  };

  return (
    <ClientLayout breadcrumb="Edit Inspection">
      {inspection && (
        <div>
          <div className="space-x-[1vw] m-[2vw]">
            <PurpleButton
              text="CheckList"
              type="button"
              onClick={() => navigate("/add-inspection/checklist")}
            />
            <PurpleButton
              text="Inspection Score"
              type="button"
              onClick={() => navigate("/add-inspection/scores")}
            />
            <PurpleButton
              text="Route"
              type="button"
              onClick={() => setIsRouteModalOpen(true)}
            />
          </div>
          <InspectionForm onSubmit={handleSubmit} initialData={initialData} />
          <RouteModal
            isOpen={isRouteModalOpen}
            onClose={() => setIsRouteModalOpen(false)}
            onSave={handleRouteModalSave}
            initialRoute={route}
          />
        </div>
      )}
    </ClientLayout>
  );
};

export default EditInspectionPage;
