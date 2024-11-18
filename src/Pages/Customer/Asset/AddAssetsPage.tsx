import React, { useState } from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddAsset from "../../../Components/Customer/Asset/AddAsset";
import { useCreateAssetMutation } from "../../../redux/api/assetApi";
import { useCreatePumpMutation } from "../../../redux/api/pumpApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Pump } from "../../../redux/features/pumpSlice";
import Loader from "../../../Components/Constants/Loader";

const AddAssetsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
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

  const handleAddAsset = async (assetData: FormData, pumpDataList?: Pump[]) => {
    try {
      setLoading(true);
      const assetResult = await createAsset(assetData).unwrap();
      const assetId = assetResult.id;
      if (pumpDataList) {
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
          pumpData.files?.forEach((photo) => {
            pumpFormData.append("files", photo);
          });
          await createPump(pumpFormData).unwrap();
        }
      }
      toast.success("Asset added successfully!");
      console.log("Asset created successfully");
      setTimeout(() => {
        navigate("/manage-customers");
      }, 1000);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Asset: " + error.data.message);
      } else if (error instanceof Error) {
        toast.error("Error Adding Asset: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      setTimeout(() => {
        navigate("/error/500");
      }, 1000);
    } finally {
      setLoading(false);
    }
  };


  return (
    <ClientLayout breadcrumb="Add Asset">
      {loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        <AddAsset onSubmit={handleAddAsset} />
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

export default AddAssetsPage;
