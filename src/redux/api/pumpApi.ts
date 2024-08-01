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
  endpoints: (builder) => ({
    getPumps: builder.query<Pump[], void>({
      query: () => ({
        url: "pumps",
        method: "GET",
      }),
    }),
    getPumpById: builder.query<Pump, string>({
      query: (PumpId: string) => ({
        url: `pumps/${PumpId}`,
        method: "GET",
      }),
    }),
    createPump: builder.mutation<Pump, Partial<Pump>>({
      query: (newPump) => ({
        url: "pumps",
        method: "POST",
        body: newPump,
      }),
    }),
    updatePump: builder.mutation<Pump, Partial<Pump>>({
      query: ({ id, ...rest }) => ({
        url: `pumps/${id}`,
        method: "PATCH",
        body: rest,
      }),
    }),
    deletePump: builder.mutation<{ success: boolean }, string>({
      query: (PumpId: string) => ({
        url: `pumps/${PumpId}`,
        method: "DELETE",
      }),
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
