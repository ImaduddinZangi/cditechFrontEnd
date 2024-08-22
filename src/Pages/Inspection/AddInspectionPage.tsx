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
import { Inspection, Scores } from "../../redux/features/inspectionSlice";
import { toast } from "react-toastify";

const AddInspectionPage: React.FC = () => {
  const [createChecklistItem] = useCreateChecklistItemMutation();
  const [createInspection] = useCreateInspectionMutation();
  const [scores, setScores] = useState<Scores[]>([]);
  const [checklistItemIds, setChecklistItemIds] = useState<string[]>([]);
  const [route, setRoute] = useState<Array<{ latitude: number; longitude: number }>>([]);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isChecklistItemModalOpen, setIsChecklistItemModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (formValues: Partial<Inspection>) => {
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

    const inspectionData: Partial<Inspection> = {
      ...formValues,
      clientId: formValues.clientId || undefined,
      scores: scores, // Pass the array of scores here
      checklists: [
        {
          name: "A Good Name",
          overallScore: "A",
          checklistItemIds: checklistItemIds,
        },
      ],
      route: route,
    };

    try {
      const result = await createInspection(inspectionData).unwrap();
      toast.success("Inspection created successfully!", {
        onClose: () => navigate("/client-dashboard"),
        autoClose: 500,
      });
      console.log("Inspection created successfully", result);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error creating Inspection: " + error.message);
        console.error("Error creating Inspection:", error);
      } else {
        toast.error("An unknown error occurred.");
        console.error("An unknown error occurred:", error);
      }
    }
  };

  const handleScoreModalSave = (scores: Scores) => {
    setScores([scores]);
  };

  const handleChecklistModalSave = (selectedChecklistItemIds: string[]) => {
    setChecklistItemIds(selectedChecklistItemIds);
  };

  const handleRouteModalSave = (selectedRoute: Array<{ latitude: number; longitude: number }>) => {
    setRoute(selectedRoute);
  };

  const handleAddCheckListItemSubmit = async (data: {
    name: string;
    description: string;
    is_completed: boolean;
  }) => {
    const { name, description, is_completed } = data;

    const checkListItemData = {
      name,
      description,
      is_completed,
    };

    try {
      await createChecklistItem(checkListItemData).unwrap();
      toast.success("Check List Item added successfully!", {
        onClose: () => navigate("/add-inspection"),
        autoClose: 500,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error adding Check List Item: " + error.message);
        console.error("Error adding Check List Item:", error);
      } else {
        toast.error("An unknown error occurred.");
        console.error("An unknown error occurred:", error);
      }
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
    </ClientLayout>
  );
};

export default AddInspectionPage;
