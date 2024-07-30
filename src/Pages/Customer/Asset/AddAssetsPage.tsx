import React, { useState } from 'react';
import ClientLayout from '../../../Layouts/ClientLayout';
import AddAsset from '../../../Components/Customer/Asset/AddAsset';
import { useCreateAssetMutation } from '../../../redux/api/assetApi';
import AddPump from "../../../Components/Customer/Pump/AddPump";
import { useCreatePumpMutation } from "../../../redux/api/pumpApi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Pumps from '../../../Components/Customer/Pump/Pumps';

const AddAssetsPage: React.FC = () => {
  const [createAsset] = useCreateAssetMutation();
  const [createPump] = useCreatePumpMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddAsset = async (
    name: string,
    type: string,
    customerId: string,
    clientId: string | undefined,
    location: string,
    latitude: number,
    longitude: number,
    description: string,
    status: string,
    inspectionInterval: string,
    qrCode: string,
    nfcCode: string,
    pipeDia: number,
    smart: string,
    size: string,
    material: string,
    deleteProtect: string,
    duty: string,
    rails: string,
    float: number,
    pumps: number
  ) => {
    try {
      const result = await createAsset({
        name,
        type,
        customerId,
        clientId,
        location,
        latitude,
        longitude,
        description,
        status,
        inspectionInterval,
        qrCode,
        nfcCode,
        pipeDia,
        smart,
        size,
        material,
        deleteProtect,
        duty,
        rails,
        float,
        pumps
      }).unwrap();
      toast.success("Asset added successfully!", {
        onClose: () => navigate("/client-dashboard"),
        autoClose: 500,
      });
      console.log("Asset created successfully", result);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error adding Asset: " + error.message);
        console.error("Error adding Asset:", error);
      } else {
        toast.error("An unknown error occurred.");
        console.error("An unknown error occurred:", error);
      }
    }
  };

  const handleAddPump = async (
    assetId: string,
    name: string,
    brandId: string,
    serial: string,
    warranty: string,
    installedDate: string,
    avgAmps: number,
    maxAmps: number,
    hp: number
  ) => {
    try {
      const result = await createPump({
        assetId,
        brandId,
        name,
        hp,
        serial,
        installedDate,
        avgAmps,
        maxAmps,
        warranty
      }).unwrap();
      
      toast.success("Pump added successfully!", {
        onClose: () => navigate("/add-asset"),
        autoClose: 500,
      });
      console.log("Pump created successfully", result);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error adding Pump: " + error.message);
        console.error("Error adding Pump:", error);
      } else {
        toast.error("An unknown error occurred.");
        console.error("An unknown error occurred:", error);
      }
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <ClientLayout breadcrumb='Add Asset'>
      <AddAsset onSubmit={handleAddAsset} />
      <Pumps onClick={handleModalOpen} />
      <AddPump 
        isModalOpen={isModalOpen} 
        onClose={handleModalClose} 
        onSubmit={handleAddPump} 
      />
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

export default AddAssetsPage;
