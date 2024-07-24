import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthResponse {
  access_token: string;
  user?: {
    id: string;
    name: string;
    email: string;
    username?: string;
    role?: string;
    phone?: string;
  };
  client?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    billing_address: string;
    payment_method: string;
    type: string;
    account_status: string;
    next_bill_date: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

interface UserRegisterRequest {
  username: string;
  password: string;
  email: string;
  role: string;
  phone: string;
}

interface ClientRegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  billing_address: string;
  payment_method: string;
  type: string;
  status: string;
  next_bill_date: string;
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
      async onQueryStarted(
        _args: LoginRequest,
        { queryFulfilled }: { queryFulfilled: Promise<{ data: AuthResponse }> }
      ) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.access_token);
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
      async onQueryStarted(
        _args: LoginRequest,
        { queryFulfilled }: { queryFulfilled: Promise<{ data: AuthResponse }> }
      ) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.access_token);
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
    registerUser: builder.mutation<AuthResponse, UserRegisterRequest>({
      query: (newUser: UserRegisterRequest) => ({
        url: "auth/register",
        method: "POST",
        body: newUser,
      }),
    }),
    registerClient: builder.mutation<AuthResponse, ClientRegisterRequest>({
      query: (newClient: ClientRegisterRequest) => ({
        url: "clients/register",
        method: "POST",
        body: newClient,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted() {
        localStorage.removeItem("token");
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLoginClientMutation,
  useRegisterUserMutation,
  useRegisterClientMutation,
  useLogoutMutation,
} = authApi;
