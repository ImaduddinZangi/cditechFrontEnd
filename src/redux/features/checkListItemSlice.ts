import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChecklistItem {
  id?: string;
  name: string;
  description: string;
  is_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

interface ChecklistItemState {
  checklistItems: ChecklistItem[] | null;
}

const initialState: ChecklistItemState = {
  checklistItems: null,
};

const checkListItemSlice = createSlice({
  name: "checklistItem",
  initialState,
  reducers: {
    setChecklistItems: (state, action: PayloadAction<ChecklistItem[]>) => {
      state.checklistItems = action.payload;
    },
    addChecklistItem: (state, action: PayloadAction<ChecklistItem>) => {
      state.checklistItems?.push(action.payload);
    },
    updateChecklistItem: (state, action: PayloadAction<ChecklistItem>) => {
      const index = state.checklistItems?.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.checklistItems) {
        state.checklistItems[index] = action.payload;
      }
    },
    removeChecklistItem: (state, action: PayloadAction<string>) => {
      state.checklistItems =
        state.checklistItems?.filter((item) => item.id !== action.payload) || null;
    },
  },
});

export const {
  setChecklistItems,
  addChecklistItem,
  updateChecklistItem,
  removeChecklistItem,
} = checkListItemSlice.actions;
export default checkListItemSlice.reducer;
