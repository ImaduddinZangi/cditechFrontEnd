import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import EditGroupPermissions from "../../../Components/UserGroups/Groups/EditGroupPermissions";
import { useUpdateGroupPermissionMutation } from "../../../redux/api/groupPermissionsApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditGroupPermissionsPage: React.FC = () => {
  const [updateGroupPermission] = useUpdateGroupPermissionMutation();
  const navigate = useNavigate();
  const { groupId, permissionId } = useParams<{ groupId: string | undefined; permissionId: string | undefined }>();

  const handleUpdatePermission = async (permissionData: { resource: string; actions: string[] }) => {
    try {
      await updateGroupPermission({
        groupId,
        permissionId,
        permissionData,
      }).unwrap();
  
      toast.success("Permission updated successfully!", {
        onClose: () => navigate(`/user-group-table`),
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error updating permission:", error);
      toast.error("Error updating permission. Please try again.", {
        onClose: () => navigate("/error/500"),
        autoClose: 1000,
      });
    }
  };  

  return (
    <ClientLayout breadcrumb="Edit Group Permission">
      <EditGroupPermissions onSubmit={handleUpdatePermission} />
    </ClientLayout>
  );
};

export default EditGroupPermissionsPage;
