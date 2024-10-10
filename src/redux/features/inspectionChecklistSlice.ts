import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FloatScores {
  float1: string;
  float2: string;
  float3: string;
  float4: string;
  float5: string;
  float6: string;
  alarmFloat: string;
}

export interface PumpData {
  pumpName: string;
  runs: boolean;
  amps: string;
  contactors: string;
}

export interface Checklist {
  id?: string;
  structureScore: string;
  panelScore: string;
  pipesScore: string;
  alarmScore: string;
  alarmLightScore: string;
  wiresScore: string;
  breakersScore: string;
  contactorsScore: string;
  thermalsScore: string;
  overallScore: string;
  cleaning: boolean;
  floatScores: FloatScores;
  pumpScores: { [key: string]: PumpData };
  createdAt?: string;
  updatedAt?: string;
}

interface InspectionChecklistState {
  inspectionChecklist: Checklist[] | null;
}

const initialState: InspectionChecklistState = {
  inspectionChecklist: null,
};

const inspectionChecklistSlice = createSlice({
  name: "inspectionChecklist",
  initialState,
  reducers: {
    setInspectionChecklist: (state, action: PayloadAction<Checklist[]>) => {
      state.inspectionChecklist = action.payload;
    },
    addInspectionChecklist: (state, action: PayloadAction<Checklist>) => {
      state.inspectionChecklist?.push(action.payload);
    },
    updateInspectionChecklist: (state, action: PayloadAction<Checklist>) => {
      const index = state.inspectionChecklist?.findIndex(
        (inspectionChecklist) => inspectionChecklist.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.inspectionChecklist) {
        state.inspectionChecklist[index] = action.payload;
      }
    },
    removeInspectionChecklist: (state, action: PayloadAction<string>) => {
      state.inspectionChecklist =
        state.inspectionChecklist?.filter(
          (inspectionChecklist) => inspectionChecklist.id !== action.payload
        ) || null;
    },
  },
});

export const {
  setInspectionChecklist,
  addInspectionChecklist,
  updateInspectionChecklist,
  removeInspectionChecklist,
} = inspectionChecklistSlice.actions;

export default inspectionChecklistSlice.reducer;
