import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "./clientSlice";
import { Asset } from "./assetSlice";

export interface ChecklistItem {
  id: string;
  description: string;
  is_completed: boolean;
}

export interface Checklist {
  id?: string;
  name: string;
  overallScore: string;
  checklistItemIds?: string[];
  items?: ChecklistItem[];
  created_at?: string;
  updated_at?: string;
}

export interface RoutePoint {
  latitude: number;
  longitude: number;
}

export interface Scores {
  structureScore: string;
  panelScore: string;
  pipesScore: string;
  alarmScore: string;
  alarmLightScore: string;
  wiresScore: string;
  breakersScore: string;
  contactorsScore: string;
  thermalsScore: string;
  floatScores: {
    float1: string;
    float2: string;
  };
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Inspection {
  id?: string;
  clientId?: string | null;
  customerId?: string;
  assetId?: string;
  name: string;
  assignedTo: string | null;
  status: string;
  scheduledDate: string;
  completedDate: string | null;
  route: RoutePoint[];
  comments: string;
  serviceFee: number;
  checklists: Checklist[];
  scores: Scores[];
  recording?: string;
  createdAt?: string;
  updatedAt?: string;
  client?: Client;
  asset?: Asset;
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
