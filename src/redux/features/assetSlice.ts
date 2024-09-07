import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from './customerSlice';
import { Client } from './clientSlice';
import { AssetType } from './assetTypeSlice';

export interface Asset {
  id: string;
  name: string;
  customerId: string;
  clientId: string;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  status: string;
  inspectionInterval: string;
  qrCode: string;
  nfcCode: string;
  pipeDia: number;
  smart: string;
  size: string;
  material: string;
  deleteProtect: string;
  duty: string;
  rails: string;
  float: number;
  pumps: number;
  type: AssetType;
  createdAt?: string;
  updatedAt?: string;
  client?: Client;
  customer?: Customer;
}

export interface CreateAsset {
  id: string;
  name: string;
  type: string;
  customerId: string;
  clientId: string;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  status: string;
  inspectionInterval: string;
  qrCode: string;
  nfcCode: string;
  pipeDia: number;
  smart: string;
  size: string;
  material: string;
  deleteProtect: string;
  duty: string;
  rails: string;
  float: number;
  pumps: number;
  createdAt?: string;
  updatedAt?: string;
  client?: Client;
  customer?: Customer;
}

interface AssetState {
  assets: Asset[] | null;
}

const initialState: AssetState = {
  assets: null,
};

const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    setAssets: (state, action: PayloadAction<Asset[]>) => {
      state.assets = action.payload;
    },
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.assets?.push(action.payload);
    },
    updateAsset: (state, action: PayloadAction<Asset>) => {
      const index = state.assets?.findIndex((asset) => asset.id === action.payload.id);
      if (index !== undefined && index !== -1 && state.assets) {
        state.assets[index] = action.payload;
      }
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets?.filter((asset) => asset.id !== action.payload) || null;
    },
  },
});

export const { setAssets, addAsset, updateAsset, removeAsset } = assetSlice.actions;
export default assetSlice.reducer;
