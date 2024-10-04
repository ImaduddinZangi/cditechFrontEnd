import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { InspectionReport } from "../features/inspectionReportsSlice";

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

export const inspectionReportsApi = createApi({
  reducerPath: "inspectionReportsApi",
  baseQuery,
  tagTypes: ["Report"], // Add tagTypes for caching
  endpoints: (builder) => ({
    generateReport: builder.mutation<
      InspectionReport,
      { file: File; inspectionId: string; clientId: string }
    >({
      query: ({ file, inspectionId, clientId }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `reports/upload/${clientId}/${inspectionId}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { inspectionId }) => [
        { type: "Report", id: inspectionId },
      ], // Invalidate cache after report generation
    }),
    deleteReport: builder.mutation<
      { success: boolean },
      { inspectionId: string; clientId: string }
    >({
      query: ({ inspectionId, clientId }) => ({
        url: `reports/delete/${clientId}/${inspectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { inspectionId }) => [
        { type: "Report", id: inspectionId },
      ], // Invalidate cache after report deletion
    }),
  }),
});

export const { useGenerateReportMutation, useDeleteReportMutation } =
  inspectionReportsApi;

export default inspectionReportsApi;
