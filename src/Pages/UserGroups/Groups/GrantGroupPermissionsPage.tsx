import React, { useState } from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import GrantGroupPermissions from "../../../Components/UserGroups/Groups/GrantGroupPermissions";
import { useAssignCustomPermissionsMutation } from "../../../redux/api/groupPermissionsApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Permission } from "../../../redux/features/groupPermissionsSlice";
import Loader from "../../../Components/Constants/Loader";
import { useUpdateUserGroupMutation } from "../../../redux/api/userGroupApi";

const GrantGroupPermissionsPage: React.FC = () => {
  const [assignCustomPermissions] = useAssignCustomPermissionsMutation();
  const [updateGroup] = useUpdateUserGroupMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGrantPermissions = async (
    groupId: string,
    permissions: Permission[],
    hexColor: string
  ) => {
    try {
      setLoading(true);
      await assignCustomPermissions({
        groupId,
        permissions,
      }).unwrap();

      await updateGroup({
        id: groupId,
        color: hexColor,
      }).unwrap();

      toast.success("Permissions and group color updated successfully!", {
        onClose: () => navigate(`/manage-user-groups`),
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error granting permissions or updating group color:", error);
      toast.error("Error granting permissions or updating group color. Please try again.", {
        onClose: () => navigate("/error/500"),
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout breadcrumb="Grant Group Permissions">
      {loading ? (
       <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        <GrantGroupPermissions onSubmit={handleGrantPermissions}/>
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

export default GrantGroupPermissionsPage;
