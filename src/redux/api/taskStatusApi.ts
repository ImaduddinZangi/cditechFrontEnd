import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TaskStatus } from "../features/taskStatusSlice";

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

export const taskStatusApi = createApi({
  reducerPath: "taskStatusApi",
  baseQuery,
  tagTypes: ["TaskStatus"],
  endpoints: (builder) => ({
    getTaskStatuses: builder.query<TaskStatus[], void>({
      query: () => ({
        url: "task-statuses",
        method: "GET",
      }),
      providesTags: ["TaskStatus"],
    }),
    getTaskStatusById: builder.query<TaskStatus, string>({
      query: (taskStatusId: string) => ({
        url: `task-statuses/${taskStatusId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "TaskStatus", id }],
    }),
    createTaskStatus: builder.mutation<TaskStatus, Partial<TaskStatus>>({
      query: (newTaskStatus) => ({
        url: "task-statuses",
        method: "POST",
        body: newTaskStatus,
      }),
      invalidatesTags: ["TaskStatus"],
    }),
    updateTaskStatus: builder.mutation<TaskStatus, Partial<TaskStatus>>({
      query: ({ id, ...rest }) => ({
        url: `task-statuses/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "TaskStatus", id }],
    }),
    deleteTaskStatus: builder.mutation<{ success: boolean }, string>({
      query: (taskStatusId: string) => ({
        url: `task-statuses/${taskStatusId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "TaskStatus", id }],
    }),
  }),
});

export const {
  useGetTaskStatusesQuery,
  useGetTaskStatusByIdQuery,
  useCreateTaskStatusMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskStatusMutation,
} = taskStatusApi;

export default taskStatusApi;
