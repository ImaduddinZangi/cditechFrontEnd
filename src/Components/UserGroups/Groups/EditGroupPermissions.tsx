import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetGroupPermissionsQuery } from "../../../redux/api/groupPermissionsApi";
import Loader from "../../Constants/Loader";
import PurpleButton from "../../Tags/PurpleButton";

interface InternalPermission {
  resource: string;
  actions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}

interface EditGroupPermissionsProps {
  onSubmit: (data: { resource: string; actions: string[] }) => void;
}

const EditGroupPermissions: React.FC<EditGroupPermissionsProps> = ({
  onSubmit,
}) => {
  const { groupId, permissionId } = useParams<{
    groupId: string;
    permissionId: string;
  }>();
  const {
    data: permissionsData,
    error,
    isLoading,
  } = useGetGroupPermissionsQuery(groupId || "");

  const [permission, setPermission] = useState<InternalPermission | null>(null);

  useEffect(() => {
    if (permissionsData && permissionId) {
      const currentPermission = permissionsData.find(
        (p) => p.id === permissionId
      );
      if (currentPermission) {
        setPermission({
          resource: currentPermission.permissionName,
          actions: {
            view: currentPermission.canView,
            create: currentPermission.canCreate,
            edit: currentPermission.canEdit,
            delete: currentPermission.canDelete,
          },
        });
      }
    }
  }, [permissionsData, permissionId]);

  const handleCheckboxChange = (
    action: keyof InternalPermission["actions"]
  ) => {
    setPermission((prevPermission) => {
      if (prevPermission) {
        return {
          ...prevPermission,
          actions: {
            ...prevPermission.actions,
            [action]: !prevPermission.actions[action],
          },
        };
      }
      return prevPermission;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (permission) {
      const resourceWithoutManage = permission.resource.replace("manage_", "");

      const allowedActions = Object.entries(permission.actions)
        .filter(([_, isAllowed]) => isAllowed)
        .map(([action]) => action);

      onSubmit({ resource: resourceWithoutManage, actions: allowedActions });
    }
  };

  if (isLoading)
    return (
      <div className="w-full h-[80vh]">
        <Loader />
      </div>
    );
  if (error) return <p>Error loading permission data</p>;

  if (!permission) {
    return <p>Loading permission data...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter"
    >
      <div>
        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter mb-[1vw]">
          {permission.resource.charAt(0).toUpperCase() +
            permission.resource.slice(1)}
        </p>
        {["create", "view", "edit", "delete"].map((action) => (
          <label
            key={action}
            className="flex items-center space-x-2 text-darkgray-0 font-medium text-[1vw] mb-[0.4vw]"
          >
            <input
              type="checkbox"
              className="w-[2.5vw] md:w-[1vw] h-[2.5vw] md:h-[1vw] accent-purple-0 border-lightgray-0 rounded focus:ring-offset-white focus:ring-purple-0 cursor-pointer"
              checked={
                permission.actions[
                  action as keyof InternalPermission["actions"]
                ]
              }
              onChange={() =>
                handleCheckboxChange(
                  action as keyof InternalPermission["actions"]
                )
              }
            />
            <span>{action.charAt(0).toUpperCase() + action.slice(1)}</span>
          </label>
        ))}
      </div>
      <div className="flex flex-row justify-end mt-[1vw]">
        <PurpleButton text="Update Permission" type="submit" />
      </div>
    </form>
  );
};

export default EditGroupPermissions;
