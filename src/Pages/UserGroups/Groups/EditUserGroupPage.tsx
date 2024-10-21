import React, { useState } from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddUserGroup from "../../../Components/UserGroups/Groups/AddUserGroup";
import {
  useGetUserGroupByIdQuery,
  useUpdateUserGroupMutation,
} from "../../../redux/api/userGroupApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { UserGroup } from "../../../redux/features/userGroupSlice";
import Loader from "../../../Components/Constants/Loader";

const EditUserGroupPage: React.FC = () => {
  const { userGroupId } = useParams<{ userGroupId: string }>();
  const { data: userGroup, isLoading } = useGetUserGroupByIdQuery(userGroupId!);
  const [loading, setLoading] = useState(false);
  const [updateUserGroup] = useUpdateUserGroupMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleUpdateUserGroup = async (userGroupData: UserGroup) => {
    try {
      setLoading(true);
      const result = await updateUserGroup(userGroupData).unwrap();
      toast.success("User Group updated successfully!", {
        onClose: () => navigate("/manage-user-groups"),
        autoClose: 1000,
      });
      console.log("User group updated successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Updating User Group: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Updating User Group: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Updating User Group:", error);
    } finally {
      setLoading(false);
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
    <ClientLayout breadcrumb="Edit User Group">
      {loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        <AddUserGroup
          onSubmit={handleUpdateUserGroup}
          initialData={userGroup}
        />
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

export default EditUserGroupPage;
