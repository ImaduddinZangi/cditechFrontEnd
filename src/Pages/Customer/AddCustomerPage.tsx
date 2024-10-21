import React, { useState } from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import AddCustomer from "../../Components/Customer/AddCustomer";
import { useCreateCustomerMutation } from "../../redux/api/customerApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Constants/Loader";

const AddCustomerPage: React.FC = () => {
  const [createCustomer] = useCreateCustomerMutation();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await createCustomer(formData).unwrap();
      toast.success("Customer added successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/manage-customers");
      }, 1000);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Customer: " + error.data.message, {
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Adding Customer: " + error.message, {
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          autoClose: 1000,
        });
      }
      console.error("Error Adding Customer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout breadcrumb="Add Customer">
      {loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        <AddCustomer onSubmit={handleSubmit} />
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

export default AddCustomerPage;
