import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Checklist, ChecklistData } from "../features/inspectionChecklistSlice";

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

export const inspectionChecklistApi = createApi({
  reducerPath: "inspectionChecklistApi",
  baseQuery,
  tagTypes: ["Checklist"], // Add tagTypes for caching
  endpoints: (builder) => ({
    getInspectionChecklists: builder.query<Checklist[], void>({
      query: () => ({
        url: "checklists",
        method: "GET",
      }),
      providesTags: ["Checklist"], // Provide tags for checklist list
    }),
    getInspectionChecklistById: builder.query<Checklist, string>({
      query: (checklistId: string) => ({
        url: `checklists/${checklistId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Checklist", id }], // Provide tags for a specific checklist
    }),
    createInspectionChecklist: builder.mutation<ChecklistData, Partial<ChecklistData>>({
      query: (newChecklist) => ({
        url: "checklists",
        method: "POST",
        body: newChecklist,
      }),
      invalidatesTags: ["Checklist"], // Invalidate checklist list after creation
    }),
    updateInspectionChecklist: builder.mutation<ChecklistData, Partial<ChecklistData>>({
      query: ({ id, ...rest }) => ({
        url: `checklists/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Checklist", id }], // Invalidate specific checklist after update
    }),
    deleteInspectionChecklist: builder.mutation<{ success: boolean }, string>({
      query: (checklistId: string) => ({
        url: `checklists/${checklistId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Checklist", id }], // Invalidate specific checklist after deletion
    }),
  }),
});

export const {
  useGetInspectionChecklistsQuery,
  useGetInspectionChecklistByIdQuery,
  useCreateInspectionChecklistMutation,
  useUpdateInspectionChecklistMutation,
  useDeleteInspectionChecklistMutation,
} = inspectionChecklistApi;

export default inspectionChecklistApi;
