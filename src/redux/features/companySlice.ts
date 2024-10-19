import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Company {
  id?: string;
  company_name: string;
  company_type: string;
  industry: string;
  company_logo: string;
  address: string;
  billing_address: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  phone2: string;
  email: string;
  website: string;
  payment_method: string;
  clientId?: string;
  created_at?: string;
  updated_at?: string;
}


interface CompanyState {
  companies: Company[] | null;
}

const initialState: CompanyState = {
  companies: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies?.push(action.payload);
    },
    updateCompany: (state, action: PayloadAction<Company>) => {
      const index = state.companies?.findIndex(
        (company) => company.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.companies) {
        state.companies[index] = action.payload;
      }
    },
    removeCompany: (state, action: PayloadAction<string>) => {
      state.companies =
        state.companies?.filter((company) => company.id !== action.payload) ||
        null;
    },
  },
});

export const { setCompanies, addCompany, updateCompany, removeCompany } =
  companySlice.actions;
export default companySlice.reducer;
