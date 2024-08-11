import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";

import userReducer from "./features/userSlice";
import clientReducer from "./features/clientSlice";
import customerReducer from "./features/customerSlice";
import assetReducer from "./features/assetSlice";
import assetTypeReducer from "./features/assetTypeSlice";
import pumpReducer from "./features/pumpSlice";
import pumpBrandReducer from "./features/pumpBrandSlice";
import uploadPhotosReducer from "./features/uploadPhotosSlice";
import twoFactorAuthReducer from "./features/twoFactorAuthSlice";
import inspectionReducer from "./features/inspectionSlice";
import checkListItemReducer from "./features/checkListItemSlice";

import { authApi } from "./api/authApi";
import clientApi from "./api/clientApi";
import customerApi from "./api/customerApi";
import assetApi from "./api/assetApi";
import assetTypeApi from "./api/assetTypeApi";
import pumpBrandApi from "./api/pumpBrandApi";
import pumpApi from "./api/pumpApi";
import uploadPhotosApi from "./api/uploadPhotosApi";
import twoFactorAuthApi from "./api/twoFactorAuthApi";
import inspectionApi from "./api/inspectionApi";
import checkListItemApi from "./api/checkListItemApi";

const rootReducer = combineReducers({
  user: userReducer,
  client: clientReducer,
  customer: customerReducer,
  asset: assetReducer,
  assetType: assetTypeReducer,
  pump: pumpReducer,
  pumpBrand: pumpBrandReducer,
  uploadPhotos: uploadPhotosReducer,
  twoFactorAuth: twoFactorAuthReducer,
  inspection: inspectionReducer,
  checkListItem: checkListItemReducer,
  [authApi.reducerPath]: authApi.reducer,
  [clientApi.reducerPath]: clientApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [assetApi.reducerPath]: assetApi.reducer,
  [assetTypeApi.reducerPath]: assetTypeApi.reducer,
  [pumpApi.reducerPath]: pumpApi.reducer,
  [pumpBrandApi.reducerPath]: pumpBrandApi.reducer,
  [uploadPhotosApi.reducerPath]: uploadPhotosApi.reducer,
  [twoFactorAuthApi.reducerPath]: twoFactorAuthApi.reducer,
  [inspectionApi.reducerPath]: inspectionApi.reducer,
  [checkListItemApi.reducerPath]: checkListItemApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      clientApi.middleware,
      customerApi.middleware,
      assetApi.middleware,
      assetTypeApi.middleware,
      pumpApi.middleware,
      pumpBrandApi.middleware,
      uploadPhotosApi.middleware,
      inspectionApi.middleware,
      checkListItemApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
