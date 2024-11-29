import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetClientUser } from "./clientUserSlice";

export interface ClientSessions {
    id: string;
    ip_address: string;
    ip_type: string;
    device_type: string;
    browser_type: string;
    gps_location: null;
    ip_location: string;
    session_token: string;
    expires_at: string;
    created_at: string;
    user: GetClientUser;
}

interface ClientSessionsState {
    clientSessions: ClientSessions[] | null;
}

const initialState: ClientSessionsState = {
    clientSessions: null,
};

const clientSessionsSlice = createSlice({
    name: "clientSessions",
    initialState,
    reducers: {
        setClientSessions: (state, action: PayloadAction<ClientSessions[]>) => {
            state.clientSessions = action.payload;
        },
        addClientSessions: (state, action: PayloadAction<ClientSessions>) => {
            state.clientSessions?.push(action.payload);
        },
        updateClientSessions: (state, action: PayloadAction<ClientSessions>) => {
            const index = state.clientSessions?.findIndex(
                (pkg) => pkg.id === action.payload.id
            );
            if (index !== undefined && index !== -1 && state.clientSessions) {
                state.clientSessions[index] = action.payload;
            }
        },
        removeClientSessions: (state, action: PayloadAction<string>) => {
            state.clientSessions = state.clientSessions?.filter(
                (pkg) => pkg.id !== action.payload
            ) || null;
        },
    },
});

export const { setClientSessions, addClientSessions, updateClientSessions, removeClientSessions } =
    clientSessionsSlice.actions;
export default clientSessionsSlice.reducer;
