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

const EditInspectionPage: React.FC = () => {
  const { inspectionId } = useParams<{ inspectionId: string }>();
  const {
    data: inspection,
    isLoading,
    error,
  } = useGetInspectionByIdQuery(inspectionId || "");
  const [updateInspection] = useUpdateInspectionMutation();
  const navigate = useNavigate();

  // State management for modals and their data
  const [scores, setScores] = useState<Scores[]>([]);
  const [checklistItemIds, setChecklistItemIds] = useState<string[]>([]);
  const [route, setRoute] = useState<
    Array<{ latitude: number; longitude: number }>
  >([]);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);

  useEffect(() => {
    if (inspection) {
      setScores(inspection.scores || []);
      setChecklistItemIds(
        inspection.checklists.flatMap((cl) => cl.checklistItemIds || [])
      );
      setRoute(inspection.route || []);
    }
  }, [inspection]);

  const handleScoreModalSave = (newScores: Scores) => {
    setScores([newScores]);
  };

  const handleSubmit = async (data: Inspection) => {
    try {
      await updateInspection({
        ...data,
        id: inspectionId,
        scores,
        checklists: [
          {
            name: inspection?.checklists[0]?.name || "Checklist",
            overallScore: inspection?.checklists[0]?.overallScore || "A",
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
      toast.error("Error updating inspection.");
      console.error("Error updating inspection:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading inspection details.</div>;

  const initialData: Inspection = {
    ...inspection!,
    clientId: inspection?.clientId ?? null,
  };

  return (
    <ClientLayout breadcrumb="Edit Inspection">
      {inspection && (
        <div>
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
              onClick={() => setIsRouteModalOpen(true)}
            >
              Route
            </button>
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
            onSave={setChecklistItemIds}
            initialChecklistItemIds={checklistItemIds}
          />
          <RouteModal
            isOpen={isRouteModalOpen}
            onClose={() => setIsRouteModalOpen(false)}
            onSave={setRoute}
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
