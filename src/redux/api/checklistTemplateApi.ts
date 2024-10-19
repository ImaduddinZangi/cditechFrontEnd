import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChecklistTemplate } from "../features/checklistTemplateSlice";

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

export const checklistTemplateApi = createApi({
  reducerPath: "checklistTemplateApi",
  baseQuery,
  tagTypes: ["ChecklistTemplate"],
  endpoints: (builder) => ({
    getChecklistTemplates: builder.query<ChecklistTemplate[], void>({
      query: () => ({
        url: "checklist-templates",
        method: "GET",
      }),
      providesTags: ["ChecklistTemplate"],
    }),
    getChecklistTemplateById: builder.query<ChecklistTemplate, string>({
      query: (templateId: string) => ({
        url: `checklist-templates/${templateId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "ChecklistTemplate", id },
      ],
    }),
    createChecklistTemplate: builder.mutation<
      ChecklistTemplate,
      Partial<ChecklistTemplate>
    >({
      query: (newTemplate) => ({
        url: "checklist-templates",
        method: "POST",
        body: newTemplate,
      }),
      invalidatesTags: ["ChecklistTemplate"],
    }),
    updateChecklistTemplate: builder.mutation<
      ChecklistTemplate,
      Partial<ChecklistTemplate>
    >({
      query: ({ id, ...rest }) => ({
        url: `checklist-templates/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ChecklistTemplate", id },
      ],
    }),
    deleteChecklistTemplate: builder.mutation<{ success: boolean }, string>({
      query: (templateId: string) => ({
        url: `checklist-templates/${templateId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "ChecklistTemplate", id },
      ],
    }),
  }),
});

export const {
  useGetChecklistTemplatesQuery,
  useGetChecklistTemplateByIdQuery,
  useCreateChecklistTemplateMutation,
  useUpdateChecklistTemplateMutation,
  useDeleteChecklistTemplateMutation,
} = checklistTemplateApi;

export default checklistTemplateApi;
