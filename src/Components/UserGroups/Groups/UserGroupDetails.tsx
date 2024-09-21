import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserGroupByIdQuery } from "../../../redux/api/userGroupApi";
import Loader from "../../Constants/Loader";
import PurpleButton from "../../Tags/PurpleButton";
import { useNavigate } from "react-router-dom";

const UserGroupDetails: React.FC = () => {
  const { userGroupId } = useParams<{ userGroupId: string }>();
  const {
    data: userGroup,
    error,
    isLoading,
  } = useGetUserGroupByIdQuery(userGroupId || "");
  const navigate = useNavigate();

  const handleEditPermission = (
    groupId: string | undefined,
    permissionId: string | undefined
  ) => {
    navigate(`/user-group-details/${groupId}/edit-permission/${permissionId}`);
  };

  if (isLoading)
    return (
      <div className="w-full h-[80vh]">
        <Loader />
      </div>
    );
  if (error) return <p>Error loading user group details</p>;

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
      {userGroup && (
        <div className="flex flex-col items-start space-y-[2vw]">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Group Name:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {userGroup.name}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Description:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {userGroup.description}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Default Admin Group:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {userGroup.isDefaultAdminGroup ? "Yes" : "No"}
              </p>
            </div>
          </div>
          {/* Display Permissions */}
          {userGroup.permissions && userGroup.permissions.length > 0 && (
            <div className="col-span-4 w-full">
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Permissions:
              </p>
              <ul className="ml-[1vw]">
                {userGroup.permissions.map((permission) => (
                  <li key={permission.id} className="mb-[1vw]">
                    <div className="flex flex-row justify-between items-center space-x-4">
                      <div>
                        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                          {permission.permissionName}
                        </p>
                        <div>
                          <p className="text-[1vw] text-gray-0 font-medium font-inter">
                            View: {permission.canView ? "Yes" : "No"}
                          </p>
                          <p className="text-[1vw] text-gray-0 font-medium font-inter">
                            Edit: {permission.canEdit ? "Yes" : "No"}
                          </p>
                          <p className="text-[1vw] text-gray-0 font-medium font-inter">
                            Create: {permission.canCreate ? "Yes" : "No"}
                          </p>
                          <p className="text-[1vw] text-gray-0 font-medium font-inter">
                            Delete: {permission.canDelete ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                      <PurpleButton
                        text="Edit Permission"
                        onClick={() =>
                          handleEditPermission(userGroupId, permission.id)
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserGroupDetails;
