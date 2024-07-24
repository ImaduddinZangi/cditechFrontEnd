import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AssetType } from "../features/assetTypeSlice";

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

export const assetTypeApi = createApi({
  reducerPath: "assetTypeApi",
  baseQuery,
  endpoints: (builder) => ({
    getAssetTypes: builder.query<AssetType[], void>({
      query: () => ({
        url: "asset-types",
        method: "GET",
      }),
    }),
    getAssetTypeById: builder.query<AssetType, string>({
      query: (assetTypeId: string) => ({
        url: `asset-types/${assetTypeId}`,
        method: "GET",
      }),
    }),
    createAssetType: builder.mutation<AssetType, Partial<AssetType>>({
      query: (newAssetType) => ({
        url: "asset-types",
        method: "POST",
        body: newAssetType,
      }),
    }),
    updateAssetType: builder.mutation<AssetType, Partial<AssetType>>({
      query: ({ id, ...rest }) => ({
        url: `asset-types/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteAssetType: builder.mutation<{ success: boolean }, string>({
      query: (assetTypeId: string) => ({
        url: `asset-types/${assetTypeId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAssetTypesQuery,
  useGetAssetTypeByIdQuery,
  useCreateAssetTypeMutation,
  useUpdateAssetTypeMutation,
  useDeleteAssetTypeMutation,
} = assetTypeApi;

export default assetTypeApi;
