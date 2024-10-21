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
import Loader from "../../../Components/Constants/Loader";

const EditAssetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
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

  const handleUpdateAsset = async (formData: FormData) => {
    try {
      setLoading(true);
      const result = await updateAsset({ id: id, formData }).unwrap();
      toast.success("Asset updated successfully!", {
        onClose: () => navigate("/manage-customers"),
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout breadcrumb="Edit Asset">
      {loading ? (
       <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        initialData && (
          <AddAsset onSubmit={handleUpdateAsset} initialData={initialData} />
        )
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
