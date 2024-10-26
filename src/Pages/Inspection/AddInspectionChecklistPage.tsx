import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import AddInspectionChecklist from "../../Components/Inspection/AddInspectionChecklist";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useGetInspectionByIdQuery } from "../../redux/api/inspectionApi";
import { useUpdateChecklistMutation } from "../../redux/api/inspectionChecklistApi";
import { UpdateChecklist } from "../../redux/features/inspectionChecklistSlice";
import Loader from "../../Components/Constants/Loader";

const AddInspectionChecklistPage: React.FC = () => {
  const [updateInspection] = useUpdateChecklistMutation();
  const { inspectionId } = useParams<{ inspectionId: string }>();
  const navigate = useNavigate();
  const { data: inspection, isLoading: isInspectionLoading } =
    useGetInspectionByIdQuery(inspectionId as string);

  if (isInspectionLoading) {
    return <Loader />;
  }

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleAddInspectionChecklist = async (
    updatedInspection: UpdateChecklist
  ) => {
    try {
      await updateInspection(updatedInspection).unwrap();
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
    } finally {
    }
  };

  return (
    <ClientLayout breadcrumb="Update Inspection">
      <div className="mx-[2vw] flex flex-row items-center justify-between">
        <p className="text-[1.1vw] text-darkgray-0 font-medium font-inter">
          {inspection?.customer.name || "Customer Name"}
        </p>
        <p className="text-[1.1vw] text-darkgray-0 font-medium font-inter">
          {inspection?.asset?.assetType?.name || "Asset Type unavailable"}
        </p>
        <p className="text-[1.1vw] text-darkgray-0 font-medium font-inter">
          {inspection?.checklists?.[0]?.template?.name ||
            "No template available"}
        </p>
      </div>
      <AddInspectionChecklist
        inspection={inspection}
        onSubmit={handleAddInspectionChecklist}
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
    </ClientLayout>
  );
};

export default AddInspectionChecklistPage;
