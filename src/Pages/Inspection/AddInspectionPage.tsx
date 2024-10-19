import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import InspectionForm from "../../Components/Inspection/AddInspection";
import { useNavigate } from "react-router-dom";
import { useCreateInspectionMutation } from "../../redux/api/inspectionApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddInspectionPage: React.FC = () => {
  const [createInspection] = useCreateInspectionMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      await createInspection(formData).unwrap();
      toast.success("Inspection added successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/manage-inspections");
      }, 1000);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Inspection: " + error.data.message, {
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Adding Inspection: " + error.message, {
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          autoClose: 1000,
        });
      }
      console.error("Error Adding Inspection:", error);
    }
  };

  return (
    <ClientLayout breadcrumb="Add New Inspection">
      <InspectionForm onSubmit={handleSubmit} />
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

export default AddInspectionPage;
