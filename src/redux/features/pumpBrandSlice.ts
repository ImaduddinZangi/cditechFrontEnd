import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PumpBrand {
  id: string;
  name: string;
  model: string;
  website: string;
  phone: string;
  address: string;
  madeInUsa: boolean;
  photos?: [];
}

interface PumpBrandState {
  pumpBrands: PumpBrand[] | null;
}

const initialState: PumpBrandState = {
  pumpBrands: null,
};

const pumpBrandSlice = createSlice({
  name: "pumpBrand",
  initialState,
  reducers: {
    setPumpBrands: (state, action: PayloadAction<PumpBrand[]>) => {
      state.pumpBrands = action.payload;
    },
    addPumpBrand: (state, action: PayloadAction<PumpBrand>) => {
      state.pumpBrands?.push(action.payload);
    },
    updatePumpBrand: (state, action: PayloadAction<PumpBrand>) => {
      const index = state.pumpBrands?.findIndex(
        (pumpBrand) => pumpBrand.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.pumpBrands) {
        state.pumpBrands[index] = action.payload;
      }
    },
    removePumpBrand: (state, action: PayloadAction<string>) => {
      state.pumpBrands =
        state.pumpBrands?.filter(
          (pumpBrand) => pumpBrand.id !== action.payload
        ) || null;
    },
  },
});

export const { setPumpBrands, addPumpBrand, updatePumpBrand, removePumpBrand } =
  pumpBrandSlice.actions;
export default pumpBrandSlice.reducer;
