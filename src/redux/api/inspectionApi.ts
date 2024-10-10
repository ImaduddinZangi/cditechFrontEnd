import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateInspection, Inspection } from "../features/inspectionSlice";

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
  tagTypes: ["Inspection"],
  endpoints: (builder) => ({
    getInspections: builder.query<Inspection[], void>({
      query: () => ({
        url: "inspections",
        method: "GET",
      }),
      providesTags: ["Inspection"],
    }),
    getInspectionById: builder.query<Inspection, string>({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Inspection", id }],
    }),
    createInspection: builder.mutation<Inspection, Partial<CreateInspection>>({
      query: (newInspection) => ({
        url: "inspections",
        method: "POST",
        body: newInspection,
      }),
      invalidatesTags: ["Inspection"],
    }),
    updateInspection: builder.mutation<Inspection, Partial<CreateInspection>>({
      query: ({ id, ...rest }) => ({
        url: `inspections/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Inspection", id },
      ],
    }),
    deleteInspection: builder.mutation<{ success: boolean }, string>({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Inspection", id }],
    }),
    markInspectionCompleteAndBill: builder.mutation<
      { success: boolean },
      string
    >({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}/complete-and-bill`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Inspection", id }],
    }),
    markInspectionCompleteWithoutBilling: builder.mutation<
      { success: boolean },
      string
    >({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}/complete-without-billing`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Inspection", id }],
    }),
    markInspectionSubmitAndBill: builder.mutation<{ success: boolean }, string>(
      {
        query: (inspectionId: string) => ({
          url: `inspections/${inspectionId}/submit-bill`,
          method: "POST",
        }),
        invalidatesTags: (_result, _error, id) => [{ type: "Inspection", id }],
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
      invalidatesTags: (_result, _error, id) => [{ type: "Inspection", id }],
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
      ],
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
