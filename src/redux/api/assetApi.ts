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
  endpoints: (builder) => ({
    getAssets: builder.query<Asset[], void>({
      query: () => ({
        url: "assets",
        method: "GET",
      }),
    }),
    getAssetById: builder.query<Asset, string>({
      query: (assetId: string) => ({
        url: `assets/${assetId}`,
        method: "GET",
      }),
    }),
    createAsset: builder.mutation<Asset, Partial<Asset>>({
      query: (newAsset) => ({
        url: "assets",
        method: "POST",
        body: newAsset,
      }),
    }),
    updateAsset: builder.mutation<Asset, Partial<Asset>>({
      query: ({ id, ...rest }) => ({
        url: `assets/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteAsset: builder.mutation<{ success: boolean }, string>({
      query: (assetId: string) => ({
        url: `assets/${assetId}`,
        method: "DELETE",
      }),
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
