import React, { useState } from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddClientUser from "../../../Components/UserGroups/Users/AddClientUser";
import { useCreateClientUserMutation } from "../../../redux/api/clientUserApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ClientUser } from "../../../redux/features/clientUserSlice";
import Loader from "../../../Components/Constants/Loader";

const AddClientUserPage: React.FC = () => {
  const [createClientUser] = useCreateClientUserMutation();
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

  const handleAddClientUser = async (clientUserData: ClientUser) => {
    try {
      setLoading(true);
      const result = await createClientUser(clientUserData).unwrap();
      toast.success("Client User added successfully!", {
        onClose: () => navigate("/manage-users"),
        autoClose: 1000,
      });
      console.log("Client user created successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Client User: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Adding Client User: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Adding Client User:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout breadcrumb="Add Client User">
      {loading ? (
       <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        <AddClientUser onSubmit={handleAddClientUser} />
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

export default AddClientUserPage;
