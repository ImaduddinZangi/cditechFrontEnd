import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateCustomer, Customer } from "../features/customerSlice";

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
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], void>({
      query: () => ({
        url: "client/customers",
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),
    getCustomerById: builder.query<Customer, string>({
      query: (customerId: string) => ({
        url: `client/customers/${customerId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Customer", id }],
    }),
    createCustomer: builder.mutation<Customer, Partial<CreateCustomer>>({
      query: (newCustomer) => ({
        url: "client/customers",
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation<Customer, Partial<CreateCustomer>>({
      query: ({ id, ...rest }) => ({
        url: `client/customers/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Customer", id }],
    }),
    deleteCustomer: builder.mutation<{ success: boolean }, string>({
      query: (customerId: string) => ({
        url: `client/customers/${customerId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Customer", id }],
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
