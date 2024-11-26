import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "./clientSlice";

export interface TaskSettings {
    id: string;
    client: Client;
    autoAssignUsersToTask: boolean;
    maxInProgressTasksPerUser: number;
    allowUsersToCompleteBillTask: boolean;
    assignUserToTaskUsingSchedules: boolean;
    enableTaskWeights: boolean;
    captureTaskStatusGpsLocation: boolean;
    automaticTaskArrivalStatus: boolean;
    automaticTaskInvoiceCreation: boolean;
    taskInvoiceTheme?: string;
    taskWeather: boolean;
    createdAt: string;
    updatedAt: string;
}

interface TaskSettingsState {
    taskSettings: TaskSettings[] | null;
}

const initialState: TaskSettingsState = {
    taskSettings: null,
};

const taskSettingsSlice = createSlice({
    name: "taskSettings",
    initialState,
    reducers: {
        setTaskSettings: (state, action: PayloadAction<TaskSettings[]>) => {
            state.taskSettings = action.payload;
        },
        addTaskSettings: (state, action: PayloadAction<TaskSettings>) => {
            state.taskSettings?.push(action.payload);
        },
        updateTaskSettings: (state, action: PayloadAction<TaskSettings>) => {
            const index = state.taskSettings?.findIndex((taskSettings) => taskSettings.id === action.payload.id);
            if (index !== undefined && index !== -1 && state.taskSettings) {
                state.taskSettings[index] = action.payload;
            }
        },
        removeTaskSettings: (state, action: PayloadAction<string>) => {
            state.taskSettings = state.taskSettings?.filter((taskSettings) => taskSettings.id !== action.payload) || null;
        },
    },
});

export const { setTaskSettings, addTaskSettings, updateTaskSettings, removeTaskSettings } = taskSettingsSlice.actions;
export default taskSettingsSlice.reducer;

