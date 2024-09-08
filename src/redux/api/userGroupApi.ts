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
  endpoints: (builder) => ({
    getUserGroups: builder.query<UserGroup[], void>({
      query: () => ({
        url: "user-groups",
        method: "GET",
      }),
    }),
    getUserGroupById: builder.query<UserGroup, string>({
      query: (userGroupId: string) => ({
        url: `user-groups/${userGroupId}`,
        method: "GET",
      }),
    }),
    createUserGroup: builder.mutation<UserGroup, Partial<UserGroup>>({
      query: (newUserGroup) => ({
        url: "user-groups",
        method: "POST",
        body: newUserGroup,
      }),
    }),
    updateUserGroup: builder.mutation<UserGroup, Partial<UserGroup>>({
      query: ({ id, ...rest }) => ({
        url: `user-groups/${id}`,
        method: "PATCH",
        body: rest,
      }),
    }),
    deleteUserGroup: builder.mutation<{ success: boolean }, string>({
      query: (userGroupId: string) => ({
        url: `user-groups/${userGroupId}`,
        method: "DELETE",
      }),
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
