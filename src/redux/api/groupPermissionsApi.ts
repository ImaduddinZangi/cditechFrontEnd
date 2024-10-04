import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GroupPermissionResponse,
  Permission,
} from "../features/groupPermissionsSlice";

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
  tagTypes: ["GroupPermission"], // Add tagTypes for caching
  endpoints: (builder) => ({
    getGroupPermissions: builder.query<GroupPermissionResponse[], string>({
      query: (groupId) => ({
        url: `user-groups/${groupId}/permissions`,
        method: "GET",
      }),
      providesTags: (_result, _error, groupId) => [
        { type: "GroupPermission", id: groupId },
      ], // Provide tags for group permissions
    }),
    updateGroupPermission: builder.mutation<
      Permission,
      {
        groupId: string | undefined;
        permissionId: string | undefined;
        permissionData: Partial<Permission>;
      }
    >({
      query: ({ groupId, permissionId, permissionData }) => ({
        url: `user-groups/${groupId}/permissions/${permissionId}`,
        method: "PATCH",
        body: permissionData,
      }),
      invalidatesTags: (_result, _error, { groupId }) => [
        { type: "GroupPermission", id: groupId },
      ], // Invalidate group permissions after update
    }),
    assignCustomPermissions: builder.mutation<
      Permission[],
      { groupId: string; permissions: Permission[] }
    >({
      query: ({ groupId, permissions }) => ({
        url: `user-groups/${groupId}/permissions/custom-assign`,
        method: "POST",
        body: { permissions },
      }),
      invalidatesTags: (_result, _error, { groupId }) => [
        { type: "GroupPermission", id: groupId },
      ], // Invalidate group permissions after assigning custom permissions
    }),
  }),
});

export const {
  useGetGroupPermissionsQuery,
  useUpdateGroupPermissionMutation,
  useAssignCustomPermissionsMutation,
} = groupPermissionsApi;

export default groupPermissionsApi;
