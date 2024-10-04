import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Invoice } from "../features/invoiceSlice";

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

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery,
  tagTypes: ["Invoice"], // Add tagTypes for caching
  endpoints: (builder) => ({
    getInvoices: builder.query<Invoice[], void>({
      query: () => ({
        url: "invoices",
        method: "GET",
      }),
      providesTags: ["Invoice"], // Provide tags for the invoice list
    }),
    getInvoiceById: builder.query<Invoice, string>({
      query: (invoiceId: string) => ({
        url: `invoices/${invoiceId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Invoice", id }], // Provide tags for a specific invoice
    }),
    createInvoice: builder.mutation<Invoice, Partial<Invoice>>({
      query: (newInvoice) => ({
        url: "invoices",
        method: "POST",
        body: newInvoice,
      }),
      invalidatesTags: ["Invoice"], // Invalidate the invoice list after creation
    }),
    updateInvoice: builder.mutation<Invoice, Partial<Invoice>>({
      query: ({ id, ...rest }) => ({
        url: `invoices/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Invoice", id }], // Invalidate the specific invoice after update
    }),
    deleteInvoice: builder.mutation<{ success: boolean }, string>({
      query: (invoiceId: string) => ({
        url: `invoices/${invoiceId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Invoice", id }], // Invalidate the specific invoice after deletion
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;

export default invoiceApi;
