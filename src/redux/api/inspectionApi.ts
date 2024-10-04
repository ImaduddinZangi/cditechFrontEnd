import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetInspection, Inspection } from "../features/inspectionSlice";

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

export const inspectionApi = createApi({
  reducerPath: "inspectionApi",
  baseQuery,
  tagTypes: ["Inspection"], // Add tagTypes for caching
  endpoints: (builder) => ({
    getInspections: builder.query<GetInspection[], void>({
      query: () => ({
        url: "inspections",
        method: "GET",
      }),
      providesTags: ["Inspection"], // Provide tags for inspection list
    }),
    getInspectionById: builder.query<GetInspection, string>({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Inspection", id }], // Provide tags for specific inspection
    }),
    createInspection: builder.mutation<Inspection, Partial<Inspection>>({
      query: (newInspection) => ({
        url: "inspections",
        method: "POST",
        body: newInspection,
      }),
      invalidatesTags: ["Inspection"], // Invalidate inspections list after creation
    }),
    updateInspection: builder.mutation<Inspection, Partial<Inspection>>({
      query: ({ id, ...rest }) => ({
        url: `inspections/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Inspection", id },
      ], // Invalidate specific inspection after update
    }),
    deleteInspection: builder.mutation<{ success: boolean }, string>({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Inspection", id }], // Invalidate specific inspection after deletion
    }),
    markInspectionCompleteAndBill: builder.mutation<
      { success: boolean },
      string
    >({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}/complete-and-bill`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Inspection", id }], // Invalidate specific inspection after marking complete and billing
    }),
    markInspectionCompleteWithoutBilling: builder.mutation<
      { success: boolean },
      string
    >({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}/complete-without-billing`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Inspection", id }], // Invalidate specific inspection after marking complete without billing
    }),
    markInspectionSubmitAndBill: builder.mutation<{ success: boolean }, string>(
      {
        query: (inspectionId: string) => ({
          url: `inspections/${inspectionId}/submit-bill`,
          method: "POST",
        }),
        invalidatesTags: (_result, _error, id) => [{ type: "Inspection", id }], // Invalidate specific inspection after submitting and billing
      }
    ),
    markInspectionSubmitWithoutBilling: builder.mutation<
      { success: boolean },
      string
    >({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}/submit-dont-bill`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Inspection", id }], // Invalidate specific inspection after submitting without billing
    }),
    addToExistingInvoice: builder.mutation<
      { success: boolean },
      { inspectionId: string; invoiceId: string | undefined }
    >({
      query: ({ inspectionId, invoiceId }) => ({
        url: `inspections/${inspectionId}/add-to-existing-invoice`,
        method: "POST",
        body: { invoiceId },
      }),
      invalidatesTags: (_result, _error, { inspectionId }) => [
        { type: "Inspection", id: inspectionId },
      ], // Use the inspectionId as the tag invalidation id
    }),
  }),
});

export const {
  useGetInspectionsQuery,
  useGetInspectionByIdQuery,
  useCreateInspectionMutation,
  useUpdateInspectionMutation,
  useDeleteInspectionMutation,
  useMarkInspectionCompleteAndBillMutation,
  useMarkInspectionCompleteWithoutBillingMutation,
  useMarkInspectionSubmitAndBillMutation,
  useMarkInspectionSubmitWithoutBillingMutation,
  useAddToExistingInvoiceMutation,
} = inspectionApi;

export default inspectionApi;
