import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "./taskTypeSlice";
import { Asset } from "./assetSlice";
import { GetClientUser } from "./clientUserSlice";
import { TaskStatus } from "./taskStatusSlice";
import { Customer } from "./customerSlice";
import { Client } from "./clientSlice";

export interface UpdateTask {
  taskId: string;
  statusId: string;
  clientId: string;
  userId: string;
  location?: string;
  delayedReason?: string;
}

export interface Task {
  id?: string;
  customerId: string;
  taskTypeId?: string;
  taskPriority?: 'Emergency' | 'High' | 'Normal' | 'Low';
  taskInterval: 'One-Time' | 'Daily' | 'Bi-Monthly' | 'Monthly' | 'Quarterly' | 'Annual';
  dueDate: string;
  reoccurringEndDate?: string;
  assetIds: string[];
  assignedUserIds: string[];
  taskSetId?: string;
  autoAssign?: boolean;
  autoAssignMethod?: 'User Group' | 'Division';
  quickbooksInvoiceNumber?: string;
}

export interface GetTask {
  taskId: string;
  taskPriority: string;
  taskInterval: string;
  taskSetId: string;
  reoccurringEndDate: string;
  dueDate: string;
  taskType: TaskType;
  assets: Asset[];
  assignedUsers: GetClientUser[];
  taskStatus: TaskStatus;
  quickbooksInvoiceNumber: string | null;
  weather: string | null;
  id: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  client: Client;
  createdByUser: GetClientUser;
  customer: Customer;
}


interface TaskState {
  tasks: Task[] | null;
}

const initialState: TaskState = {
  tasks: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks?.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks?.findIndex((task) => task.id === action.payload.id);
      if (index !== undefined && index !== -1 && state.tasks) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks?.filter((task) => task.id !== action.payload) || null;
    },
  },
});

export const { setTasks, addTask, updateTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
