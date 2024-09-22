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
  endpoints: (builder) => ({
    getInvoices: builder.query<Invoice[], void>({
      query: () => ({
        url: "invoices",
        method: "GET",
      }),
    }),
    getInvoiceById: builder.query<Invoice, string>({
      query: (invoiceId: string) => ({
        url: `invoices/${invoiceId}`,
        method: "GET",
      }),
    }),
    createInvoice: builder.mutation<Invoice, Partial<Invoice>>({
      query: (newInvoice) => ({
        url: "invoices",
        method: "POST",
        body: newInvoice,
      }),
    }),
    updateInvoice: builder.mutation<Invoice, Partial<Invoice>>({
      query: ({ id, ...rest }) => ({
        url: `invoices/${id}`,
        method: "PATCH",
        body: rest,
      }),
    }),
    deleteInvoice: builder.mutation<{ success: boolean }, string>({
      query: (invoiceId: string) => ({
        url: `invoices/${invoiceId}`,
        method: "DELETE",
      }),
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
