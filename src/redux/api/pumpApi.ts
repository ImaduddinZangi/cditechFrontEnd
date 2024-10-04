import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pump } from "../features/pumpSlice";

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

export const pumpApi = createApi({
  reducerPath: "pumpApi",
  baseQuery,
  tagTypes: ["Pump"], // Add tagTypes for caching
  endpoints: (builder) => ({
    getPumps: builder.query<Pump[], void>({
      query: () => ({
        url: "pumps",
        method: "GET",
      }),
      providesTags: ["Pump"], // Provide tags for the pump list
    }),
    getPumpById: builder.query<Pump, string>({
      query: (PumpId: string) => ({
        url: `pumps/${PumpId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Pump", id }], // Provide tags for a specific pump
    }),
    createPump: builder.mutation<Pump, Partial<Pump>>({
      query: (newPump) => ({
        url: "pumps",
        method: "POST",
        body: newPump,
      }),
      invalidatesTags: ["Pump"], // Invalidate the pump list after creation
    }),
    updatePump: builder.mutation<Pump, Partial<Pump>>({
      query: ({ id, ...rest }) => ({
        url: `pumps/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Pump", id }], // Invalidate the specific pump after update
    }),
    deletePump: builder.mutation<{ success: boolean }, string>({
      query: (PumpId: string) => ({
        url: `pumps/${PumpId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Pump", id }], // Invalidate the specific pump after deletion
    }),
  }),
});

export const {
  useGetPumpsQuery,
  useGetPumpByIdQuery,
  useCreatePumpMutation,
  useUpdatePumpMutation,
  useDeletePumpMutation,
} = pumpApi;

export default pumpApi;
