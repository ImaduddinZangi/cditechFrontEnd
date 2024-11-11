import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskType {
  id?: string;
  name: string;
  pairedServiceFeeId?: string;
  pairedServiceFeeQuantityRequired?: boolean;
  taskWeight?: number;
  baseTaskWorkTime?: number;
  categories?: string;
}

interface TaskTypeState {
  taskTypes: TaskType[] | null;
}

const initialState: TaskTypeState = {
  taskTypes: null,
};

const taskTypeSlice = createSlice({
  name: "taskType",
  initialState,
  reducers: {
    setTaskTypes: (state, action: PayloadAction<TaskType[]>) => {
      state.taskTypes = action.payload;
    },
    addTaskType: (state, action: PayloadAction<TaskType>) => {
      state.taskTypes?.push(action.payload);
    },
    updateTaskType: (state, action: PayloadAction<TaskType>) => {
      const index = state.taskTypes?.findIndex((taskType) => taskType.id === action.payload.id);
      if (index !== undefined && index !== -1 && state.taskTypes) {
        state.taskTypes[index] = action.payload;
      }
    },
    removeTaskType: (state, action: PayloadAction<string>) => {
      state.taskTypes = state.taskTypes?.filter((taskType) => taskType.id !== action.payload) || null;
    },
  },
});

export const { setTaskTypes, addTaskType, updateTaskType, removeTaskType } = taskTypeSlice.actions;
export default taskTypeSlice.reducer;
