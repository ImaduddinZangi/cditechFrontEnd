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
  endpoints: (builder) => ({
    getClients: builder.query<ClientListResponse, void>({
      query: () => ({
        url: "clients",
        method: "GET",
      }),
    }),
    getClientById: builder.query<Client, string>({
      query: (clientId: string) => ({
        url: `clients/${clientId}`,
        method: "GET",
      }),
    }),
    getQuickBookSignUpLink: builder.query<QuickBookSignUpLinkResponse, void>({
      query: () => ({
        url: `clients/quickbooks/authorize`,
        method: "GET",
      }),
    }),
    createClient: builder.mutation<Client, Partial<Client>>({
      query: (newClient) => ({
        url: "clients",
        method: "POST",
        body: newClient,
      }),
    }),
    updateClient: builder.mutation<Client, Partial<Client>>({
      query: ({ id, ...rest }) => ({
        url: `clients/${id}`,
        method: "PATCH",
        body: rest,
      }),
    }),
    deleteClient: builder.mutation<{ success: boolean }, string>({
      query: (clientId: string) => ({
        url: `clients/${clientId}`,
        method: "DELETE",
      }),
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