import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddUserGroup from "../../../Components/UserGroups/Groups/AddUserGroup";
import { useCreateUserGroupMutation } from "../../../redux/api/userGroupApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserGroup } from "../../../redux/features/userGroupSlice";

const AddUserGroupPage: React.FC = () => {
  const [createUserGroup] = useCreateUserGroupMutation();
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
      const result = await createUserGroup(userGroupData).unwrap();
      toast.success("User Group added successfully!", {
        onClose: () => navigate("/user-group-table"),
        autoClose: 500,
      });
      console.log("User group created successfully", result);
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding User Group: " + error.data.message);
      } else if (error instanceof Error) {
        toast.error("Error Adding User Group: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.error("Error Adding User Group:", error);
    }
  };

  return (
    <ClientLayout breadcrumb="Add User Group">
      <AddUserGroup onSubmit={handleAddUserGroup} />
    </ClientLayout>
  );
};

export default AddUserGroupPage;
