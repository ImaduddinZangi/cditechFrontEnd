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
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], void>({
      query: () => ({
        url: "client/customers",
        method: "GET",
      }),
    }),
    getCustomerById: builder.query<Customer, string>({
      query: (customerId: string) => ({
        url: `client/customers/${customerId}`,
        method: "GET",
      }),
    }),
    createCustomer: builder.mutation<Customer, Partial<Customer>>({
      query: (newCustomer) => ({
        url: "client/customers",
        method: "POST",
        body: newCustomer,
      }),
    }),
    updateCustomer: builder.mutation<Customer, Partial<Customer>>({
      query: ({ id, ...rest }) => ({
        url: `client/customers/${id}`,
        method: "PATCH",
        body: rest,
      }),
    }),
    deleteCustomer: builder.mutation<{ success: boolean }, string>({
      query: (customerId: string) => ({
        url: `client/customers/${customerId}`,
        method: "DELETE",
      }),
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
