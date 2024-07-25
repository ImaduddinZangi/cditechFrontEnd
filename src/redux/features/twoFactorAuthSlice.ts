import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TwoFactorAuthState {
  qrCode: string | null;
  twoFactorEnabled: boolean;
  error: string | null;
}

const initialState: TwoFactorAuthState = {
  qrCode: null,
  twoFactorEnabled: false,
  error: null,
};

const twoFactorAuthSlice = createSlice({
  name: "twoFactorAuth",
  initialState,
  reducers: {
    generateQrCodeStart(state) {
      state.error = null;
    },
    generateQrCodeSuccess(state, action: PayloadAction<string>) {
      state.qrCode = action.payload;
    },
    generateQrCodeFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    verifyCodeStart(state) {
      state.error = null;
    },
    verifyCodeSuccess(state) {
      state.twoFactorEnabled = true;
    },
    verifyCodeFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    disableTwoFactor(state) {
      state.twoFactorEnabled = false;
    }
  },
});

export const {
  generateQrCodeStart,
  generateQrCodeSuccess,
  generateQrCodeFailure,
  verifyCodeStart,
  verifyCodeSuccess,
  verifyCodeFailure,
  disableTwoFactor
} = twoFactorAuthSlice.actions;

export const selectTwoFactorAuth = (state: RootState) => state.twoFactorAuth;

export default twoFactorAuthSlice.reducer;
