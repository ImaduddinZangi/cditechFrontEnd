import React, { useState } from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import GrantGroupPermissions from "../../../Components/UserGroups/Groups/GrantGroupPermissions";
import { useAssignCustomPermissionsMutation } from "../../../redux/api/groupPermissionsApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Permission } from "../../../redux/features/groupPermissionsSlice";
import Loader from "../../../Components/Constants/Loader";

const GrantGroupPermissionsPage: React.FC = () => {
  const [assignCustomPermissions] = useAssignCustomPermissionsMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGrantPermissions = async (
    groupId: string,
    permissions: Permission[]
  ) => {
    try {
      setLoading(true);
      const result = await assignCustomPermissions({
        groupId,
        permissions,
      }).unwrap();

      toast.success("Permissions granted successfully!", {
        onClose: () => navigate(`/manage-user-groups`),
        autoClose: 1000,
      });
      console.log("Permissions granted successfully", result);
    } catch (error) {
      console.error("Error granting permissions:", error);
      toast.error("Error granting permissions. Please try again.", {
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
        <GrantGroupPermissions onSubmit={handleGrantPermissions} />
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
