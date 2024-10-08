import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Client, logoutClient } from "../features/clientSlice";
import {  clientUserLogout } from "../features/clientUserSlice";
import { User } from "../features/userSlice";

interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user?: User;
  client?: Client;
}

interface LoginRequest {
  email: string;
  password: string;
}

export interface ClientRegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  industry: string;
  phone: string;
  address: string;
  company_name: string;
  company_type: string;
  billing_address: string;
  payment_method: string;
  custom_portal_url: string;
  next_bill_date: string;
  account_status: string;
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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("userToken", data.access_token);
          if (data.refresh_token) {
            localStorage.setItem("refresh_token", data.refresh_token);
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
    loginClient: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: "auth/client/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.access_token);
          if (data.refresh_token) {
            localStorage.setItem("refresh_token", data.refresh_token);
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
    registerClient: builder.mutation<AuthResponse, ClientRegisterRequest>({
      query: (newClient: ClientRegisterRequest) => ({
        url: "clients/register",
        method: "POST",
        body: newClient,
      }),
    }),
    refreshToken: builder.mutation<AuthResponse, { refresh_token: string }>({
      query: (data) => ({
        url: "auth/refresh",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.access_token);
          if (data.refresh_token) {
            localStorage.setItem("refresh_token", data.refresh_token);
          }
        } catch (error) {
          console.error("Token refresh error:", error);
        }
      },
    }),    
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_args, { dispatch }) {
        localStorage.removeItem("token");
        dispatch(logoutClient());
        dispatch(clientUserLogout());
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLoginClientMutation,
  useRegisterClientMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
