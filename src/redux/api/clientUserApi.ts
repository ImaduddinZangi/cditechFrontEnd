import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ClientUser, GetClientUser } from "../features/clientUserSlice";

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
  tagTypes: ["ClientUser"],
  endpoints: (builder) => ({
    getClientUsers: builder.query<GetClientUser[], void>({
      query: () => ({
        url: "users/client/associated",
        method: "GET",
      }),
      providesTags: ["ClientUser"],
    }),
    getClientUserById: builder.query<ClientUser, string>({
      query: (clientUserId: string) => ({
        url: `users/${clientUserId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "ClientUser", id }],
    }),
    createClientUser: builder.mutation<ClientUser, Partial<ClientUser>>({
      query: (newClientUser) => ({
        url: "users/add",
        method: "POST",
        body: newClientUser,
      }),
      invalidatesTags: ["ClientUser"],
    }),
    updateClientUser: builder.mutation<ClientUser, Partial<ClientUser>>({
      query: ({ id, ...rest }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "ClientUser", id }],
    }),
    deleteClientUser: builder.mutation<{ success: boolean }, string>({
      query: (clientUserId: string) => ({
        url: `users/${clientUserId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "ClientUser", id }],
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
