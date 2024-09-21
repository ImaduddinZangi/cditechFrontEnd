// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useGetGroupPermissionsQuery } from "../../../redux/api/groupPermissionsApi";

// interface InternalPermission {
//   id: string;
//   resource: string;
//   actions: {
//     create: boolean;
//     view: boolean;
//     edit: boolean;
//     delete: boolean;
//   };
// }

// interface EditGroupPermissionsProps {
//   onSubmit: (data: { resource: string; actions: string[] }) => void;
// }

// const EditGroupPermissions: React.FC<EditGroupPermissionsProps> = ({ onSubmit }) => {
//   const { groupId, permissionId } = useParams<{ groupId: string; permissionId: string }>();
//   const { data: permissionsData } = useGetGroupPermissionsQuery(groupId || "");

//   const [permission, setPermission] = useState<InternalPermission | null>(null);

//   useEffect(() => {
//     if (permissionsData && permissionId) {
//       const currentPermission = permissionsData.find((p) => p.id === permissionId);
//       if (currentPermission) {
//         setPermission({
//           id: currentPermission.id,
//           resource: currentPermission.permissionName,
//           actions: {
//             create: currentPermission.canCreate,
//             view: currentPermission.canView,
//             edit: currentPermission.canEdit,
//             delete: currentPermission.canDelete,
//           },
//         });
//       }
//     }
//   }, [permissionsData, permissionId]);

//   const handleCheckboxChange = (action: keyof InternalPermission["actions"]) => {
//     if (permission) {
//       setPermission((prevPermission) => {
//         if (prevPermission) {
//           return {
//             ...prevPermission,
//             actions: {
//               ...prevPermission.actions,
//               [action]: !prevPermission.actions[action],
//             },
//           };
//         }
//         return null;
//       });
//     }
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (permission) {
//       const allowedActions = Object.entries(permission.actions)
//         .filter(([_, isAllowed]) => isAllowed)
//         .map(([action]) => action);
//       onSubmit({ resource: permission.resource, actions: allowedActions });
//     }
//   };

//   if (!permission) {
//     return <p>Loading permission data...</p>;
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-[2vw]">
//       <div>
//         <p className="text-[1vw] text-darkgray-0 font-semibold font-inter mb-[1vw]">
//           {permission.resource.charAt(0).toUpperCase() + permission.resource.slice(1)}
//         </p>
//         {["create", "view", "edit", "delete"].map((action) => (
//           <label
//             key={action}
//             className="flex items-center space-x-2 text-darkgray-0 font-medium text-[1vw] mb-[0.4vw]"
//           >
//             <input
//               type="checkbox"
//               className="w-[2.5vw] md:w-[1vw] h-[2.5vw] md:h-[1vw] accent-purple-0 border-lightgray-0 rounded focus:ring-offset-white focus:ring-purple-0 cursor-pointer"
//               checked={permission.actions[action as keyof InternalPermission["actions"]]}
//               onChange={() => handleCheckboxChange(action as keyof InternalPermission["actions"])}
//             />
//             <span>{action.charAt(0).toUpperCase() + action.slice(1)}</span>
//           </label>
//         ))}
//       </div>
//       <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded">
//         Update Permission
//       </button>
//     </form>
//   );
// };

// export default EditGroupPermissions;
