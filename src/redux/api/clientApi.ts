import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Client } from "../features/clientSlice";

interface ClientListResponse {
  clients: Client[];
}

interface QuickBookSignUpLinkResponse {
  url: string;
  state: string;
}

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

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery,
  tagTypes: ["Client"], // Add tagTypes for caching
  endpoints: (builder) => ({
    getClients: builder.query<ClientListResponse, void>({
      query: () => ({
        url: "clients",
        method: "GET",
      }),
      providesTags: ["Client"], // Provide tags for client list
    }),
    getClientById: builder.query<Client, string>({
      query: (clientId: string) => ({
        url: `clients/${clientId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Client", id }], // Provide tags for a specific client
    }),
    getQuickBookSignUpLink: builder.query<QuickBookSignUpLinkResponse, void>({
      query: () => ({
        url: `clients/quickbooks/authorize`,
        method: "GET",
      }),
      providesTags: ["Client"], // Provide tags for quickbook signup
    }),
    createClient: builder.mutation<Client, Partial<Client>>({
      query: (newClient) => ({
        url: "clients",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["Client"], // Invalidate client list after creation
    }),
    updateClient: builder.mutation<Client, Partial<Client>>({
      query: ({ id, ...rest }) => ({
        url: `clients/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Client", id }], // Invalidate specific client after update
    }),
    deleteClient: builder.mutation<{ success: boolean }, string>({
      query: (clientId: string) => ({
        url: `clients/${clientId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Client", id }], // Invalidate specific client after deletion
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useGetQuickBookSignUpLinkQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;

export default clientApi;
