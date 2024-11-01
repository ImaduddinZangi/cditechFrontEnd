import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "./customerSlice";
import { Client } from "./clientSlice";
import { AssetType } from "./assetTypeSlice";

export interface TreatmentPlantDigesterProperties {
  serviceInterval: 'Weekly' | 'Monthly' | 'Bi-Monthly' | 'Quarterly' | 'Yearly' | 'On-Demand' | 'Not Serviced';
  gallons: string;
  material: 'Plastic' | 'Fiberglass' | 'Concrete' | 'Other' | 'Unknown';
  connectionSize: string;
  suctionRequired: boolean;
  digesterDimensions: string;
  primaryTreatmentPlantAssetId?: string;
  latitude: string;
  longitude: string;
  qrCode: string;
  nfcId: string;
  condition: 'Good' | 'Fair' | 'Rough' | 'Bad' | 'Failing' | 'Other';
  requireDisposalTicket: boolean;
  primaryPlantOperator: string;
  operatorContactName: string;
  operatorContactPhone: string;
  videos?: string[];
  files?: string[];
}

export interface StormDrainProperties {
  serviceInterval: 'Weekly' | 'Monthly' | 'Bi-Monthly' | 'Quarterly' | 'Yearly' | 'On-Demand' | 'Not Serviced';
  drainSize: 'extra small' | 'small' | 'medium' | 'large' | 'extra large' | 'huge' | 'unknown';
  material: 'Plastic' | 'Fiberglass' | 'Concrete' | 'Other' | 'Unknown';
  waterIntrusion: boolean;
  damaged: boolean;
  internalPipeDia: string;
  latitude: string;
  longitude: string;
  qrCode: string;
  nfcId: string;
  drainDimensions: string;
  duty: 'Light' | 'Normal' | 'Heavy' | 'Severe' | 'Unknown';
  drainGrateType: 'steel' | 'plastic' | 'hinged steel' | 'other' | 'unknown';
  connectedAssetLineColor: string;
  connectedStormDrainAssetIds: string[];
}

export interface LintTrapProperties {
  serviceInterval: 'Weekly' | 'Monthly' | 'Bi-Monthly' | 'Quarterly' | 'Yearly' | 'On-Demand' | 'Not Serviced';
  gallons: string;
  material: 'Plastic' | 'Fiberglass' | 'Concrete' | 'Other' | 'Unknown';
  latitude: string;
  longitude: string;
  qrCode: string;
  nfcId: string;
  duty: 'Light' | 'Normal' | 'Heavy' | 'Severe' | 'Unknown';
  requireDisposalTicket: boolean;
  eveningService: boolean;
  multipleOnSiteTraps: boolean;
}

export interface LiftStationProperties {
  pipeDia: string;
  smart: string;
  size: string;
  material: 'Plastic' | 'Fiberglass' | 'Concrete' | 'Other' | 'Unknown';
  deleteProtect: string;
  duty: 'Light' | 'Normal' | 'Heavy' | 'Severe' | 'Unknown';
  rails: string;
  float: string;
  pumps: string;
  power: string;
  latitude: string;
  longitude: string;
  qrCode: string;
  nfcId: string;
  inspectionInterval: 'Weekly' | 'Monthly' | 'Bi-Monthly' | 'Quarterly' | 'Yearly' | 'On-Demand' | 'Not Serviced';
}

export interface GreaseTrapProperties {
  serviceInterval: 'Weekly' | 'Monthly' | 'Bi-Monthly' | 'Quarterly' | 'Yearly' | 'On-Demand' | 'Not Serviced';
  gallons: number;
  material: 'Plastic' | 'Fiberglass' | 'Concrete' | 'Other' | 'Unknown';
  latitude: string;
  longitude: string;
  qrCode: string;
  nfcId: string;
  duty: 'Light' | 'Normal' | 'Heavy' | 'Severe' | 'Unknown';
  requireDisposalTicket: boolean;
  eveningService: boolean;
  multipleOnSiteTraps: boolean;
}

export interface Asset {
  id: string;
  name: string;
  status: string;
  assetType: AssetType;
  client: Client;
  customer: Customer;
  photos: string[];
  properties: TreatmentPlantDigesterProperties | LiftStationProperties | StormDrainProperties | GreaseTrapProperties | LintTrapProperties;
  createdAt: string;
  updatedAt: string;
}

interface AssetState {
  assets: Asset[] | null;
}

const initialState: AssetState = {
  assets: null,
};

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setAssets: (state, action: PayloadAction<Asset[]>) => {
      state.assets = action.payload;
    },
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.assets?.push(action.payload);
    },
    updateAsset: (state, action: PayloadAction<Asset>) => {
      const index = state.assets?.findIndex(
        (asset) => asset.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.assets) {
        state.assets[index] = action.payload;
      }
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets =
        state.assets?.filter((asset) => asset.id !== action.payload) || null;
    },
  },
});

export const { setAssets, addAsset, updateAsset, removeAsset } =
  assetSlice.actions;
export default assetSlice.reducer;
