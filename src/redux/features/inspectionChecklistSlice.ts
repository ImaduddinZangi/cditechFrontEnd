import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChecklistItem } from "./checkListItemSlice";

export interface Checklist {
  id?: string;
  name: string;
  overallScore: string;
  checklistItemIds?: string[];
  items?: ChecklistItem[];
  created_at?: string;
  updated_at?: string;
}

export interface ChecklistData {
  id?: string;
  name: string;
  checklistItemIds: string[];
}

interface InspectionChecklistState {
  inspectionChecklists: Checklist[] | null;
}

const initialState: InspectionChecklistState = {
  inspectionChecklists: null,
};

const inspectionChecklistSlice = createSlice({
  name: "inspectionChecklist",
  initialState,
  reducers: {
    setInspectionChecklists: (state, action: PayloadAction<Checklist[]>) => {
      state.inspectionChecklists = action.payload;
    },
    addInspectionChecklist: (state, action: PayloadAction<Checklist>) => {
      state.inspectionChecklists?.push(action.payload);
    },
    updateInspectionChecklist: (state, action: PayloadAction<Checklist>) => {
      const index = state.inspectionChecklists?.findIndex(
        (inspectionChecklist) => inspectionChecklist.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.inspectionChecklists) {
        state.inspectionChecklists[index] = action.payload;
      }
    },
    removeInspectionChecklist: (state, action: PayloadAction<string>) => {
      state.inspectionChecklists =
        state.inspectionChecklists?.filter(
          (inspectionChecklist) => inspectionChecklist.id !== action.payload
        ) || null;
    },
  },
});

export const {
  setInspectionChecklists,
  addInspectionChecklist,
  updateInspectionChecklist,
  removeInspectionChecklist,
} = inspectionChecklistSlice.actions;
export default inspectionChecklistSlice.reducer;
