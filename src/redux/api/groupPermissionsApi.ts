import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Permission } from "../features/groupPermissionsSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers: Headers, {}: { getState: () => any }) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const groupPermissionsApi = createApi({
  reducerPath: "groupPermissionsApi",
  baseQuery,
  endpoints: (builder) => ({
    getGroupPermissions: builder.query<Permission[], string>({
      query: (groupId) => ({
        url: `user-groups/${groupId}/permissions`,
        method: "GET",
      }),
    }),
    updateGroupPermission: builder.mutation<Permission, { groupId: string | undefined; permissionId: string | undefined; permissionData: Partial<Permission> }>({
      query: ({ groupId, permissionId, permissionData }) => ({
        url: `user-groups/${groupId}/permissions/${permissionId}`,
        method: "PATCH",
        body: permissionData,
      }),
    }),
    assignCustomPermissions: builder.mutation<Permission[], { groupId: string; permissions: Permission[] }>({
      query: ({ groupId, permissions }) => ({
        url: `user-groups/${groupId}/permissions/custom-assign`,
        method: "POST",
        body: { permissions },
      }),
    }),
  }),
});

export const {
  useGetGroupPermissionsQuery,
  useUpdateGroupPermissionMutation,
  useAssignCustomPermissionsMutation,
} = groupPermissionsApi;

export default groupPermissionsApi;
