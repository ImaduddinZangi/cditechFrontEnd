import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Asset } from "../features/assetSlice";

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

export const assetApi = createApi({
  reducerPath: "assetApi",
  baseQuery,
  tagTypes: ["Asset"],
  endpoints: (builder) => ({
    getAssets: builder.query<Asset[], void>({
      query: () => ({
        url: "assets",
        method: "GET",
      }),
      providesTags: ["Asset"],
    }),
    getAssetById: builder.query<Asset, string>({
      query: (assetId: string) => ({
        url: `assets/${assetId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Asset", id }],
    }),
    createAsset: builder.mutation<Asset, FormData>({
      query: (formData) => ({
        url: "assets",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Asset"],
    }),
    updateAsset: builder.mutation<
      Asset,
      { id: string | undefined; formData: FormData }
    >({
      query: ({ id, ...formData }) => ({
        url: `assets/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Asset", id }],
    }),
    deleteAsset: builder.mutation<{ success: boolean }, string>({
      query: (assetId: string) => ({
        url: `assets/${assetId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Asset", id }],
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useGetAssetByIdQuery,
  useCreateAssetMutation,
  useUpdateAssetMutation,
  useDeleteAssetMutation,
} = assetApi;

export default assetApi;
