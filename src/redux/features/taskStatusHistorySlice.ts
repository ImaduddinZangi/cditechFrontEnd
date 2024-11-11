import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskStatusHistory {
  id?: string;
  taskStatusId: string;
  taskId: string;
  location?: string;
  delayedReason?: string;
}

interface TaskStatusHistoryState {
  taskStatusHistories: TaskStatusHistory[] | null;
}

const initialState: TaskStatusHistoryState = {
  taskStatusHistories: null,
};

const taskStatusHistorySlice = createSlice({
  name: "taskStatusHistory",
  initialState,
  reducers: {
    setTaskStatusHistories: (state, action: PayloadAction<TaskStatusHistory[]>) => {
      state.taskStatusHistories = action.payload;
    },
    addTaskStatusHistory: (state, action: PayloadAction<TaskStatusHistory>) => {
      state.taskStatusHistories?.push(action.payload);
    },
    updateTaskStatusHistory: (state, action: PayloadAction<TaskStatusHistory>) => {
      const index = state.taskStatusHistories?.findIndex(
        (history) => history.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.taskStatusHistories) {
        state.taskStatusHistories[index] = action.payload;
      }
    },
    removeTaskStatusHistory: (state, action: PayloadAction<string>) => {
      state.taskStatusHistories = state.taskStatusHistories?.filter(
        (history) => history.id !== action.payload
      ) || null;
    },
  },
});

export const {
  setTaskStatusHistories,
  addTaskStatusHistory,
  updateTaskStatusHistory,
  removeTaskStatusHistory,
} = taskStatusHistorySlice.actions;
export default taskStatusHistorySlice.reducer;
