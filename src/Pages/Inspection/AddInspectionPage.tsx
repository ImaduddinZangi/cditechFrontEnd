import React, { useState } from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import InspectionForm from "../../Components/Inspection/AddInspection";
import { useNavigate } from "react-router-dom";
import ScoreModal from "../../Components/Inspection/ScoreModal";
import ChecklistModal from "../../Components/Inspection/ChecklistModal";
import AddCheckListItem from "../../Components/Inspection/AddCheckListItem";
import RouteModal from "../../Components/Inspection/RouteModal";
import { useCreateChecklistItemMutation } from "../../redux/api/checkListItemApi";
import { useCreateInspectionMutation } from "../../redux/api/inspectionApi";
import { Scores, Checklist, RoutePoint } from "../../redux/features/inspectionSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface InspectionData {
  name: string;
  customerId: string;
  assetId: string;
  scheduledDate: string;
  comments: string;
  status: string;
  serviceFee: number;
  recording: string;
  clientId: string;
  assignedTo: string;
  completedDate: string | null;
  checklists: Checklist[];
  route: RoutePoint[];
  scores: Scores[];
}

const AddInspectionPage: React.FC = () => {
  const [createChecklistItem] = useCreateChecklistItemMutation();
  const [createInspection] = useCreateInspectionMutation();
  const [scores, setScores] = useState<Scores[]>([]);
  const [checklistItemIds, setChecklistItemIds] = useState<string[]>([]);
  const [route, setRoute] = useState<RoutePoint[]>([]);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isChecklistItemModalOpen, setIsChecklistItemModalOpen] = useState(false);
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
        onClose: () => navigate("/client-dashboard"),
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

  const handleFormSubmit = (
    name?: string,
    customerId?: string,
    assetId?: string,
    scheduledDate?: string,
    comments?: string,
    status?: string,
    serviceFee?: number,
    recording?: string,
    clientId?: string,
    assignedTo?: string,
    completedDate?: string | null,
  ) => {
    if (!name || !customerId || !assetId || !scheduledDate || !status || serviceFee === undefined || !recording || !clientId || !assignedTo) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (scores.length === 0) {
      toast.error("The inspection score data is not added.");
      return;
    }

    if (checklistItemIds.length === 0) {
      toast.error("The checklist data is not added.");
      return;
    }

    if (route.length !== 2) {
      toast.error("The route data is not added.");
      return;
    }

    const inspectionData: InspectionData = {
      name,
      customerId,
      assetId,
      scheduledDate,
      comments: comments || "",
      status,
      serviceFee,
      recording,
      clientId,
      assignedTo,
      completedDate: completedDate || null,
      checklists: [
        {
          name: "A Good Name",
          overallScore: "A",
          checklistItemIds: checklistItemIds,
        },
      ],
      route,
      scores,
    };

    handleAddInspection(inspectionData);
  };

  const handleScoreModalSave = (savedScores: Scores) => {
    setScores([savedScores]);
  };

  const handleChecklistModalSave = (selectedChecklistItemIds: string[]) => {
    setChecklistItemIds(selectedChecklistItemIds);
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
        toast.error("Error adding Check List Item: " + error.data.message);
      } else if (error instanceof Error) {
        toast.error("Error adding Check List Item: " + error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
      console.error("Error adding Check List Item:", error);
    }
  };

  return (
    <ClientLayout breadcrumb="Add New Inspection">
      <div className="space-x-[1vw] m-[2vw]">
        <button
          type="button"
          className="px-[1vw] py-[0.5vw] bg-purple-0 text-white rounded-[0.4vw] text-[1vw] font-inter font-medium"
          onClick={() => setIsChecklistModalOpen(true)}
        >
          Checklist
        </button>
        <button
          type="button"
          className="px-[1vw] py-[0.5vw] bg-purple-0 text-white rounded-[0.4vw] text-[1vw] font-inter font-medium"
          onClick={() => setIsScoreModalOpen(true)}
        >
          Inspection Score
        </button>
        <button
          type="button"
          className="px-[1vw] py-[0.5vw] bg-purple-0 text-white rounded-[0.4vw] text-[1vw] font-inter font-medium"
          onClick={() => setIsChecklistItemModalOpen(true)}
        >
          Check List Items
        </button>
        <button
          type="button"
          className="px-[1vw] py-[0.5vw] bg-purple-0 text-white rounded-[0.4vw] text-[1vw] font-inter font-medium"
          onClick={() => setIsRouteModalOpen(true)}
        >
          Route
        </button>
      </div>
      <InspectionForm onSubmit={handleFormSubmit} />
      <ScoreModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        onSave={handleScoreModalSave}
      />
      <ChecklistModal
        isOpen={isChecklistModalOpen}
        onClose={() => setIsChecklistModalOpen(false)}
        onSave={handleChecklistModalSave}
      />
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

export default AddInspectionPage;
