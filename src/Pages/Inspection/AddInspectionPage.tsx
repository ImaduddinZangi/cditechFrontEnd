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
import {
  Scores,
  Checklist,
  RoutePoint,
  Inspection,
} from "../../redux/features/inspectionSlice";
import { toast, ToastContainer } from "react-toastify";
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
  checklists: Checklist[];
  route: RoutePoint[];
  scores: Scores[];
}

const AddInspectionPage: React.FC = () => {
  const [createChecklistItem] = useCreateChecklistItemMutation();
  const [createInspection] = useCreateInspectionMutation();
  const [scores, setScores] = useState<Scores[]>([]);
  const [checklistItemIds, setChecklistItemIds] = useState<string[]>([]);
  const [checklistName, setChecklistName] = useState<string>("");
  const [route, setRoute] = useState<RoutePoint[]>([]);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
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

    const calculateOverallScore = (scores: Scores): string => {
      const scoreValues = Object.values(scores).filter(
        (value) => typeof value === "string"
      ) as string[];
      const gradeValues = scoreValues.map((score) => {
        switch (score) {
          case "A":
            return 4;
          case "B":
            return 3;
          case "C":
            return 2;
          case "D":
            return 1;
          default:
            return 0;
        }
      });

      const average =
        gradeValues.reduce((a: number, b: number) => a + b, 0) /
        gradeValues.length;

      if (average >= 3.5) return "A";
      if (average >= 2.5) return "B";
      if (average >= 1.5) return "C";
      return "D";
    };

    const overallScore = calculateOverallScore(scores[0]);

    const newInspectionData: InspectionData = {
      ...inspectionData,
      checklists: [
        {
          name: checklistName,
          overallScore: overallScore,
          checklistItemIds: checklistItemIds,
        },
      ],
      route,
      scores,
    };

    handleAddInspection(newInspectionData);
  };

  const handleScoreModalSave = (savedScores: Scores) => {
    setScores([savedScores]);
  };

  const handleChecklistModalSave = (
    name: string,
    selectedChecklistItemIds: string[]
  ) => {
    setChecklistName(name);
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
          onClick={() => setIsChecklistModalOpen(true)}
        />
        <PurpleButton
          text="Inspection Score"
          type="button"
          onClick={() => setIsScoreModalOpen(true)}
        />
        <PurpleButton
          text="Route"
          type="button"
          onClick={() => setIsRouteModalOpen(true)}
        />
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
