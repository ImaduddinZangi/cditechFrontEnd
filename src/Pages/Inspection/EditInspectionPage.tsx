import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetInspectionByIdQuery,
  useUpdateInspectionMutation,
} from "../../redux/api/inspectionApi";
import InspectionForm from "../../Components/Inspection/AddInspection";
import ClientLayout from "../../Layouts/ClientLayout";
import ScoreModal from "../../Components/Inspection/ScoreModal";
import ChecklistModal from "../../Components/Inspection/ChecklistModal";
import RouteModal from "../../Components/Inspection/RouteModal";
import { Scores, Inspection } from "../../redux/features/inspectionSlice";
import { toast, ToastContainer } from "react-toastify";
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
  const [scores, setScores] = useState<Scores[]>([]);
  const [checklistName, setChecklistName] = useState<string>("");
  const [checklistItemIds, setChecklistItemIds] = useState<string[]>([]);
  const [route, setRoute] = useState<
    Array<{ latitude: number; longitude: number }>
  >([]);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
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

  useEffect(() => {
    if (inspection) {
      setScores(inspection.scores || []);
      setChecklistName(inspection.checklists[0]?.name || "");

      // Extract checklist item IDs from the nested structure
      const extractedItemIds = inspection.checklists.flatMap(
        (checklist) => checklist.items?.map((item) => item.id) || []
      );
      setChecklistItemIds(extractedItemIds);

      setRoute(inspection.route || []);
    }
  }, [inspection]);

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

  const handleSubmit = async (data: Inspection) => {
    const overallScore = calculateOverallScore(scores[0]);

    try {
      await updateInspection({
        ...data,
        id: inspectionId,
        scores,
        checklists: [
          {
            name:
              checklistName || inspection?.checklists[0]?.name || "Checklist",
            overallScore,
            checklistItemIds,
          },
        ],
        route,
      }).unwrap();
      toast.success("Inspection updated successfully!", {
        onClose: () => navigate("/inspection-table"),
        autoClose: 500,
      });
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Updating Inspection: " + error.data.message);
      } else if (error instanceof Error) {
        toast.error("Error Updating Inspection: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.error("Error Updating Inspection:", error);
    }
  };

  // Save scores from ScoreModal
  const handleScoreModalSave = (newScores: Scores) => {
    setScores([newScores]);
  };

  // Save checklist name and item IDs from ChecklistModal
  const handleChecklistModalSave = (
    name: string,
    selectedChecklistItemIds: string[]
  ) => {
    setChecklistName(name);
    setChecklistItemIds(selectedChecklistItemIds);
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
          <InspectionForm onSubmit={handleSubmit} initialData={initialData} />
          <ScoreModal
            isOpen={isScoreModalOpen}
            onClose={() => setIsScoreModalOpen(false)}
            onSave={handleScoreModalSave}
            initialScores={scores[0]}
          />
          <ChecklistModal
            isOpen={isChecklistModalOpen}
            onClose={() => setIsChecklistModalOpen(false)}
            onSave={handleChecklistModalSave}
            initialChecklistName={checklistName}
            initialChecklistItemIds={checklistItemIds}
          />
          <RouteModal
            isOpen={isRouteModalOpen}
            onClose={() => setIsRouteModalOpen(false)}
            onSave={handleRouteModalSave}
            initialRoute={route}
          />
        </div>
      )}
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

export default EditInspectionPage;
