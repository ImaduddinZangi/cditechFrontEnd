import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserGroup } from "../features/userGroupSlice";

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

export const userGroupApi = createApi({
  reducerPath: "userGroupApi",
  baseQuery,
  tagTypes: ["UserGroup"], // Add tagTypes for caching user groups
  endpoints: (builder) => ({
    getUserGroups: builder.query<UserGroup[], void>({
      query: () => ({
        url: "user-groups",
        method: "GET",
      }),
      providesTags: ["UserGroup"], // Provide tags for user group list
    }),
    getUserGroupById: builder.query<UserGroup, string>({
      query: (userGroupId: string) => ({
        url: `user-groups/${userGroupId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "UserGroup", id }], // Provide tags for a specific user group
    }),
    createUserGroup: builder.mutation<UserGroup, Partial<UserGroup>>({
      query: (newUserGroup) => ({
        url: "user-groups",
        method: "POST",
        body: newUserGroup,
      }),
      invalidatesTags: ["UserGroup"], // Invalidate user group list after creation
    }),
    updateUserGroup: builder.mutation<UserGroup, Partial<UserGroup>>({
      query: ({ id, ...rest }) => ({
        url: `user-groups/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "UserGroup", id }], // Invalidate the specific user group after update
    }),
    deleteUserGroup: builder.mutation<{ success: boolean }, string>({
      query: (userGroupId: string) => ({
        url: `user-groups/${userGroupId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "UserGroup", id }], // Invalidate the specific user group after deletion
    }),
  }),
});

export const {
  useGetUserGroupsQuery,
  useGetUserGroupByIdQuery,
  useCreateUserGroupMutation,
  useUpdateUserGroupMutation,
  useDeleteUserGroupMutation,
} = userGroupApi;

export default userGroupApi;
