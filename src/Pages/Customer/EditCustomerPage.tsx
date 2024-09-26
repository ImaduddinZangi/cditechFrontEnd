import React from "react";
import { useGetCustomerByIdQuery, useUpdateCustomerMutation } from "../../redux/api/customerApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCustomer from "../../Components/Customer/AddCustomer";
import ClientLayout from "../../Layouts/ClientLayout";

const EditCustomerPage: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const { data: customer, error, isLoading } = useGetCustomerByIdQuery(customerId || "");
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
      id: customerId,
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
      await updateCustomer(customerData).unwrap();
      toast.success("Customer updated successfully!", {
        onClose: () => navigate("/client-dashboard"),
        autoClose: 500,
      });
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Updating Customer: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else if (error instanceof Error) {
        toast.error("Error Updating Customer: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 500,
        });
      }
      console.error("Error Updating Customer:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading customer details</div>;

  return (
    <ClientLayout breadcrumb="Edit Customer">
      <AddCustomer onSubmit={handleSubmit} initialData={customer} />
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

export default EditCustomerPage;
