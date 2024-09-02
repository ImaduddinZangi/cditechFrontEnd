import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddAsset from "../../../Components/Customer/Asset/AddAsset";
import { useCreateAssetMutation } from "../../../redux/api/assetApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddAssetsPage: React.FC = () => {
  const [createAsset] = useCreateAssetMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

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
        pumps,
      }).unwrap();
      toast.success("Asset added successfully!", {
        onClose: () => navigate("/manage-customer"),
        autoClose: 500,
      });
      console.log("Asset created successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Asset: " + error.data.message);
      } else if (error instanceof Error) {
        toast.error("Error Adding Asset: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.error("Error Adding Asset:", error);
    }
  };

  return (
    <ClientLayout breadcrumb="Add Asset">
      <AddAsset onSubmit={handleAddAsset} />
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
