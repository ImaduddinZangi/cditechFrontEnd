import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import AddPhotos from "../../Components/Customer/AddPhotos";
import { toast, ToastContainer } from "react-toastify";
import { useUploadPhotoMutation } from "../../redux/api/uploadPhotosApi";
import { useNavigate } from "react-router-dom";

const AddPhotosPage: React.FC = () => {
  const [uploadPhoto] = useUploadPhotoMutation();
  const navigate = useNavigate();

  const handlePhotoUpload = async (files: File[], id: string, type: string) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      if (type === "asset") {
        formData.append("assetId", id);
      } else if (type === "pump") {
        formData.append("pumpId", id);
      } else if (type === "pumpBrand") {
        formData.append("pumpBrandId", id);
      } else if (type === "customer") {
        formData.append("customerId", id);
      } else if (type === "inspection") {
        formData.append("inspectionId", id);
      } else if (type === "client") {
        formData.append("cliendId", id);
      }
      await uploadPhoto(formData).unwrap();
      toast.success("Photos uploaded successfully!", {
        onClose: () => navigate("/client-dashboard"),
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Failed to upload photos.", {
        onClose: () => navigate("/error/500"),
        autoClose: 1000,
      });
    }
  };

  return (
    <ClientLayout breadcrumb="Add Photos">
      <AddPhotos onSubmit={handlePhotoUpload} />
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

export default AddPhotosPage;
