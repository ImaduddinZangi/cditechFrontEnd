import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "./clientSlice";
import { Asset } from "./assetSlice";
import { Customer } from "./customerSlice";
import { GetClientUser } from "./clientUserSlice";
import { Checklist } from "./inspectionChecklistSlice";

export interface RoutePoint {
  latitude: number;
  longitude: number;
}

export interface CreateInspection {
  id?: string;
  clientId?: string | null;
  customerId: string;
  assetId: string;
  assignedTo: string;
  status: string;
  scheduledDate: string;
  isReocurring?: boolean;
  inspectionInterval?: number;
  reocurrenceEndDate?: string;
  route?: RoutePoint[];
  checklists?: string[];
}

export interface Inspection {
  id: string;
  name: string;
  clientId: string | null;
  status: string;
  pdfFilePath: string;
  scheduledDate: string;
  completedDate: string | null;
  comments: string;
  inspectionInterval: number;
  isReocurring: boolean;
  reocurrenceEndDate?: string;
  checklists: Checklist[];
  route: RoutePoint[];
  client: Client;
  asset: Asset;
  assignedTo: GetClientUser;
  customer: Customer;
  createdAt: string;
  updatedAt: string;
}

interface InspectionState {
  inspections: Inspection[] | null;
}

const initialState: InspectionState = {
  inspections: null,
};

const inspectionSlice = createSlice({
  name: "inspection",
  initialState,
  reducers: {
    setInspections: (state, action: PayloadAction<Inspection[]>) => {
      state.inspections = action.payload;
    },
    addInspection: (state, action: PayloadAction<Inspection>) => {
      state.inspections?.push(action.payload);
    },
    updateInspection: (state, action: PayloadAction<Inspection>) => {
      const index = state.inspections?.findIndex(
        (inspection) => inspection.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.inspections) {
        state.inspections[index] = action.payload;
      }
    },
    removeInspection: (state, action: PayloadAction<string>) => {
      state.inspections =
        state.inspections?.filter(
          (inspection) => inspection.id !== action.payload
        ) || null;
    },
  },
});

export const {
  setInspections,
  addInspection,
  updateInspection,
  removeInspection,
} = inspectionSlice.actions;
export default inspectionSlice.reducer;
