import React, { useState } from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import InspectionForm from "../../Components/Inspection/AddInspection";
import { useNavigate } from "react-router-dom";
import RouteModal from "../../Components/Inspection/RouteModal";
import { useCreateInspectionMutation } from "../../redux/api/inspectionApi";
import { useUploadPhotoMutation } from "../../redux/api/uploadPhotosApi";
import {
  RoutePoint,
  CreateInspection,
} from "../../redux/features/inspectionSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PurpleButton from "../../Components/Tags/PurpleButton";

const AddInspectionPage: React.FC = () => {
  const [createInspection] = useCreateInspectionMutation();
  const [uploadPhoto] = useUploadPhotoMutation();
  const [route, setRoute] = useState<RoutePoint[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
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

  const handleAddInspection = async (inspectionData: CreateInspection) => {
    try {
      const result = await createInspection(inspectionData).unwrap();
      toast.success("Inspection created successfully!", {
        onClose: () => navigate("/manage-inspections"),
        autoClose: 500,
      });
      console.log("Inspection created successfully", result);
      return result;
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Inspection: " + error.data.message);
      } else if (error instanceof Error) {
        toast.error("Error Adding Inspection: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.error("Error Adding Inspection:", error);
      throw error;
    }
  };

  const handleFormSubmit = async (inspectionData: CreateInspection) => {
    if (route.length !== 2) {
      toast.error("The route data is not added.");
      return;
    }

    const newInspectionData: CreateInspection = {
      ...inspectionData,
      route,
    };

    try {
      const createdInspection = await handleAddInspection(newInspectionData);
      if (createdInspection && createdInspection.id && photos.length > 0) {
        await handlePhotoUpload(photos, createdInspection.id);
      }
    } catch (error) {
      console.error("Error in creating inspection or uploading photos:", error);
    }
  };

  const handlePhotoUpload = async (files: File[], inspectionId: string) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("photos", file);
      });
      formData.append("inspectionId", inspectionId);
      await uploadPhoto(formData).unwrap();
      console.log("Photos uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload photos", error);
    }
  };

  const handleRouteModalSave = (selectedRoute: RoutePoint[]) => {
    setRoute(selectedRoute);
  };

  return (
    <ClientLayout breadcrumb="Add New Inspection">
      <div className="space-x-[1vw] m-[2vw]">
        <PurpleButton
          text="Route"
          type="button"
          onClick={() => setIsRouteModalOpen(true)}
        />
      </div>
      <InspectionForm onSubmit={handleFormSubmit} onPhotosSubmit={setPhotos} />
      <RouteModal
        isOpen={isRouteModalOpen}
        onClose={() => setIsRouteModalOpen(false)}
        onSave={handleRouteModalSave}
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

export default AddInspectionPage;
