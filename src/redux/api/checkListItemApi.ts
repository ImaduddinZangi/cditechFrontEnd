import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChecklistItem } from "../features/checkListItemSlice";

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

export const checkListItemApi = createApi({
  reducerPath: "checkListItemApi",
  baseQuery,
  tagTypes: ["ChecklistItem"], // Add tagTypes for caching
  endpoints: (builder) => ({
    getChecklistItems: builder.query<ChecklistItem[], void>({
      query: () => ({
        url: "checklist-items",
        method: "GET",
      }),
      providesTags: ["ChecklistItem"], // Provide tags for caching the checklist items
    }),
    getChecklistItemById: builder.query<ChecklistItem, string>({
      query: (checklistItemId: string) => ({
        url: `checklist-items/${checklistItemId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "ChecklistItem", id }], // Provide tags for caching a specific checklist item
    }),
    createChecklistItem: builder.mutation<ChecklistItem, Partial<ChecklistItem>>({
      query: (newChecklistItem) => ({
        url: "checklist-items",
        method: "POST",
        body: newChecklistItem,
      }),
      invalidatesTags: ["ChecklistItem"], // Invalidate checklist item list after creation
    }),
    updateChecklistItem: builder.mutation<ChecklistItem, Partial<ChecklistItem>>({
      query: ({ id, ...rest }) => ({
        url: `checklist-items/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "ChecklistItem", id }], // Invalidate specific checklist item after update
    }),
    deleteChecklistItem: builder.mutation<{ success: boolean }, string>({
      query: (checklistItemId: string) => ({
        url: `checklist-items/${checklistItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "ChecklistItem", id }], // Invalidate specific checklist item after deletion
    }),
  }),
});

export const {
  useGetChecklistItemsQuery,
  useGetChecklistItemByIdQuery,
  useCreateChecklistItemMutation,
  useUpdateChecklistItemMutation,
  useDeleteChecklistItemMutation,
} = checkListItemApi;

export default checkListItemApi;
