import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  billing_address: string;
  company_name: string;
  company_type: string;
  industry: string;
  company_logo: string | null;
  payment_method: string;
  account_status: string;
  custom_portal_url: string;
  tax_exempt: boolean;
  protected: boolean;
  email_verified: boolean;
  next_bill_date: string;
  quickbooksAccessToken: string | null;
  quickbooksRefreshToken: string | null;
  quickbooksRealmId: string | null;
  quickbooksTokenExpiresIn: number | null;
  quickbooksState: string | null;
  created_at: string;
  updated_at: string;
  user: User;
  userGroups: UserGroups[];
}

interface User {
  id: string;
  username: string;
  password_hash: string;
  email: string;
  role: string;
  created_by: string | null;
  phone: string | null;
  is_active: boolean;
  is_client_admin: boolean;
  is_customer_admin: boolean;
  last_login: string;
  last_login_ip: string;
  last_gps_location: string | null;
  title: string | null;
  profile_image: string | null;
  two_factor_enabled: boolean;
  two_factor_details: string | null;
  two_factor_authentication_secret: string;
  quickbooks_customer_id: string | null;
  quickbooks_sync_date: string | null;
  created_at: string;
  updated_at: string;
}

interface UserGroups {
  id: string;
  name: string;
  description: string;
  isDefaultAdminGroup: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
}

interface ClientState {
  token: string | null;
  client: Client | null;
  quickbooksAuthUrl: string | null;
  quickbooksConnected: boolean;
}

const initialState: ClientState = {
  token: null,
  client: null,
  quickbooksAuthUrl: null,
  quickbooksConnected: false,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<Client>) => {
      state.client = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setQuickBooksAuthUrl: (state, action: PayloadAction<string>) => {
      state.quickbooksAuthUrl = action.payload;
    },
    setQuickBooksConnected: (state, action: PayloadAction<boolean>) => {
      state.quickbooksConnected = action.payload;
    },
    logoutClient: (state) => {
      state.token = null;
      state.client = null;
      state.quickbooksAuthUrl = null;
      state.quickbooksConnected = false;
    },
  },
});

export const {
  setClient,
  setToken,
  setQuickBooksAuthUrl,
  setQuickBooksConnected,
  logoutClient,
} = clientSlice.actions;

export default clientSlice.reducer;
