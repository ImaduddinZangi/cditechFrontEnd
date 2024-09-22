import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "./clientSlice";
import { Customer } from "./customerSlice";
import { Inspection } from "./inspectionSlice";

export interface InvoiceItem {
  amount: number;
  description: string;
  inspectionId: string;
  pdfReportPath: string;
}

export interface Invoice {
  id?: string;
  quickbooks_invoice_id: string;
  status: string;
  amount_due: string;
  amount_paid: string;
  balance: string;
  due_date: string;
  paid_date?: string | null;
  quickbooks_invoice_number: string;
  quickbooks_invoice_url?: string | null;
  quickbooks_sync_status: string;
  items?: InvoiceItem[] | null;
  created_at?: string;
  updated_at?: string;
  client?: Client;
  customer?: Customer;
  inspection?: Inspection;
}

interface InvoiceState {
  invoices: Invoice[] | null;
}

const initialState: InvoiceState = {
  invoices: null,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = action.payload;
    },
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices?.push(action.payload);
    },
    updateInvoice: (state, action: PayloadAction<Invoice>) => {
      const index = state.invoices?.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.invoices) {
        state.invoices[index] = action.payload;
      }
    },
    removeInvoice: (state, action: PayloadAction<string>) => {
      state.invoices =
        state.invoices?.filter((invoice) => invoice.id !== action.payload) ||
        null;
    },
  },
});

export const { setInvoices, addInvoice, updateInvoice, removeInvoice } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
