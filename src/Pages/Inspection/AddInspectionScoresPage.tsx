import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import AddInspectionScores from "../../Components/Inspection/AddInspectionScores";
import { useCreateInspectionScoreMutation } from "../../redux/api/inspectionScoresApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Scores } from "../../redux/features/inspectionScoresSlice";

const AddInspectionScoresPage: React.FC = () => {
  const [createInspectionScore] = useCreateInspectionScoreMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleAddInspectionScore = async (inspectionScoreData: Scores) => {
    try {
      const result = await createInspectionScore(inspectionScoreData).unwrap();
      toast.success("Inspection Score added successfully!", {
        onClose: () => navigate("/add-inspection"),
        autoClose: 500,
      });
      console.log("Inspection Score created successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Inspection Score: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else if (error instanceof Error) {
        toast.error("Error Adding Inspection Score: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      }
      console.error("Error Adding Inspection Score:", error);
    }
  };

  return (
    <ClientLayout breadcrumb="Add Inspection Score">
      <AddInspectionScores onSubmit={handleAddInspectionScore} />
    </ClientLayout>
  );
};

export default AddInspectionScoresPage;
