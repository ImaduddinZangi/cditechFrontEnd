import React, { useState } from "react";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import { useGetUserGroupsQuery } from "../../../redux/api/userGroupApi";
import { useNavigate } from "react-router-dom";

interface InternalPermission {
  resource: string;
  actions: {
    create: boolean;
    view: boolean;
    edit: boolean;
    delete: boolean;
  };
}

interface GrantGroupPermissionsProps {
  onSubmit: (
    groupId: string,
    data: { resource: string; actions: string[] }[]
  ) => void;
}

const defaultPermissions: InternalPermission[] = [
  {
    resource: "customers",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "asset-types",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "assets",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "pump-brands",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "pumps",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "photos",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "inspections",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "reports",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "groups",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "users",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "invoices",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "checklists",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "inspection-scores",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "checklists-items",
    actions: { create: false, view: false, edit: false, delete: false },
  },
  {
    resource: "permissions",
    actions: { create: false, view: false, edit: false, delete: false },
  },
];

const GrantGroupPermissions: React.FC<GrantGroupPermissionsProps> = ({
  onSubmit,
}) => {
  const [permissions, setPermissions] =
    useState<InternalPermission[]>(defaultPermissions);
  const [groupId, setGroupId] = useState<string>("");
  const { data: userGroups } = useGetUserGroupsQuery();
  const navigate = useNavigate();

  const areAllPermissionsGranted = () =>
    permissions.every((perm) =>
      Object.values(perm.actions).every((action) => action)
    );

  const handleCheckboxChange = (
    resource: string,
    action: keyof InternalPermission["actions"]
  ) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((perm) =>
        perm.resource === resource
          ? {
              ...perm,
              actions: {
                ...perm.actions,
                [action]: !perm.actions[action],
              },
            }
          : perm
      )
    );
  };

  // Grant all permissions
  const grantAllPermissions = () => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((perm) => ({
        ...perm,
        actions: {
          create: true,
          view: true,
          edit: true,
          delete: true,
        },
      }))
    );
  };

  // Remove all permissions
  const removeAllPermissions = () => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((perm) => ({
        ...perm,
        actions: {
          create: false,
          view: false,
          edit: false,
          delete: false,
        },
      }))
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (groupId) {
      const formattedPermissions = permissions.map((perm) => {
        // Filter actions to include only those that are true
        const allowedActions = Object.entries(perm.actions)
          .filter(([_, isAllowed]) => isAllowed) // Keep only the actions that are true
          .map(([action]) => action); // Extract the action names

        return {
          resource: perm.resource,
          actions: allowedActions, // This will contain the array of true actions
        };
      });

      onSubmit(groupId, formattedPermissions);
    } else {
      alert("Please select a user group");
    }
  };

  const handleCancel = () => {
    navigate("/user-group-table");
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[2vw]">
        <div className="grid grid-cols-2">
          <div>
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              User Group
            </label>
            <select
              name="groupId"
              id="groupId"
              className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              required
            >
              <option value="">Select a group</option>
              {userGroups?.map((group) => (
                <option value={group.id} key={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full grid grid-cols-4 gap-[1vw]">
          {permissions.map((perm) => (
            <div key={perm.resource}>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter mb-[0.5vw]">
                {perm.resource.charAt(0).toUpperCase() + perm.resource.slice(1)}
              </p>
              <div className="grid grid-cols-2">
                {["create", "view", "edit", "delete"].map((action) => (
                  <label
                    key={action}
                    className="flex items-center space-x-2 text-darkgray-0 font-medium text-[1vw] mb-[0.4vw]"
                  >
                    <input
                      type="checkbox"
                      className="w-[2.5vw] md:w-[1vw] h-[2.5vw] md:h-[1vw] accent-purple-0 border-lightgray-0 rounded focus:ring-offset-white focus:ring-purple-0 cursor-pointer"
                      checked={
                        perm.actions[
                          action as keyof InternalPermission["actions"]
                        ]
                      }
                      onChange={() =>
                        handleCheckboxChange(
                          perm.resource,
                          action as keyof InternalPermission["actions"]
                        )
                      }
                    />
                    <span>
                      {action.charAt(0).toUpperCase() + action.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          {areAllPermissionsGranted() ? (
            <PurpleButton
              text="Remove All Permissions"
              onClick={removeAllPermissions}
            />
          ) : (
            <PurpleButton
              text="Grant All Permissions"
              onClick={grantAllPermissions}
            />
          )}
          <div className="flex flex-row items-center gap-6">
            <PurpleButton text="Submit" type="submit" />
            <WhiteButton text="Cancel" onClick={handleCancel} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GrantGroupPermissions;
