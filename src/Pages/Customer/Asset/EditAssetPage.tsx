import React, { useState, useEffect } from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddAsset from "../../../Components/Customer/Asset/AddAsset";
import {
  useGetAssetByIdQuery,
  useUpdateAssetMutation,
} from "../../../redux/api/assetApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const EditAssetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: asset, error, isLoading } = useGetAssetByIdQuery(id || "");
  const [updateAsset] = useUpdateAssetMutation();
  const [initialData, setInitialData] = useState(asset);
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  useEffect(() => {
    if (asset) {
      setInitialData(asset);
    }
  }, [asset]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching asset data.</div>;
  }

  const handleUpdateAsset = async (
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
      const result = await updateAsset({
        id,
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
      toast.success("Asset updated successfully!", {
        onClose: () => navigate("/manage-customer"),
        autoClose: 1000,
      });
      console.log("Asset updated successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Updating Assets: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Updating Assets: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Updating Assets:", error);
    }
  };

  return (
    <ClientLayout breadcrumb="Edit Asset">
      {initialData && (
        <AddAsset onSubmit={handleUpdateAsset} initialData={initialData} />
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

export default EditAssetPage;
