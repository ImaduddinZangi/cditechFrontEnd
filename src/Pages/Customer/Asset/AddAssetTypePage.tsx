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

  const handleAddAssetType = async (name: string, description: string) => {
    try {
      const result = await createAssetType({ name, description }).unwrap();
      toast.success("Asset Type added successfully!", {
        onClose: () => navigate("/add-asset"),
        autoClose: 1000,
      });
      console.log("Asset created successfully", result);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error adding Asset Type: " + error.message);
        console.error("Error adding Asset Type:", error);
      } else {
        toast.error("An unknown error occurred.");
        console.error("An unknown error occurred:", error);
      }
    }
  };

  return (
    <ClientLayout breadcrumb='Add Asset Type'>
      <AddAssetType onSubmit={handleAddAssetType} />
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

export default AddAssetTypePage;
