import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ClientLogs } from "../features/clientLogsSlice";

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

export const clientLogsApi = createApi({
  reducerPath: "clientLogsApi",
  baseQuery,
  tagTypes: ["ClientLogs"],
  endpoints: (builder) => ({
    getClientLogs: builder.query<ClientLogs[], void>({
      query: () => ({
        url: "logs",
        method: "GET",
      }),
      providesTags: ["ClientLogs"],
    }),
    getClientLogsById: builder.query<ClientLogs, string>({
      query: (ClientLogsId: string) => ({
        url: `logs/${ClientLogsId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "ClientLogs", id }],
    }),
    createClientLogs: builder.mutation<ClientLogs, Partial<ClientLogs>>({
      query: (newClientLogs) => ({
        url: "logs",
        method: "POST",
        body: newClientLogs,
      }),
      invalidatesTags: ["ClientLogs"],
    }),
    updateClientLogs: builder.mutation<ClientLogs, Partial<ClientLogs>>({
      query: ({ id, ...rest }) => ({
        url: `logs/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "ClientLogs", id }],
    }),
    deleteClientLogs: builder.mutation<{ success: boolean }, string>({
      query: (ClientLogsId: string) => ({
        url: `logs/${ClientLogsId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "ClientLogs", id }],
    }),
  }),
});

export const {
  useGetClientLogsQuery,
  useGetClientLogsByIdQuery,
  useCreateClientLogsMutation,
  useUpdateClientLogsMutation,
  useDeleteClientLogsMutation,
} = clientLogsApi;

export default clientLogsApi;
