import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddClientUser from "../../../Components/UserGroups/Users/AddClientUser";
import { useCreateClientUserMutation } from "../../../redux/api/clientUserApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClientUser } from "../../../redux/features/clientUserSlice";

const AddClientUserPage: React.FC = () => {
  const [createClientUser] = useCreateClientUserMutation();
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
    }
  };

  return (
    <ClientLayout breadcrumb="Add Client User">
      <AddClientUser onSubmit={handleAddClientUser} />
    </ClientLayout>
  );
};

export default AddClientUserPage;
