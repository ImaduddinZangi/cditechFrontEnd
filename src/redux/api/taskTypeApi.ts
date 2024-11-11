import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TaskType } from "../features/taskTypeSlice";

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

export const taskTypeApi = createApi({
  reducerPath: "taskTypeApi",
  baseQuery,
  tagTypes: ["TaskType"],
  endpoints: (builder) => ({
    getTaskTypes: builder.query<TaskType[], void>({
      query: () => ({
        url: "task-types",
        method: "GET",
      }),
      providesTags: ["TaskType"],
    }),
    getTaskTypeById: builder.query<TaskType, string>({
      query: (taskTypeId: string) => ({
        url: `task-types/${taskTypeId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "TaskType", id }],
    }),
    createTaskType: builder.mutation<TaskType, Partial<TaskType>>({
      query: (newTaskType) => ({
        url: "task-types",
        method: "POST",
        body: newTaskType,
      }),
      invalidatesTags: ["TaskType"],
    }),
    updateTaskType: builder.mutation<TaskType, Partial<TaskType>>({
      query: ({ id, ...rest }) => ({
        url: `task-types/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "TaskType", id }],
    }),
    deleteTaskType: builder.mutation<{ success: boolean }, string>({
      query: (taskTypeId: string) => ({
        url: `task-types/${taskTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "TaskType", id }],
    }),
  }),
});

export const {
  useGetTaskTypesQuery,
  useGetTaskTypeByIdQuery,
  useCreateTaskTypeMutation,
  useUpdateTaskTypeMutation,
  useDeleteTaskTypeMutation,
} = taskTypeApi;

export default taskTypeApi;
