import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskStatus {
  id?: string;
  name: string;
  color?: string;
  isPastDueProtected?: boolean;
}

interface TaskStatusState {
  taskStatuses: TaskStatus[] | null;
}

const initialState: TaskStatusState = {
  taskStatuses: null,
};

const taskStatusSlice = createSlice({
  name: "taskStatus",
  initialState,
  reducers: {
    setTaskStatuses: (state, action: PayloadAction<TaskStatus[]>) => {
      state.taskStatuses = action.payload;
    },
    addTaskStatus: (state, action: PayloadAction<TaskStatus>) => {
      state.taskStatuses?.push(action.payload);
    },
    updateTaskStatus: (state, action: PayloadAction<TaskStatus>) => {
      const index = state.taskStatuses?.findIndex((status) => status.id === action.payload.id);
      if (index !== undefined && index !== -1 && state.taskStatuses) {
        state.taskStatuses[index] = action.payload;
      }
    },
    removeTaskStatus: (state, action: PayloadAction<string>) => {
      state.taskStatuses = state.taskStatuses?.filter((status) => status.id !== action.payload) || null;
    },
  },
});

export const { setTaskStatuses, addTaskStatus, updateTaskStatus, removeTaskStatus } = taskStatusSlice.actions;
export default taskStatusSlice.reducer;
