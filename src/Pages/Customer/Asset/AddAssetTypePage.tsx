import React from 'react';
import ClientLayout from '../../../Layouts/ClientLayout';
import AddAssetType from '../../../Components/Customer/Asset/AddAssetType';
import { useCreateAssetTypeMutation } from '../../../redux/api/assetTypeApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddAssetTypePage: React.FC = () => {
  const [createAssetType] = useCreateAssetTypeMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleAddAssetType = async (name: string, description: string) => {
    try {
      const result = await createAssetType({ name, description }).unwrap();
      toast.success("Asset Type added successfully!", {
        onClose: () => navigate("/add-asset"),
        autoClose: 500,
      });
      console.log("Asset created successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Asset Type: " + error.data.message);
      } else if (error instanceof Error) {
        toast.error("Error Adding Asset Type: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.error("Error Adding Asset Type:", error);
    }
  };

  return (
    <ClientLayout breadcrumb='Add Asset Type'>
      <AddAssetType onSubmit={handleAddAssetType} />
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

export default AddAssetTypePage;
