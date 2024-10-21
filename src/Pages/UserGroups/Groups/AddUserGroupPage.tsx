import React, { useState } from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddUserGroup from "../../../Components/UserGroups/Groups/AddUserGroup";
import { useCreateUserGroupMutation } from "../../../redux/api/userGroupApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { UserGroup } from "../../../redux/features/userGroupSlice";
import Loader from "../../../Components/Constants/Loader";

const AddUserGroupPage: React.FC = () => {
  const [createUserGroup] = useCreateUserGroupMutation();
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

  const handleAddUserGroup = async (userGroupData: UserGroup) => {
    try {
      setLoading(true);
      const result = await createUserGroup(userGroupData).unwrap();
      toast.success("User Group added successfully!", {
        onClose: () => navigate("/manage-user-groups"),
        autoClose: 1000,
      });
      console.log("User group created successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding User Group: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Adding User Group: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Adding User Group:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout breadcrumb="Add User Group">
      {loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        <AddUserGroup onSubmit={handleAddUserGroup} />
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

export default AddUserGroupPage;
