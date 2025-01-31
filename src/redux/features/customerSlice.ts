import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "./clientSlice";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  service_address: string;
  billing_address: string;
  type: string;
  status: string;
  gate_code: string;
  previous_phone_number: string;
  service_contact: string;
  quickbooksCustomerId: string;
  previousProvider: string;
  billingContactEmail: string;
  client: Client;
  photos: string[];
  created_at: Date;
  updated_at: Date;
}

interface CustomerState {
  token: string | null;
  customer: Customer | null;
  selectedCustomerId: string | null;
}

const initialState: CustomerState = {
  token: null,
  customer: null,
  selectedCustomerId: localStorage.getItem("selectedCustomerId"),
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<Customer>) => {
      state.customer = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.customer = null;
    },
    setSelectedCustomerId: (state, action: PayloadAction<string>) => {
      state.selectedCustomerId = action.payload;
      localStorage.setItem("selectedCustomerId", action.payload);
    },
  },
});

export const { setCustomer, setToken, logout, setSelectedCustomerId } =
  customerSlice.actions;
export default customerSlice.reducer;
