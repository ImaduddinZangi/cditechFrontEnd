import React, { useState } from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import EditGroupPermissions from "../../../Components/UserGroups/Groups/EditGroupPermissions";
import { useUpdateGroupPermissionMutation } from "../../../redux/api/groupPermissionsApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../../Components/Constants/Loader";

const EditGroupPermissionsPage: React.FC = () => {
  const [updateGroupPermission] = useUpdateGroupPermissionMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { groupId, permissionId } = useParams<{
    groupId: string | undefined;
    permissionId: string | undefined;
  }>();

  const handleUpdatePermission = async (permissionData: {
    resource: string;
    actions: string[];
  }) => {
    try {
      setLoading(true);
      await updateGroupPermission({
        groupId,
        permissionId,
        permissionData,
      }).unwrap();

      toast.success("Permission updated successfully!", {
        onClose: () => navigate(`/manage-user-groups`),
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error updating permission:", error);
      toast.error("Error updating permission. Please try again.", {
        onClose: () => navigate("/error/500"),
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout breadcrumb="Edit Group Permission">
      {loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        <EditGroupPermissions onSubmit={handleUpdatePermission} />
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

export default EditGroupPermissionsPage;
