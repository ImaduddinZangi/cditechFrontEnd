import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TaskStatusHistory } from "../features/taskStatusHistorySlice";

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

export const taskStatusHistoryApi = createApi({
  reducerPath: "taskStatusHistoryApi",
  baseQuery,
  tagTypes: ["TaskStatusHistory"],
  endpoints: (builder) => ({
    getTaskStatusHistories: builder.query<TaskStatusHistory[], void>({
      query: () => ({
        url: "task-status-histories",
        method: "GET",
      }),
      providesTags: ["TaskStatusHistory"],
    }),
    getTaskStatusHistoryById: builder.query<TaskStatusHistory, string>({
      query: (taskStatusHistoryId: string) => ({
        url: `task-status-histories/${taskStatusHistoryId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "TaskStatusHistory", id }],
    }),
    createTaskStatusHistory: builder.mutation<TaskStatusHistory, Partial<TaskStatusHistory>>({
      query: (newTaskStatusHistory) => ({
        url: "task-status-histories",
        method: "POST",
        body: newTaskStatusHistory,
      }),
      invalidatesTags: ["TaskStatusHistory"],
    }),
    updateTaskStatusHistory: builder.mutation<TaskStatusHistory, Partial<TaskStatusHistory>>({
      query: ({ id, ...rest }) => ({
        url: `task-status-histories/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "TaskStatusHistory", id }],
    }),
    deleteTaskStatusHistory: builder.mutation<{ success: boolean }, string>({
      query: (taskStatusHistoryId: string) => ({
        url: `task-status-histories/${taskStatusHistoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "TaskStatusHistory", id }],
    }),
  }),
});

export const {
  useGetTaskStatusHistoriesQuery,
  useGetTaskStatusHistoryByIdQuery,
  useCreateTaskStatusHistoryMutation,
  useUpdateTaskStatusHistoryMutation,
  useDeleteTaskStatusHistoryMutation,
} = taskStatusHistoryApi;

export default taskStatusHistoryApi;
