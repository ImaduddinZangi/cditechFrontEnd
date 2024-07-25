import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GenerateQrCodeResponse {
  qrCode: string;
}

interface VerifyCodeRequest {
  code: string;
}

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

export const twoFactorAuthApi = createApi({
  reducerPath: "twoFactorAuthApi",
  baseQuery,
  endpoints: (builder) => ({
    generateQrCode: builder.mutation<GenerateQrCodeResponse, void>({
      query: () => ({
        url: "auth/2fa/generate",
        method: "POST",
      }),
    }),
    verifyCode: builder.mutation<void, VerifyCodeRequest>({
      query: (body) => ({
        url: "auth/2fa/verify",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGenerateQrCodeMutation, useVerifyCodeMutation } = twoFactorAuthApi;
export default twoFactorAuthApi;
