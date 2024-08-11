import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChecklistItem {
  description: string;
  isCompleted?: boolean;
}

interface Checklist {
  id?: string;
  name: string;
  overallScore: string;
  items: ChecklistItem[];
  created_at?: string;
  updated_at?: string;
}

interface RoutePoint {
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
}

export interface Inspection {
  id?: string;
  clientId?: string | null;
  customerId?: string;
  assetId?: string;
  assignedTo: string | null;
  status: string;
  scheduledDate: string;
  completedDate: string | null;
  route: RoutePoint[];
  comments: string;
  serviceFee: number;
  checklists: Checklist[];
  score: Scores;
  createdAt?: string;
  updatedAt?: string;
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
        state.inspections?.filter((inspection) => inspection.id !== action.payload) || null;
    },
  },
});

export const { setInspections, addInspection, updateInspection, removeInspection } = inspectionSlice.actions;
export default inspectionSlice.reducer;
