import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Package {
  id: string;
  name: string;
  monthly_price: number;
  yearly_price: number;
  customer_limit: number;
  asset_limit: number;
  user_limit: number;
  inspection_limit: number;
  photo_storage_limit: number;
  video_storage_limit: number;
  pdf_storage_limit: number;
  sms_limit: number;
  customer_portal: boolean;
  created_at: string;
  updated_at: string;
}

interface PackageState {
  packages: Package[] | null;
}

const initialState: PackageState = {
  packages: null,
};

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    setPackages: (state, action: PayloadAction<Package[]>) => {
      state.packages = action.payload;
    },
    addPackage: (state, action: PayloadAction<Package>) => {
      state.packages?.push(action.payload);
    },
    updatePackage: (state, action: PayloadAction<Package>) => {
      const index = state.packages?.findIndex(
        (pkg) => pkg.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.packages) {
        state.packages[index] = action.payload;
      }
    },
    removePackage: (state, action: PayloadAction<string>) => {
      state.packages = state.packages?.filter(
        (pkg) => pkg.id !== action.payload
      ) || null;
    },
  },
});

export const { setPackages, addPackage, updatePackage, removePackage } =
  packagesSlice.actions;
export default packagesSlice.reducer;
