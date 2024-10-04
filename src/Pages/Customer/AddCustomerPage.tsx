import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import AddCustomer from "../../Components/Customer/AddCustomer";
import { useCreateCustomerMutation } from "../../redux/api/customerApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCustomerPage: React.FC = () => {
  const [createCustomer] = useCreateCustomerMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    gate_code: string;
    previousPhone: string;
    streetAddress: string;
    billingAddress: string;
  }) => {
    const {
      name,
      email,
      phone,
      gate_code,
      previousPhone,
      streetAddress,
      billingAddress,
    } = data;

    const customerData = {
      name,
      email,
      phone,
      address: streetAddress,
      service_address: streetAddress,
      billing_address: billingAddress,
      type: "customer",
      status: "active",
      gate_code,
      previous_phone_number: previousPhone,
      service_contact: phone,
    };

    try {
      await createCustomer(customerData).unwrap();
      toast.success("Customer added successfully!", {
        onClose: () => navigate("/client-dashboard"),
        autoClose: 1000,
      });
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Customer: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Adding Customer: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Adding Customer:", error);
    }
  };

  return (
    <ClientLayout breadcrumb="Add Customer">
      <AddCustomer onSubmit={handleSubmit} />
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
