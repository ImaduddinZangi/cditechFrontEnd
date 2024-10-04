import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Asset, CreateAsset } from "../features/assetSlice";

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
  tagTypes: ["Asset"], // Add tagTypes
  endpoints: (builder) => ({
    getAssets: builder.query<Asset[], void>({
      query: () => ({
        url: "assets",
        method: "GET",
      }),
      providesTags: ["Asset"], // Provides tags for caching
    }),
    getAssetById: builder.query<Asset, string>({
      query: (assetId: string) => ({
        url: `assets/${assetId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Asset", id }], // Provides tags for individual asset
    }),
    createAsset: builder.mutation<CreateAsset, Partial<CreateAsset>>({
      query: (newAsset) => ({
        url: "assets",
        method: "POST",
        body: newAsset,
      }),
      invalidatesTags: ["Asset"], // Invalidates list of assets after creation
    }),
    updateAsset: builder.mutation<CreateAsset, Partial<CreateAsset>>({
      query: ({ id, ...rest }) => ({
        url: `assets/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Asset", id }], // Invalidates specific asset after update
    }),
    deleteAsset: builder.mutation<{ success: boolean }, string>({
      query: (assetId: string) => ({
        url: `assets/${assetId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Asset", id }], // Invalidates specific asset after deletion
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
