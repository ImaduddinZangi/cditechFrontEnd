import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "./clientSlice";

export interface ClientUser {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  phone?: string;
  division?: string;
  receiveSms?: boolean;
  requirePasswordChange?: boolean;
  sendWelcomeMessage?: boolean;
  groupId?: string;
  client?: Client;
  is_active?: boolean;
  is_client_admin?: boolean;
  is_customer_admin?: boolean;
  isProtectedUser?: boolean;
  two_factor_enabled?: boolean;
  created_at?: boolean;
  updated_at?: boolean;
}

interface AuthState {
  token: string | null;
  clientUser: ClientUser | null;
}

interface ClientUserState {
  auth: AuthState;
  clientUsers: ClientUser[] | null;
}

const initialState: ClientUserState = {
  auth: {
    token: null,
    clientUser: null,
  },
  clientUsers: null,
};

const clientUserSlice = createSlice({
  name: "clientUser",
  initialState,
  reducers: {
    // Set client users
    setClientUsers: (state, action: PayloadAction<ClientUser[]>) => {
      state.clientUsers = action.payload;
    },
    // Add a new client user
    addClientUser: (state, action: PayloadAction<ClientUser>) => {
      state.clientUsers?.push(action.payload);
    },
    // Update a client user
    updateClientUser: (state, action: PayloadAction<ClientUser>) => {
      const index = state.clientUsers?.findIndex(
        (clientUser) => clientUser.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.clientUsers) {
        state.clientUsers[index] = action.payload;
      }
    },
    // Remove a client user
    removeClientUser: (state, action: PayloadAction<string>) => {
      state.clientUsers =
        state.clientUsers?.filter(
          (clientUser) => clientUser.id !== action.payload
        ) || null;
    },
    // Set token for authentication
    setToken: (state, action: PayloadAction<string>) => {
      state.auth.token = action.payload;
    },
    // Set client user for authentication
    setClientUser: (state, action: PayloadAction<ClientUser>) => {
      state.auth.clientUser = action.payload;
    },
    // Logout the client user
    clientUserLogout: (state) => {
      state.auth.token = null;
      state.auth.clientUser = null;
    },
  },
});

export const {
  setClientUsers,
  addClientUser,
  updateClientUser,
  removeClientUser,
  setToken,
  setClientUser,
  clientUserLogout,
} = clientUserSlice.actions;
export default clientUserSlice.reducer;
