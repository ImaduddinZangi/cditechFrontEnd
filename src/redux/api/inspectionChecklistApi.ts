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
  endpoints: (builder) => ({
    getInspectionChecklists: builder.query<Checklist[], void>({
      query: () => ({
        url: "checklists",
        method: "GET",
      }),
    }),
    getInspectionChecklistById: builder.query<Checklist, string>({
      query: (checklistId: string) => ({
        url: `checklists/${checklistId}`,
        method: "GET",
      }),
    }),
    createInspectionChecklist: builder.mutation<ChecklistData, Partial<ChecklistData>>({
      query: (newChecklist) => ({
        url: "checklists",
        method: "POST",
        body: newChecklist,
      }),
    }),
    updateInspectionChecklist: builder.mutation<ChecklistData, Partial<ChecklistData>>({
      query: ({ id, ...rest }) => ({
        url: `checklists/${id}`,
        method: "PATCH",
        body: rest,
      }),
    }),
    deleteInspectionChecklist: builder.mutation<{ success: boolean }, string>({
      query: (checklistId: string) => ({
        url: `checklists/${checklistId}`,
        method: "DELETE",
      }),
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
