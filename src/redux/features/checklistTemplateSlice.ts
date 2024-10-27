import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChecklistQuestion {
  id: string;
  question_text: string;
  question_type: string | boolean;
  options: null;
  is_required: boolean;
  answer: string;
  created_at: string;
  updated_at: string;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  description: string | null;
  questions: ChecklistQuestion[];
  created_at: string;
  updated_at: string;
}

interface ChecklistTemplateState {
  checklistTemplates: ChecklistTemplate[] | null;
}

const initialState: ChecklistTemplateState = {
  checklistTemplates: null,
};

const checklistTemplateSlice = createSlice({
  name: "checklistTemplate",
  initialState,
  reducers: {
    setChecklistTemplates: (
      state,
      action: PayloadAction<ChecklistTemplate[]>
    ) => {
      state.checklistTemplates = action.payload;
    },
    addChecklistTemplate: (state, action: PayloadAction<ChecklistTemplate>) => {
      state.checklistTemplates?.push(action.payload);
    },
    updateChecklistTemplate: (
      state,
      action: PayloadAction<ChecklistTemplate>
    ) => {
      const index = state.checklistTemplates?.findIndex(
        (template) => template.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.checklistTemplates) {
        state.checklistTemplates[index] = action.payload;
      }
    },
    removeChecklistTemplate: (state, action: PayloadAction<string>) => {
      state.checklistTemplates =
        state.checklistTemplates?.filter(
          (template) => template.id !== action.payload
        ) || null;
    },
  },
});

export const {
  setChecklistTemplates,
  addChecklistTemplate,
  updateChecklistTemplate,
  removeChecklistTemplate,
} = checklistTemplateSlice.actions;
export default checklistTemplateSlice.reducer;
