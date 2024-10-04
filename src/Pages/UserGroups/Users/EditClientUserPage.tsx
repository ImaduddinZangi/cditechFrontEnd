import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddClientUser from "../../../Components/UserGroups/Users/AddClientUser";
import {
  useGetClientUserByIdQuery,
  useUpdateClientUserMutation,
} from "../../../redux/api/clientUserApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClientUser } from "../../../redux/features/clientUserSlice";
import Loader from "../../../Components/Constants/Loader";

const EditClientUserPage: React.FC = () => {
  const { clientUserId } = useParams<{ clientUserId: string }>();
  const { data: clientUser, isLoading } = useGetClientUserByIdQuery(clientUserId!);
  const [updateClientUser] = useUpdateClientUserMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleUpdateClientUser = async (clientUserData: ClientUser) => {
    try {
      const result = await updateClientUser(clientUserData).unwrap();
      toast.success("Client User updated successfully!", {
        onClose: () => navigate("/client-user-table"),
        autoClose: 1000,
      });
      console.log("Client user updated successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Updating Client User: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Updating Client User: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Updating Client User:", error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <ClientLayout breadcrumb="Edit Client User">
      <AddClientUser onSubmit={handleUpdateClientUser} initialData={clientUser} />
    </ClientLayout>
  );
};

export default EditClientUserPage;
