import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "./clientSlice";
import { Asset } from "./assetSlice";
import { Customer } from "./customerSlice";
import { ClientUser } from "./clientUserSlice";
import { Scores } from "./inspectionScoresSlice";
import { Checklist } from "./inspectionChecklistSlice";

export interface RoutePoint {
  latitude: number;
  longitude: number;
}

export interface Score {
  scoreId: string;
}

export interface IDs {
  id: string;
}

export interface Inspection {
  id?: string;
  clientId?: string | null;
  customerId?: string;
  assetId?: string;
  checklists?: IDs[];
  score?: Score;
  name: string;
  assignedTo?: string;
  status?: string;
  scheduledDate: string;
  completedDate: string | null;
  route: RoutePoint[];
  comments: string;
  serviceFee: number;
  recording: string;
}

export interface GetInspection {
  id: string;
  name: string;
  clientId?: string | null;
  assignedTo?: ClientUser;
  status: string;
  pdfFilePath?: string;
  scheduledDate: string;
  completedDate: string | null;
  route: RoutePoint[];
  comments: string;
  serviceFee: number;
  checklists: Checklist[];
  scores: Scores[];
  recording?: string;
  createdAt: string;
  updatedAt: string;
  client: Client;
  asset: Asset;
  customer: Customer;
}

interface InspectionState {
  inspections: Inspection[] | null;
}

const initialState: InspectionState = {
  inspections: null,
};

const inspectionSlice = createSlice({
  name: "inspection",
  initialState,
  reducers: {
    setInspections: (state, action: PayloadAction<Inspection[]>) => {
      state.inspections = action.payload;
    },
    addInspection: (state, action: PayloadAction<Inspection>) => {
      state.inspections?.push(action.payload);
    },
    updateInspection: (state, action: PayloadAction<Inspection>) => {
      const index = state.inspections?.findIndex(
        (inspection) => inspection.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.inspections) {
        state.inspections[index] = action.payload;
      }
    },
    removeInspection: (state, action: PayloadAction<string>) => {
      state.inspections =
        state.inspections?.filter(
          (inspection) => inspection.id !== action.payload
        ) || null;
    },
  },
});

export const {
  setInspections,
  addInspection,
  updateInspection,
  removeInspection,
} = inspectionSlice.actions;
export default inspectionSlice.reducer;
