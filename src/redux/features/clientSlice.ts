import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  billing_address: string;
  payment_method: string;
  industry: string;
  type: string;
  account_status: string;
  next_bill_date: string;
}

interface ClientState {
  token: string | null;
  client: Client | null;
}

const initialState: ClientState = {
  token: null,
  client: null,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<Client>) => {
      state.client = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.client = null;
    },
  },
});

export const { setClient, setToken, logout } = clientSlice.actions;
export default clientSlice.reducer;