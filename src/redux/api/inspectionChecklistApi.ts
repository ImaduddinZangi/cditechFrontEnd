import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Checklist,
  GetChecklist,
  UpdateChecklist,
} from "../features/inspectionChecklistSlice";
import { Inspection } from "../features/inspectionSlice";

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
  reducerPath: "inspectionChecklistsApi",
  baseQuery,
  tagTypes: ["Checklists"],
  endpoints: (builder) => ({
    getInspectionChecklists: builder.query<Checklist[], void>({
      query: () => ({
        url: "inspection-checklists",
        method: "GET",
      }),
      providesTags: ["Checklists"],
    }),
    getInspectionChecklistById: builder.query<GetChecklist, string>({
      query: (checklistId: string) => ({
        url: `inspection-checklists/${checklistId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Checklists", id }],
    }),
    createInspectionChecklist: builder.mutation<Checklist, Partial<Checklist>>({
      query: (newChecklist) => ({
        url: "inspection-checklists",
        method: "POST",
        body: newChecklist,
      }),
      invalidatesTags: ["Checklists"],
    }),
    updateChecklist: builder.mutation<Inspection, Partial<UpdateChecklist>>({
      query: ({ id, ...rest }) => ({
        url: `inspections/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Checklists", id },
      ],
    }),
    updateInspectionChecklist: builder.mutation<Checklist, Partial<Checklist>>({
      query: ({ id, ...rest }) => ({
        url: `inspection-checklists/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Checklists", id },
      ],
    }),
    deleteInspectionChecklist: builder.mutation<{ success: boolean }, string>({
      query: (checklistId: string) => ({
        url: `inspection-checklists/${checklistId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Checklists", id }],
    }),
  }),
});

export const {
  useGetInspectionChecklistsQuery,
  useGetInspectionChecklistByIdQuery,
  useCreateInspectionChecklistMutation,
  useUpdateChecklistMutation,
  useUpdateInspectionChecklistMutation,
  useDeleteInspectionChecklistMutation,
} = inspectionChecklistApi;

export default inspectionChecklistApi;
