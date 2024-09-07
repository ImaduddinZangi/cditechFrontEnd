import React, { useState } from "react";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";

interface Permission {
  view: boolean;
  edit: boolean;
  create: boolean;
  delete: boolean;
}

interface GroupPermissions {
  clientUsers: Permission;
  customerAssets: Permission;
  freePlan: Permission;
  productServices: Permission;
  clientUserGroup: Permission;
  inspections: Permission;
  clientLogs: Permission;
  customers: Permission;
  supportCases: Permission;
  customerInvoices: Permission;
}

interface QuickBooksLink {
  quickbooksLink: boolean;
}

const defaultPermissions: GroupPermissions = {
  clientUsers: { view: false, edit: false, create: false, delete: false },
  customerAssets: { view: false, edit: false, create: false, delete: false },
  freePlan: { view: false, edit: false, create: false, delete: false },
  productServices: { view: false, edit: false, create: false, delete: false },
  clientUserGroup: { view: false, edit: false, create: false, delete: false },
  inspections: { view: false, edit: false, create: false, delete: false },
  clientLogs: { view: false, edit: false, create: false, delete: false },
  customers: { view: false, edit: false, create: false, delete: false },
  supportCases: { view: false, edit: false, create: false, delete: false },
  customerInvoices: { view: false, edit: false, create: false, delete: false },
};

const defaultQuickBooksLink: QuickBooksLink = {
  quickbooksLink: false,
};

const isPermission = (
  permission: boolean | Permission
): permission is Permission => {
  return typeof permission === "object" && permission !== null;
};

const AddUserGroup: React.FC = () => {
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("#000000");
  const [isProtected, setIsProtected] = useState(false);
  const [permissions, setPermissions] =
    useState<GroupPermissions>(defaultPermissions);
  const [quickbooksLink, setQuickbooksLink] = useState(
    defaultQuickBooksLink.quickbooksLink
  );

  const handlePermissionChange = (
    permissionKey: keyof GroupPermissions,
    action: keyof Permission
  ) => {
    setPermissions((prev) => ({
      ...prev,
      [permissionKey]: {
        ...(prev[permissionKey] as Permission),
        [action]: !prev[permissionKey][action],
      },
    }));
  };

  const handleQuickbooksLinkChange = () => {
    setQuickbooksLink((prev) => !prev);
  };

  const grantAllPermissions = () => {
    const allGrantedPermissions: GroupPermissions = Object.keys(
      defaultPermissions
    ).reduce((acc, key) => {
      const permission = defaultPermissions[key as keyof GroupPermissions];
      if (isPermission(permission)) {
        acc[key as keyof GroupPermissions] = {
          view: true,
          edit: true,
          create: true,
          delete: true,
        };
      }
      return acc;
    }, {} as GroupPermissions);

    setPermissions(allGrantedPermissions);
    setQuickbooksLink(true);
  };

  const handleSubmit = () => {
    const groupData = {
      groupName,
      groupColor,
      isProtected,
      permissions,
      quickbooksLink,
    };
    console.log("Group Created:", groupData);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Group Name:
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter group name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Group Color:
          </label>
          <input
            type="color"
            value={groupColor}
            onChange={(e) => setGroupColor(e.target.value)}
            className="mt-1 block w-full h-10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Protected Group:
          </label>
          <div className="flex items-center mt-1">
            <input
              type="radio"
              value="Yes"
              checked={isProtected === true}
              onChange={() => setIsProtected(true)}
              className="mr-2"
            />
            <span className="mr-4">Yes</span>
            <input
              type="radio"
              value="No"
              checked={isProtected === false}
              onChange={() => setIsProtected(false)}
              className="mr-2"
            />
            <span>No</span>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Group Permissions
      </h2>

      <div className="grid grid-cols-4 gap-6">
        {Object.keys(defaultPermissions).map((key) => (
          <div key={key}>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              {key.replace(/([A-Z])/g, " $1")}
            </h3>
            {isPermission(permissions[key as keyof GroupPermissions]) && (
              <>
                {(
                  ["view", "edit", "create", "delete"] as Array<
                    keyof Permission
                  >
                ).map((action) => (
                  <label
                    key={action}
                    className="flex items-center space-x-2 text-sm text-gray-600 mb-1"
                  >
                    <input
                      type="checkbox"
                      className="w-[2.5vw] md:w-[1vw] h-[2.5vw] md:h-[1vw] accent-purple-0 border-lightgray-0 rounded focus:ring-offset-white focus:ring-purple-0 cursor-pointer"
                      checked={
                        permissions[key as keyof GroupPermissions][action]
                      }
                      onChange={() =>
                        handlePermissionChange(
                          key as keyof GroupPermissions,
                          action
                        )
                      }
                    />
                    <span>
                      {action.charAt(0).toUpperCase() + action.slice(1)}
                    </span>
                  </label>
                ))}
              </>
            )}
          </div>
        ))}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            QuickBooks Link
          </h3>
          <label className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
            <input
              type="checkbox"
              className="w-[2.5vw] md:w-[1vw] h-[2.5vw] md:h-[1vw] accent-purple-0 border-lightgray-0 rounded focus:ring-offset-white focus:ring-purple-0 cursor-pointer"
              checked={quickbooksLink}
              onChange={handleQuickbooksLinkChange}
            />
            <span>Enable QuickBooks Link</span>
          </label>
        </div>
      </div>

      <div className="mt-[1.5vw] flex justify-between">
        <PurpleButton
          text="Grant All Permissions"
          onClick={grantAllPermissions}
        />
        <div className="flex flex-row items-center gap-[1vw]">
          <PurpleButton text="Create Group" onClick={handleSubmit} />
          <WhiteButton text="Cancel and Return" />
        </div>
      </div>
    </div>
  );
};

export default AddUserGroup;
