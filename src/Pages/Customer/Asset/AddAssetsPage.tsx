import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddAsset from "../../../Components/Customer/Asset/AddAsset";
import { useCreateAssetMutation } from "../../../redux/api/assetApi";
import { useCreatePumpMutation } from "../../../redux/api/pumpApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Pump } from "../../../redux/features/pumpSlice";

const AddAssetsPage: React.FC = () => {
  const [createAsset] = useCreateAssetMutation();
  const [createPump] = useCreatePumpMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleAddAsset = async (assetData: FormData, pumpDataList: Pump[]) => {
    try {
      // Create the asset
      const assetResult = await createAsset(assetData).unwrap();
      const assetId = assetResult.id;
      // Create pumps
      for (const pumpData of pumpDataList) {
        const pumpFormData = new FormData();
        pumpFormData.append("assetId", assetId);
        pumpFormData.append("name", pumpData.name);
        if (pumpData.brandId !== undefined) {
          pumpFormData.append("brandId", pumpData.brandId);
        }
        pumpFormData.append("serial", pumpData.serial);
        pumpFormData.append("avgAmps", pumpData.avgAmps);
        pumpFormData.append("maxAmps", pumpData.maxAmps);
        pumpFormData.append("hp", pumpData.hp);
        pumpFormData.append("warranty", pumpData.warranty);
        pumpFormData.append("installedDate", pumpData.installedDate);
        pumpData.photos?.forEach((photo) => {
          pumpFormData.append("photos", photo);
        });

        await createPump(pumpFormData).unwrap();
      }

      toast.success("Asset and pumps added successfully!", {
        onClose: () => navigate("/manage-customers"),
        autoClose: 1000,
      });
      console.log("Asset and pumps created successfully");
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Asset/Pumps: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Adding Asset/Pumps: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Adding Asset/Pumps:", error);
    }
  };

  return (
    <ClientLayout breadcrumb="Add Asset">
      <AddAsset onSubmit={handleAddAsset} />
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

export default AddAssetsPage;
