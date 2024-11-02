import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Package } from "../features/packagesSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers: Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const packagesApi = createApi({
  reducerPath: "packagesApi",
  baseQuery,
  tagTypes: ["Package"],
  endpoints: (builder) => ({
    getPackages: builder.query<Package[], void>({
      query: () => ({
        url: "packages",
        method: "GET",
      }),
      providesTags: ["Package"],
    }),
    getPackageById: builder.query<Package, string>({
      query: (packageId: string) => ({
        url: `packages/${packageId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Package", id }],
    }),
    updatePackage: builder.mutation<Package, Partial<Package>>({
      query: ({ id, ...rest }) => ({
        url: `packages/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Package", id }],
    }),
    deletePackage: builder.mutation<{ success: boolean }, string>({
      query: (packageId: string) => ({
        url: `packages/${packageId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Package", id }],
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useGetPackageByIdQuery,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packagesApi;

export default packagesApi;
