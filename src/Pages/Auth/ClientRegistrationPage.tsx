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

  const handleRegistration = async (
    name: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    billingAddress: string,
    paymentMethod: string,
    type: string,
    status: string,
    nextBillDate: string
  ) => {
    try {
      const result = await registerClient({
        name,
        email,
        password,
        phone,
        address,
        billing_address: billingAddress,
        payment_method: paymentMethod,
        type,
        status,
        next_bill_date: nextBillDate,
      }).unwrap();
      dispatch(setToken(result.access_token));
      if (result.client) {
        dispatch(setClient(result.client));
      }
      toast.success("Registration successful!", {
        onClose: () => navigate("/client-login"),
        autoClose: 1000,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Registration error: " + error.message);
        console.error("Registration error:", error);
      } else {
        toast.error("An unknown error occurred.");
        console.error("An unknown error occurred:", error);
      }
    }
  };

  return (
    <AuthLayout>
      <ClientRegistration onSubmit={handleRegistration} />
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
    </AuthLayout>
  );
};

export default ClientRegistrationPage;
