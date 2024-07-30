import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import AddPhotos from "../../Components/Customer/AddPhotos";
import { toast, ToastContainer } from "react-toastify";
import { useUploadPhotoMutation } from "../../redux/api/uploadPhotosApi";
import { useNavigate } from "react-router-dom";

const AddPhotosPage: React.FC = () => {
  const [uploadPhoto] = useUploadPhotoMutation();
  const navigate = useNavigate();
  const handlePhotoUpload = async (file: File, id: string, type: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (type === "asset") {
        formData.append("assetId", id);
      } else if (type === "pump") {
        formData.append("pumpId", id);
      } else if (type === "pumpBrand") {
        formData.append("pumpBrandId", id);
      }
      await uploadPhoto(formData).unwrap();
      toast.success("Photo uploaded successfully!", {
        onClose: () => navigate("/client-dashboard"),
        autoClose: 500,
      });
    } catch (error) {
      toast.error("Failed to upload photo.");
    }
  };

  return (
    <ClientLayout breadcrumb="Add Photos">
      <AddPhotos onSubmit={handlePhotoUpload} />
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

export default AddPhotosPage;
