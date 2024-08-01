import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PumpBrand } from "../features/pumpBrandSlice";

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

export const pumpBrandApi = createApi({
  reducerPath: "pumpBrandApi",
  baseQuery,
  endpoints: (builder) => ({
    getPumpBrands: builder.query<PumpBrand[], void>({
      query: () => ({
        url: "pump-brands",
        method: "GET",
      }),
    }),
    getPumpBrandById: builder.query<PumpBrand, string>({
      query: (PumpBrandId: string) => ({
        url: `pump-brands/${PumpBrandId}`,
        method: "GET",
      }),
    }),
    createPumpBrand: builder.mutation<PumpBrand, Partial<PumpBrand>>({
      query: (newPumpBrand) => ({
        url: "pump-brands",
        method: "POST",
        body: newPumpBrand,
      }),
    }),
    updatePumpBrand: builder.mutation<PumpBrand, Partial<PumpBrand>>({
      query: ({ id, ...rest }) => ({
        url: `pump-brands/${id}`,
        method: "PATCH",
        body: rest,
      }),
    }),
    deletePumpBrand: builder.mutation<{ success: boolean }, string>({
      query: (PumpBrandId: string) => ({
        url: `pump-brands/${PumpBrandId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPumpBrandsQuery,
  useGetPumpBrandByIdQuery,
  useCreatePumpBrandMutation,
  useUpdatePumpBrandMutation,
  useDeletePumpBrandMutation,
} = pumpBrandApi;

export default pumpBrandApi;
