import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddUserGroup from "../../../Components/UserGroups/Groups/AddUserGroup";
import {
  useGetUserGroupByIdQuery,
  useUpdateUserGroupMutation,
} from "../../../redux/api/userGroupApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserGroup } from "../../../redux/features/userGroupSlice";
import Loader from "../../../Components/Constants/Loader";

const EditUserGroupPage: React.FC = () => {
  const { userGroupId } = useParams<{ userGroupId: string }>();
  const { data: userGroup, isLoading } = useGetUserGroupByIdQuery(userGroupId!);
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
      const result = await updateUserGroup(userGroupData).unwrap();
      toast.success("User Group updated successfully!", {
        onClose: () => navigate("/user-group-table"),
        autoClose: 500,
      });
      console.log("User group updated successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Updating User Group: " + error.data.message);
      } else if (error instanceof Error) {
        toast.error("Error Updating User Group: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.error("Error Updating User Group:", error);
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
      <AddUserGroup onSubmit={handleUpdateUserGroup} initialData={userGroup} />
    </ClientLayout>
  );
};

export default EditUserGroupPage;
