import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UploadPhotoState {
  isUploading: boolean;
  error: string | null;
}

const initialState: UploadPhotoState = {
  isUploading: false,
  error: null,
};

const uploadPhotosSlice = createSlice({
  name: "uploadPhotos",
  initialState,
  reducers: {
    uploadPhotoStart: (state) => {
      state.isUploading = true;
      state.error = null;
    },
    uploadPhotoSuccess: (state) => {
      state.isUploading = false;
    },
    uploadPhotoFailure: (state, action: PayloadAction<string>) => {
      state.isUploading = false;
      state.error = action.payload;
    },
  },
});

export const { uploadPhotoStart, uploadPhotoSuccess, uploadPhotoFailure } = uploadPhotosSlice.actions;
export default uploadPhotosSlice.reducer;
