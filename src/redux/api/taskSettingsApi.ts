import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TaskSettings } from "../features/taskSettingsSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers: Headers, { }: { getState: () => any }) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const taskSettingsApi = createApi({
  reducerPath: "taskSettingsApi",
  baseQuery,
  tagTypes: ["TaskSettings"],
  endpoints: (builder) => ({
    getTaskSettings: builder.query<TaskSettings, void>({
      query: () => ({
        url: "task-settings",
        method: "GET",
      }),
      providesTags: ["TaskSettings"],
    }),
    getTaskSettingsById: builder.query<TaskSettings, string>({
      query: (taskSettingsId: string) => ({
        url: `task-settings/${taskSettingsId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "TaskSettings", id }],
    }),
    createTaskSettings: builder.mutation<TaskSettings, Partial<TaskSettings>>({
      query: (newTaskSettings) => ({
        url: "task-settings",
        method: "POST",
        body: newTaskSettings,
      }),
      invalidatesTags: ["TaskSettings"],
    }),
    updateTaskSettings: builder.mutation<TaskSettings, Partial<TaskSettings>>({
      query: (body) => ({
        url: `task-settings`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "TaskSettings", id }],
    }),
    deleteTaskSettings: builder.mutation<{ success: boolean }, string>({
      query: (taskSettingsId: string) => ({
        url: `task-settings/${taskSettingsId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "TaskSettings", id }],
    }),
  }),
});

export const {
  useGetTaskSettingsQuery,
  useGetTaskSettingsByIdQuery,
  useCreateTaskSettingsMutation,
  useUpdateTaskSettingsMutation,
  useDeleteTaskSettingsMutation,
} = taskSettingsApi;

export default taskSettingsApi;
