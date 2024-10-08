import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Company } from "../features/companySlice";

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

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery,
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], void>({
      query: () => ({
        url: "companies",
        method: "GET",
      }),
      providesTags: ["Company"],
    }),
    getCompanyById: builder.query<Company, string>({
      query: (companyId: string) => ({
        url: `companies/${companyId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Company", id }],
    }),
    getCompanyByClientId: builder.query<Company, string>({
      query: (clientId: string) => ({
        url: `companies/client/${clientId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Company", id }],
    }),
    createCompany: builder.mutation<Company, Partial<Company>>({
      query: (newCompany) => ({
        url: "companies",
        method: "POST",
        body: newCompany,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompany: builder.mutation<Company, Partial<Company>>({
      query: ({ id, ...rest }) => ({
        url: `companies/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Company", id }],
    }),
    deleteCompany: builder.mutation<{ success: boolean }, string>({
      query: (companyId: string) => ({
        url: `companies/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Company", id }],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyByIdQuery,
  useGetCompanyByClientIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;

export default companyApi;
