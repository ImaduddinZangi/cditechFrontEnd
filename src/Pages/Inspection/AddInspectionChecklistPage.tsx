import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import AddInspectionChecklist from "../../Components/Inspection/AddInspectionChecklist";
import { useCreateInspectionChecklistMutation } from "../../redux/api/inspectionChecklistApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ChecklistData } from "../../redux/features/inspectionChecklistSlice";

const AddInspectionChecklistPage: React.FC = () => {
  const [createInspectionChecklist] = useCreateInspectionChecklistMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleAddInspectionChecklist = async (checklistData: ChecklistData) => {
    try {
      const result = await createInspectionChecklist(checklistData).unwrap();
      toast.success("Inspection Checklist added successfully!", {
        onClose: () => navigate("/add-inspection"),
        autoClose: 1000,
      });
      console.log("Inspection Checklist created successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error(
          "Error Adding Inspection Checklist: " + error.data.message,
          {
            onClose: () => navigate("/error/500"),
            autoClose: 1000,
          }
        );
      } else if (error instanceof Error) {
        toast.error("Error Adding Inspection Checklist: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Adding Inspection Checklist:", error);
    }
  };

  return (
    <ClientLayout breadcrumb="Add Inspection Checklist">
      <AddInspectionChecklist onSave={handleAddInspectionChecklist} />
    </ClientLayout>
  );
};

export default AddInspectionChecklistPage;
