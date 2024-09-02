import React from "react";
import { useRegisterClientMutation } from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setToken, setClient } from "../../redux/features/clientSlice";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layouts/AuthLayout";
import ClientRegistration from "../../Components/Auth/ClientRegistration";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientRegistrationPage: React.FC = () => {
  const [registerClient] = useRegisterClientMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleRegistration = async (
    name: string,
    email: string,
    industry: string,
    password: string,
    phone: string,
    address: string,
    companyName: string,
    companyType: string,
    billingAddress: string,
    paymentMethod: string,
    customPortalUrl: string,
    nextBillDate: string
  ) => {
    try {
      const result = await registerClient({
        name,
        email,
        password,
        phone,
        industry,
        address,
        company_name: companyName,
        company_type: companyType,
        billing_address: billingAddress,
        payment_method: paymentMethod,
        custom_portal_url: customPortalUrl,
        next_bill_date: nextBillDate,
        account_status: "Inactive",
      }).unwrap();
      dispatch(setToken(result.access_token));
      if (result.client) {
        dispatch(setClient(result.client));
      }
      toast.success("Registration successful!", {
        onClose: () => navigate("/client-login"),
        autoClose: 500,
      });
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Registration error: " + error.data.message);
      } else if (error instanceof Error) {
        toast.error("Registration error: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthLayout>
      <ClientRegistration onSubmit={handleRegistration} />
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
    </AuthLayout>
  );
};

export default ClientRegistrationPage;
