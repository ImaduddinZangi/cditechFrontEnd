import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "./clientSlice";
import { Asset } from "./assetSlice";
import { Customer } from "./customerSlice";
import { GetClientUser } from "./clientUserSlice";
import { Checklist, EditChecklist } from "./inspectionChecklistSlice";
import { Invoice } from "./invoiceSlice";
import { Photo } from "../api/uploadPhotosApi";

export interface RoutePoint {
  latitude: number;
  longitude: number;
}

export interface SubmitInvoice {
  inspectionId: string;
  serviceFee: number;
}

export interface SubmitExistingInvoice {
  inspectionId: string;
  serviceFee: number;
  invoiceId: string;
}

export interface EditInspection {
  id?: string;
  name?: string;
  clientId?: string | null;
  status?: string;
  pdfFilePath?: string;
  scheduledDate?: string;
  completedDate?: string | null;
  comments?: string;
  inspectionInterval?: string;
  isReocurring?: boolean;
  checklists?: EditChecklist[];
  route?: RoutePoint[];
  client?: Client;
  assetId?: string;
  serviceFeeId?: string;
  invoice?: Invoice;
  assignedTo?: string;
  customerId?: string;
  createdAt?: string;
  updatedAt?: string;
  reocurrenceEndDate?: string;
}

export interface Inspection {
  id: string;
  inspectionInterval: string;
  reocurrenceEndDate: string | null;
  status: string;
  pdfFilePath: string | null;
  scheduledDate: string;
  completedDate: string | null;
  route: RoutePoint[];
  createdAt: string;
  updatedAt: string;
  checklists: Checklist[];
  client: Client;
  customer: Customer;
  comments: string;
  assignedTo: GetClientUser;
  asset: Asset;
  invoice: Invoice | null;
  serviceFee: number | null;
  photos: Photo[];
  clientId?: string | null;
}

interface InspectionState {
  selectedInspection?: Inspection | null;
  inspections: Inspection[] | null;
}

const initialState: InspectionState = {
  inspections: null,
  selectedInspection: null,
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
