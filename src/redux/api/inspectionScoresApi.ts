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
  endpoints: (builder) => ({
    getInspectionScores: builder.query<Scores[], void>({
      query: () => ({
        url: "inspection-scores",
        method: "GET",
      }),
    }),
    getInspectionScoreById: builder.query<Scores, string>({
      query: (scoreId: string) => ({
        url: `inspection-scores/${scoreId}`,
        method: "GET",
      }),
    }),
    createInspectionScore: builder.mutation<Scores, Partial<Scores>>({
      query: (newScore) => ({
        url: "inspection-scores",
        method: "POST",
        body: newScore,
      }),
    }),
    updateInspectionScore: builder.mutation<Scores, Partial<Scores>>({
      query: ({ id, ...rest }) => ({
        url: `inspection-scores/${id}`,
        method: "PATCH",
        body: rest,
      }),
    }),
    deleteInspectionScore: builder.mutation<{ success: boolean }, string>({
      query: (scoreId: string) => ({
        url: `inspection-scores/${scoreId}`,
        method: "DELETE",
      }),
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
