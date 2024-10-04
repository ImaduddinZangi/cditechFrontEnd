import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Scores } from "../features/inspectionScoresSlice";

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

export const inspectionScoresApi = createApi({
  reducerPath: "inspectionScoresApi",
  baseQuery,
  tagTypes: ["Scores"], // Add tagTypes for caching
  endpoints: (builder) => ({
    getInspectionScores: builder.query<Scores[], void>({
      query: () => ({
        url: "inspection-scores",
        method: "GET",
      }),
      providesTags: ["Scores"], // Provide tags for inspection scores list
    }),
    getInspectionScoreById: builder.query<Scores, string>({
      query: (scoreId: string) => ({
        url: `inspection-scores/${scoreId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Scores", id }], // Provide tags for a specific score
    }),
    createInspectionScore: builder.mutation<Scores, Partial<Scores>>({
      query: (newScore) => ({
        url: "inspection-scores",
        method: "POST",
        body: newScore,
      }),
      invalidatesTags: ["Scores"], // Invalidate scores list after creation
    }),
    updateInspectionScore: builder.mutation<Scores, Partial<Scores>>({
      query: ({ id, ...rest }) => ({
        url: `inspection-scores/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Scores", id }], // Invalidate specific score after update
    }),
    deleteInspectionScore: builder.mutation<{ success: boolean }, string>({
      query: (scoreId: string) => ({
        url: `inspection-scores/${scoreId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Scores", id }], // Invalidate specific score after deletion
    }),
  }),
});

export const {
  useGetInspectionScoresQuery,
  useGetInspectionScoreByIdQuery,
  useCreateInspectionScoreMutation,
  useUpdateInspectionScoreMutation,
  useDeleteInspectionScoreMutation,
} = inspectionScoresApi;

export default inspectionScoresApi;
