import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Client {
  id: string;
  name: string;
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
  quickbooksAccessToken: string;
  quickbooksRefreshToken: string;
  quickbooksRealmId: string;
  quickbooksTokenExpiresIn: string;
  quickbooksState: string;
  created_at: string;
  updated_at: string;
}

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
  created_at: string;
  updated_at: string;
}

export interface Asset {
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
