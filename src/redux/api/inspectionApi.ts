import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Inspection, EditInspection, SubmitInvoice, SubmitExistingInvoice } from "../features/inspectionSlice";

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
    createInspection: builder.mutation<Inspection, FormData>({
      query: (formData) => ({
        url: "inspections",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Inspection"],
    }),
    updateInspection: builder.mutation<Inspection, Partial<EditInspection>>({
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
    markInspectionBegin: builder.mutation<{ success: boolean }, string>({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}/begin`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Inspection", id }],
    }),
    markInspectionCompleteAndBill: builder.mutation<{ success: boolean }, string>({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}/complete-and-bill`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Inspection", id }],
    }),
    markInspectionCompleteWithoutBilling: builder.mutation<{ success: boolean }, string>({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}/complete-without-billing`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Inspection", id }],
    }),
    markInspectionSubmitAndBill: builder.mutation<{ success: boolean }, SubmitInvoice>({
      query: (body: SubmitInvoice) => ({
        url: `inspections/${body.inspectionId}/submit-bill`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { inspectionId }) => [{ type: "Inspection", id: inspectionId }],
    }),
    markInspectionSubmitWithoutBilling: builder.mutation<{ success: boolean }, SubmitInvoice>({
      query: (body: SubmitInvoice) => ({
        url: `inspections/${body.inspectionId}/submit-dont-bill`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { inspectionId }) => [{ type: "Inspection", id: inspectionId }],
    }),
    addToExistingInvoice: builder.mutation<{ success: boolean }, SubmitExistingInvoice>({
      query: (body: SubmitExistingInvoice) => ({
        url: `inspections/${body.inspectionId}/add-to-existing-invoice`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { inspectionId }) => [{ type: "Inspection", id: inspectionId }],
    }),
  }),
});

export const {
  useGetInspectionsQuery,
  useGetInspectionByIdQuery,
  useCreateInspectionMutation,
  useUpdateInspectionMutation,
  useDeleteInspectionMutation,
  useMarkInspectionBeginMutation,
  useMarkInspectionCompleteAndBillMutation,
  useMarkInspectionCompleteWithoutBillingMutation,
  useMarkInspectionSubmitAndBillMutation,
  useMarkInspectionSubmitWithoutBillingMutation,
  useAddToExistingInvoiceMutation,
} = inspectionApi;

export default inspectionApi;
