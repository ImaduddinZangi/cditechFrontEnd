import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ClientUser } from "../features/clientUserSlice";

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

export const clientUserApi = createApi({
  reducerPath: "clientUserApi",
  baseQuery,
  endpoints: (builder) => ({
    getClientUsers: builder.query<ClientUser[], void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
    }),
    getClientUserById: builder.query<ClientUser, string>({
      query: (clientUserId: string) => ({
        url: `users/${clientUserId}`,
        method: "GET",
      }),
    }),
    createClientUser: builder.mutation<ClientUser, Partial<ClientUser>>({
      query: (newClientUser) => ({
        url: "users/add",
        method: "POST",
        body: newClientUser,
      }),
    }),
    updateClientUser: builder.mutation<ClientUser, Partial<ClientUser>>({
      query: ({ id, ...rest }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: rest,
      }),
    }),
    deleteClientUser: builder.mutation<{ success: boolean }, string>({
      query: (clientUserId: string) => ({
        url: `users/${clientUserId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetClientUsersQuery,
  useGetClientUserByIdQuery,
  useCreateClientUserMutation,
  useUpdateClientUserMutation,
  useDeleteClientUserMutation,
} = clientUserApi;

export default clientUserApi;
