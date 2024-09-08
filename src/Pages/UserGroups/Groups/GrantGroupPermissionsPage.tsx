import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import GrantGroupPermissions from "../../../Components/UserGroups/Groups/GrantGroupPermissions";
import { useAssignCustomPermissionsMutation } from "../../../redux/api/groupPermissionsApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Permission } from "../../../redux/features/groupPermissionsSlice";

const GrantGroupPermissionsPage: React.FC = () => {
  const [assignCustomPermissions] = useAssignCustomPermissionsMutation();
  const navigate = useNavigate();

  const handleGrantPermissions = async (
    groupId: string,
    permissions: Permission[]
  ) => {
    try {
      const result = await assignCustomPermissions({
        groupId,
        permissions,
      }).unwrap();

      toast.success("Permissions granted successfully!", {
        onClose: () => navigate(`/user-group-table/`),
        autoClose: 500,
      });
      console.log("Permissions granted successfully", result);
    } catch (error) {
      console.error("Error granting permissions:", error);
      toast.error("Error granting permissions. Please try again.");
    }
  };

  return (
    <ClientLayout breadcrumb="Grant Group Permissions">
      <GrantGroupPermissions onSubmit={handleGrantPermissions} />
    </ClientLayout>
  );
};

export default GrantGroupPermissionsPage;
