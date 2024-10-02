import React, { useState } from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import InspectionForm from "../../Components/Inspection/AddInspection";
import { useNavigate } from "react-router-dom";
import AddCheckListItem from "../../Components/Inspection/AddCheckListItem";
import RouteModal from "../../Components/Inspection/RouteModal";
import { useCreateChecklistItemMutation } from "../../redux/api/checkListItemApi";
import { useCreateInspectionMutation } from "../../redux/api/inspectionApi";
import { RoutePoint, Inspection } from "../../redux/features/inspectionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PurpleButton from "../../Components/Tags/PurpleButton";

interface InspectionData {
  name: string;
  customerId?: string;
  assetId?: string;
  scheduledDate: string;
  comments: string;
  serviceFee: number;
  recording?: string;
  clientId?: string | null;
  assignedTo?: string;
  completedDate: string | null;
  route: RoutePoint[];
}

const AddInspectionPage: React.FC = () => {
  const [createChecklistItem] = useCreateChecklistItemMutation();
  const [createInspection] = useCreateInspectionMutation();
  const [route, setRoute] = useState<RoutePoint[]>([]);
  const [isChecklistItemModalOpen, setIsChecklistItemModalOpen] =
    useState(false);
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

  const handleAddInspection = async (inspectionData: InspectionData) => {
    try {
      const result = await createInspection(inspectionData).unwrap();
      toast.success("Inspection created successfully!", {
        onClose: () => navigate("/inspection-table"),
        autoClose: 500,
      });
      console.log("Inspection created successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Inspection: " + error.data.message);
      } else if (error instanceof Error) {
        toast.error("Error Adding Inspection: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.error("Error Adding Inspection:", error);
    }
  };

  const handleFormSubmit = (inspectionData: Inspection) => {
    const {
      name,
      customerId,
      assetId,
      assignedTo,
      scheduledDate,
      serviceFee,
      recording,
      clientId,
    } = inspectionData;

    if (
      !name ||
      !customerId ||
      !assetId ||
      !scheduledDate ||
      serviceFee === undefined ||
      !recording ||
      !clientId ||
      !assignedTo
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (route.length !== 2) {
      toast.error("The route data is not added.");
      return;
    }

    const newInspectionData: InspectionData = {
      ...inspectionData,
      route,
    };

    handleAddInspection(newInspectionData);
  };

  const handleRouteModalSave = (selectedRoute: RoutePoint[]) => {
    setRoute(selectedRoute);
  };

  const handleAddCheckListItemSubmit = async (data: {
    name: string;
    description: string;
    is_completed: boolean;
  }) => {
    const { name, description, is_completed } = data;

    try {
      await createChecklistItem({ name, description, is_completed }).unwrap();
      toast.success("Check List Item added successfully!", {
        onClose: () => navigate("/add-inspection"),
        autoClose: 500,
      });
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error adding Check List Item: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else if (error instanceof Error) {
        toast.error("Error adding Check List Item: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else {
        toast.error("An unknown error occurred.", {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      }
      console.error("Error adding Check List Item:", error);
    }
  };

  return (
    <ClientLayout breadcrumb="Add New Inspection">
      <div className="space-x-[1vw] m-[2vw]">
        <PurpleButton
          text="Check List Items"
          type="button"
          onClick={() => setIsChecklistItemModalOpen(true)}
        />
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
      <InspectionForm onSubmit={handleFormSubmit} />
      <AddCheckListItem
        isOpen={isChecklistItemModalOpen}
        onClose={() => setIsChecklistItemModalOpen(false)}
        onSubmit={handleAddCheckListItemSubmit}
      />
      <RouteModal
        isOpen={isRouteModalOpen}
        onClose={() => setIsRouteModalOpen(false)}
        onSave={handleRouteModalSave}
      />
    </ClientLayout>
  );
};

export default AddInspectionPage;
