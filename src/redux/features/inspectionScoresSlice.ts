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

export interface Scores {
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
  name: string;
  floatScores?: FloatScores;
  pumpScores?: PumpData[];
  createdAt?: string;
  updatedAt?: string;
}

interface InspectionScoresState {
  inspectionScores: Scores[] | null;
}

const initialState: InspectionScoresState = {
  inspectionScores: null,
};

const inspectionScoresSlice = createSlice({
  name: "inspectionScores",
  initialState,
  reducers: {
    setInspectionScores: (state, action: PayloadAction<Scores[]>) => {
      state.inspectionScores = action.payload;
    },
    addInspectionScores: (state, action: PayloadAction<Scores>) => {
      state.inspectionScores?.push(action.payload);
    },
    updateInspectionScores: (state, action: PayloadAction<Scores>) => {
      const index = state.inspectionScores?.findIndex(
        (inspectionScore) => inspectionScore.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.inspectionScores) {
        state.inspectionScores[index] = action.payload;
      }
    },
    removeInspectionScores: (state, action: PayloadAction<string>) => {
      state.inspectionScores =
        state.inspectionScores?.filter(
          (inspectionScore) => inspectionScore.id !== action.payload
        ) || null;
    },
  },
});

export const {
  setInspectionScores,
  addInspectionScores,
  updateInspectionScores,
  removeInspectionScores,
} = inspectionScoresSlice.actions;

export default inspectionScoresSlice.reducer;
