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
  tagTypes: ["ClientUser"], // Add tagTypes for caching
  endpoints: (builder) => ({
    getClientUsers: builder.query<ClientUser[], void>({
      query: () => ({
        url: "users/client/associated",
        method: "GET",
      }),
      providesTags: ["ClientUser"], // Provide tags for client users
    }),
    getClientUserById: builder.query<ClientUser, string>({
      query: (clientUserId: string) => ({
        url: `users/${clientUserId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "ClientUser", id }], // Provide tags for specific client user
    }),
    createClientUser: builder.mutation<ClientUser, Partial<ClientUser>>({
      query: (newClientUser) => ({
        url: "users/add",
        method: "POST",
        body: newClientUser,
      }),
      invalidatesTags: ["ClientUser"], // Invalidate client users list after creation
    }),
    updateClientUser: builder.mutation<ClientUser, Partial<ClientUser>>({
      query: ({ id, ...rest }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "ClientUser", id }], // Invalidate specific client user after update
    }),
    deleteClientUser: builder.mutation<{ success: boolean }, string>({
      query: (clientUserId: string) => ({
        url: `users/${clientUserId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "ClientUser", id }], // Invalidate specific client user after deletion
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
