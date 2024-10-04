import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Customer } from "../features/customerSlice";

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

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery,
  tagTypes: ["Customer"], // Add tagTypes for caching
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], void>({
      query: () => ({
        url: "client/customers",
        method: "GET",
      }),
      providesTags: ["Customer"], // Provide tags for customer list
    }),
    getCustomerById: builder.query<Customer, string>({
      query: (customerId: string) => ({
        url: `client/customers/${customerId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Customer", id }], // Provide tags for a specific customer
    }),
    createCustomer: builder.mutation<Customer, Partial<Customer>>({
      query: (newCustomer) => ({
        url: "client/customers",
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: ["Customer"], // Invalidate customer list after creation
    }),
    updateCustomer: builder.mutation<Customer, Partial<Customer>>({
      query: ({ id, ...rest }) => ({
        url: `client/customers/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Customer", id }], // Invalidate specific customer after update
    }),
    deleteCustomer: builder.mutation<{ success: boolean }, string>({
      query: (customerId: string) => ({
        url: `client/customers/${customerId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Customer", id }], // Invalidate specific customer after deletion
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;

export default customerApi;
