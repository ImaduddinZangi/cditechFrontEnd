import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserId } from "../../utils/utils";

export interface UploadPhotoPayload {
  assetId?: string;
  pumpId?: string;
  pumpBrandId?: string;
  customerId?: string;
  clientId?: string;
  files: File;
}

interface Photo {
  id: string;
  url: string;
  assetId?: string;
  pumpId?: string;
  pumpBrandId?: string;
  customerId?: string;
  clientId?: string;
}

const clientId = getUserId();

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

export const uploadPhotosApi = createApi({
  reducerPath: "uploadPhotosApi",
  baseQuery,
  endpoints: (builder) => ({
    uploadPhoto: builder.mutation<{ success: boolean }, FormData>({
      query: (formData) => ({
        url: `photos/upload/${clientId}`,
        method: "POST",
        body: formData,
      }),
    }),
    getPhotos: builder.query<Photo[], void>({
      query: () => ({
        url: "photos",
        method: "GET",
      }),
    }),
  }),
});

export const { useUploadPhotoMutation, useGetPhotosQuery } = uploadPhotosApi;
export default uploadPhotosApi;
