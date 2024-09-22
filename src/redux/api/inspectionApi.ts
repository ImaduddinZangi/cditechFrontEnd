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
  endpoints: (builder) => ({
    getInspections: builder.query<GetInspection[], void>({
      query: () => ({
        url: "inspections",
        method: "GET",
      }),
    }),
    getInspectionById: builder.query<GetInspection, string>({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}`,
        method: "GET",
      }),
    }),
    createInspection: builder.mutation<Inspection, Partial<Inspection>>({
      query: (newInspection) => ({
        url: "inspections",
        method: "POST",
        body: newInspection,
      }),
    }),
    updateInspection: builder.mutation<Inspection, Partial<Inspection>>({
      query: ({ id, ...rest }) => ({
        url: `inspections/${id}`,
        method: "PATCH",
        body: rest,
      }),
    }),
    deleteInspection: builder.mutation<{ success: boolean }, string>({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}`,
        method: "DELETE",
      }),
    }),
    markInspectionCompleteAndBill: builder.mutation<{ success: boolean }, string>({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}/complete-and-bill`,
        method: "PATCH",
      }),
    }),
    markInspectionCompleteWithoutBilling: builder.mutation<{ success: boolean }, string>({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}/complete-without-billing`,
        method: "PATCH",
      }),
    }),
    markInspectionSubmitAndBill: builder.mutation<{ success: boolean }, string>({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}/submit-bill`,
        method: "POST",
      }),
    }),
    markInspectionSubmitWithoutBilling: builder.mutation<{ success: boolean }, string>({
      query: (inspectionId: string) => ({
        url: `inspections/${inspectionId}/submit-dont-bill`,
        method: "POST",
      }),
    }),
    addToExistingInvoice: builder.mutation<{ success: boolean }, { inspectionId: string; invoiceId: string | undefined }>({
      query: ({ inspectionId, invoiceId }) => ({
        url: `inspections/${inspectionId}/add-to-existing-invoice`,
        method: "POST",
        body: { invoiceId },
      }),
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
  useAddToExistingInvoiceMutation
} = inspectionApi;

export default inspectionApi;
