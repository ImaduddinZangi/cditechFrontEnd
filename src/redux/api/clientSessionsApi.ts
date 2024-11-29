import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ClientSessions } from "../features/clientSessionsSlice";

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

export const clientSessionsApi = createApi({
  reducerPath: "clientSessionsApi",
  baseQuery,
  tagTypes: ["ClientSessions"],
  endpoints: (builder) => ({
    getClientSessions: builder.query<ClientSessions[], void>({
      query: () => ({
        url: "sessions",
        method: "GET",
      }),
      providesTags: ["ClientSessions"],
    }),
    getClientSessionsById: builder.query<ClientSessions, string>({
      query: (clientSessionsId: string) => ({
        url: `sessions/${clientSessionsId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "ClientSessions", id }],
    }),
    createClientSessions: builder.mutation<ClientSessions, Partial<ClientSessions>>({
      query: (newClientSessions) => ({
        url: "sessions",
        method: "POST",
        body: newClientSessions,
      }),
      invalidatesTags: ["ClientSessions"],
    }),
    updateClientSessions: builder.mutation<ClientSessions, Partial<ClientSessions>>({
      query: ({ id, ...rest }) => ({
        url: `sessions/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "ClientSessions", id }],
    }),
    deleteClientSessions: builder.mutation<{ success: boolean }, string>({
      query: (clientSessionsId: string) => ({
        url: `sessions/${clientSessionsId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "ClientSessions", id }],
    }),
  }),
});

export const {
  useGetClientSessionsQuery,
  useGetClientSessionsByIdQuery,
  useCreateClientSessionsMutation,
  useUpdateClientSessionsMutation,
  useDeleteClientSessionsMutation,
} = clientSessionsApi;

export default clientSessionsApi;
