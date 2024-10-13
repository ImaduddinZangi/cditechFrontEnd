import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "./clientSlice";

export interface CreateService {
  id?: string;
  clientId: string | null;
  name: string;
  description: string;
  price: number;
  isTaxable: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  isTaxable: boolean;
  quickbooksServiceId: string;
  billing_io: string;
  client: Client;
}

interface ServiceState {
  Services: Service[] | null;
}

const initialState: ServiceState = {
  Services: null,
};

const ServiceSlice = createSlice({
  name: "Service",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.Services = action.payload;
    },
    addService: (state, action: PayloadAction<Service>) => {
      state.Services?.push(action.payload);
    },
    updateService: (state, action: PayloadAction<Service>) => {
      const index = state.Services?.findIndex(
        (Service) => Service.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.Services) {
        state.Services[index] = action.payload;
      }
    },
    removeService: (state, action: PayloadAction<string>) => {
      state.Services =
        state.Services?.filter((Service) => Service.id !== action.payload) ||
        null;
    },
  },
});

export const { setServices, addService, updateService, removeService } =
  ServiceSlice.actions;
export default ServiceSlice.reducer;
