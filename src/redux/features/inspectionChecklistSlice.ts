import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChecklistTemplate } from "./checklistTemplateSlice";

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

export interface Questions {
  questionId: string;
  questionText: string;
  questionType: string | boolean;
  options: string[] | null;
  answer?: string;
}

export interface Answer {
  questionId: string;
  answer: string;
}

export interface EditChecklist {
  id?: string;
  templateId: string;
  answers: Answer[];
}

export interface UpdateChecklist {
  id?: string;
  checklists: EditChecklist[];
}

export interface GetChecklist {
  inspectionChecklistId: string;
  inspectionId: string;
  templateId: string;
  completedAt: string;
  questions: Questions[];
}

export interface Checklist {
  id?: string;
  template?: ChecklistTemplate;
  questions: Questions[];
  created_at: string | null;
  completed_at: string | null;
  updated_at: string | null;
  answers: Answer[];
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
