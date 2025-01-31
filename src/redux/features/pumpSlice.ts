import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PumpBrand } from "./pumpBrandSlice";
import { Asset } from "./assetSlice";
import { Photo } from "../api/uploadPhotosApi";

export interface Pump {
  id?: string;
  name: string;
  assetId?: string;
  brandId?: string;
  hp: string;
  serial: string;
  warranty: string;
  installedDate: string;
  avgAmps: string;
  maxAmps: string;
  createdAt?: string;
  updatedAt?: string;
  files?: File[];
  photos?: Photo[];
  asset?: Asset;
  brand?: PumpBrand;
}

interface PumpState {
  pumps: Pump[] | null;
}

const initialState: PumpState = {
  pumps: null,
};

const pumpSlice = createSlice({
  name: "pump",
  initialState,
  reducers: {
    setPumps: (state, action: PayloadAction<Pump[]>) => {
      state.pumps = action.payload;
    },
    addPump: (state, action: PayloadAction<Pump>) => {
      state.pumps?.push(action.payload);
    },
    updatePump: (state, action: PayloadAction<Pump>) => {
      const index = state.pumps?.findIndex(
        (pump) => pump.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.pumps) {
        state.pumps[index] = action.payload;
      }
    },
    removePump: (state, action: PayloadAction<string>) => {
      state.pumps =
        state.pumps?.filter((pump) => pump.id !== action.payload) || null;
    },
  },
});

export const { setPumps, addPump, updatePump, removePump } = pumpSlice.actions;
export default pumpSlice.reducer;
