import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Service, CreateService } from "../features/serviceSlice";

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

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery,
  tagTypes: ["Service"],
  endpoints: (builder) => ({
    getServices: builder.query<Service[], void>({
      query: () => ({
        url: "services",
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    getServiceById: builder.query<Service, string>({
      query: (serviceId: string) => ({
        url: `services/${serviceId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Service", id }],
    }),
    createService: builder.mutation<Service, CreateService>({
      query: (newService) => ({
        url: "services",
        method: "POST",
        body: newService,
      }),
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation<Service, Partial<CreateService>>({
      query: ({ id, ...rest }) => ({
        url: `services/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Service", id }],
    }),
    deleteService: builder.mutation<{ success: boolean }, string>({
      query: (serviceId: string) => ({
        url: `services/${serviceId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Service", id }],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;

export default serviceApi;
