import React, { useState } from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import AddService from "../../Components/Services/AddService";
import { useCreateServiceMutation } from "../../redux/api/serviceApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { CreateService } from "../../redux/features/serviceSlice";
import Loader from "../../Components/Constants/Loader";

const AddServicePage: React.FC = () => {
  const [createService] = useCreateServiceMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleAddService = async (serviceData: CreateService) => {
    try {
      setLoading(true);
      const result = await createService(serviceData).unwrap();
      toast.success("Service added successfully!", {
        onClose: () => navigate("/manage-services"),
        autoClose: 1000,
      });
      console.log("Service created successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Service: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Adding Service: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Adding Service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout breadcrumb="Add Service">
      {loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        <AddService onSubmit={handleAddService} />
      )}
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

export default AddServicePage;
