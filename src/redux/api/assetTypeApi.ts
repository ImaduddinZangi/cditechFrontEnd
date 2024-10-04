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
  tagTypes: ["AssetType"], // Add tagTypes for caching
  endpoints: (builder) => ({
    getAssetTypes: builder.query<AssetType[], void>({
      query: () => ({
        url: "asset-types",
        method: "GET",
      }),
      providesTags: ["AssetType"], // Provide tags for asset types
    }),
    getAssetTypeById: builder.query<AssetType, string>({
      query: (assetTypeId: string) => ({
        url: `asset-types/${assetTypeId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "AssetType", id }], // Provide tags for specific asset type
    }),
    createAssetType: builder.mutation<AssetType, Partial<AssetType>>({
      query: (newAssetType) => ({
        url: "asset-types",
        method: "POST",
        body: newAssetType,
      }),
      invalidatesTags: ["AssetType"], // Invalidate asset type list after creation
    }),
    updateAssetType: builder.mutation<AssetType, Partial<AssetType>>({
      query: ({ id, ...rest }) => ({
        url: `asset-types/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "AssetType", id }], // Invalidate specific asset type after update
    }),
    deleteAssetType: builder.mutation<{ success: boolean }, string>({
      query: (assetTypeId: string) => ({
        url: `asset-types/${assetTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "AssetType", id }], // Invalidate specific asset type after deletion
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
