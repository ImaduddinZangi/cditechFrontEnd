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
  endpoints: (builder) => ({
    getChecklistItems: builder.query<ChecklistItem[], void>({
      query: () => ({
        url: "checklist-items",
        method: "GET",
      }),
    }),
    getChecklistItemById: builder.query<ChecklistItem, string>({
      query: (checklistItemId: string) => ({
        url: `checklist-items/${checklistItemId}`,
        method: "GET",
      }),
    }),
    createChecklistItem: builder.mutation<ChecklistItem, Partial<ChecklistItem>>({
      query: (newChecklistItem) => ({
        url: "checklist-items",
        method: "POST",
        body: newChecklistItem,
      }),
    }),
    updateChecklistItem: builder.mutation<ChecklistItem, Partial<ChecklistItem>>({
      query: ({ id, ...rest }) => ({
        url: `checklist-items/${id}`,
        method: "PATCH",
        body: rest,
      }),
    }),
    deleteChecklistItem: builder.mutation<{ success: boolean }, string>({
      query: (checklistItemId: string) => ({
        url: `checklist-items/${checklistItemId}`,
        method: "DELETE",
      }),
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
