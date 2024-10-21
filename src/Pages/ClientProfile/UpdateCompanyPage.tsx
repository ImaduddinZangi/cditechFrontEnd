import React, { useState } from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import UpdateCompany from "../../Components/ClientProfile/UpdateCompany";
import {
  useGetCompanyByClientIdQuery,
  useUpdateCompanyMutation,
} from "../../redux/api/companyApi";
import { getUserId } from "../../utils/utils";
import { Company } from "../../redux/features/companySlice";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Constants/Loader";

const UpdateCompanyPage: React.FC = () => {
  const clientId = getUserId();
  const [loading, setLoading] = useState(false);
  if (!clientId) {
    toast.error("Client ID not found. Please log in again.", {
      onClose: () => navigate("/client-login"),
      autoClose: 1000,
    });
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <p>Client ID not found. Please log in again.</p>
      </div>
    );
  }
  const { data: company, isLoading } = useGetCompanyByClientIdQuery(clientId);
  const [updateCompany] = useUpdateCompanyMutation();
  const navigate = useNavigate();
  console.log("Company data:", company);

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleUpdateCompany = async (companyData: Company) => {
    try {
      setLoading(true);
      const result = await updateCompany({
        id: companyData.id,
        ...companyData,
      }).unwrap();
      toast.success("Company updated successfully!", {
        onClose: () => navigate("/client-profile"),
        autoClose: 1000,
      });
      console.log("Company updated successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Updating Company: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Updating Company: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Updating Company:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <ClientLayout breadcrumb="Edit Company">
      {loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        <UpdateCompany onSubmit={handleUpdateCompany} initialData={company} />
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

export default UpdateCompanyPage;
