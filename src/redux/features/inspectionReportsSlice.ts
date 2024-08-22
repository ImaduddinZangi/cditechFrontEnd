import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InspectionReport {
  id: string;
  clientId: string;
  inspectionId: string;
  filePath: string;
  createdAt?: string;
  updatedAt?: string;
}

interface InspectionReportsState {
  reports: InspectionReport[] | null;
}

const initialState: InspectionReportsState = {
  reports: null,
};

const inspectionReportsSlice = createSlice({
  name: 'inspectionReports',
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<InspectionReport[]>) => {
      state.reports = action.payload;
    },
    addReport: (state, action: PayloadAction<InspectionReport>) => {
      state.reports?.push(action.payload);
    },
    updateReport: (state, action: PayloadAction<InspectionReport>) => {
      const index = state.reports?.findIndex((report) => report.id === action.payload.id);
      if (index !== undefined && index !== -1 && state.reports) {
        state.reports[index] = action.payload;
      }
    },
    removeReport: (state, action: PayloadAction<string>) => {
      state.reports = state.reports?.filter((report) => report.id !== action.payload) || null;
    },
  },
});

export const { setReports, addReport, updateReport, removeReport } = inspectionReportsSlice.actions;
export default inspectionReportsSlice.reducer;
