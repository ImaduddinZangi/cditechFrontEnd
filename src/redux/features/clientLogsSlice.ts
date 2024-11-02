import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientUser } from "./clientUserSlice";

export interface ClientLogDetails {
    details: string;
    logLevel: string;
    ipAddress: string;
}

export interface ClientLogs {
    id: string;
    action: string;
    timestamp: string;
    logLevel: string;
    details: ClientLogDetails;
    user: ClientUser;
}

interface ClientLogsState {
    clientLogs: ClientLogs[] | null;
}

const initialState: ClientLogsState = {
    clientLogs: null,
};

const clientLogsSlice = createSlice({
    name: "clientLogs",
    initialState,
    reducers: {
        setClientLogs: (state, action: PayloadAction<ClientLogs[]>) => {
            state.clientLogs = action.payload;
        },
        addClientLogs: (state, action: PayloadAction<ClientLogs>) => {
            state.clientLogs?.push(action.payload);
        },
        updateClientLogs: (state, action: PayloadAction<ClientLogs>) => {
            const index = state.clientLogs?.findIndex(
                (pkg) => pkg.id === action.payload.id
            );
            if (index !== undefined && index !== -1 && state.clientLogs) {
                state.clientLogs[index] = action.payload;
            }
        },
        removeClientLogs: (state, action: PayloadAction<string>) => {
            state.clientLogs = state.clientLogs?.filter(
                (pkg) => pkg.id !== action.payload
            ) || null;
        },
    },
});

export const { setClientLogs, addClientLogs, updateClientLogs, removeClientLogs } =
    clientLogsSlice.actions;
export default clientLogsSlice.reducer;
