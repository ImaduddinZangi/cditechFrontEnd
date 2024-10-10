import React from "react";
import {
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
} from "../../redux/api/customerApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCustomer from "../../Components/Customer/AddCustomer";
import ClientLayout from "../../Layouts/ClientLayout";
import Loader from "../../Components/Constants/Loader";

const EditCustomerPage: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const {
    data: customer,
    error,
    isLoading,
  } = useGetCustomerByIdQuery(customerId || "");
  const [updateCustomer] = useUpdateCustomerMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      await updateCustomer({ id: customerId, formData }).unwrap();
      toast.success("Customer updated successfully!", {
        onClose: () => navigate("/client-dashboard"),
        autoClose: 1000,
      });
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Updating Customer: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Updating Customer: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Updating Customer:", error);
    }
  };

  if (isLoading)
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  if (error) return <div>Error loading customer details</div>;

  return (
    <ClientLayout breadcrumb="Edit Customer">
      <AddCustomer onSubmit={handleSubmit} initialData={customer} />
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

export default EditCustomerPage;
