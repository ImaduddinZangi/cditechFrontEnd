import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AssetType {
  id: string;
  name: string;
  description?: string;
}

interface AssetTypeState {
  assetTypes: AssetType[] | null;
}

const initialState: AssetTypeState = {
  assetTypes: null,
};

const assetTypeSlice = createSlice({
  name: 'assetType',
  initialState,
  reducers: {
    setAssetTypes: (state, action: PayloadAction<AssetType[]>) => {
      state.assetTypes = action.payload;
    },
    addAssetType: (state, action: PayloadAction<AssetType>) => {
      state.assetTypes?.push(action.payload);
    },
    updateAssetType: (state, action: PayloadAction<AssetType>) => {
      const index = state.assetTypes?.findIndex((assetType) => assetType.id === action.payload.id);
      if (index !== undefined && index !== -1 && state.assetTypes) {
        state.assetTypes[index] = action.payload;
      }
    },
    removeAssetType: (state, action: PayloadAction<string>) => {
      state.assetTypes = state.assetTypes?.filter((assetType) => assetType.id !== action.payload) || null;
    },
  },
});

export const { setAssetTypes, addAssetType, updateAssetType, removeAssetType } = assetTypeSlice.actions;
export default assetTypeSlice.reducer;
