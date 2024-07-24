import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";

import userReducer from "./features/userSlice";
import clientReducer from "./features/clientSlice";
import customerReducer from "./features/customerSlice";
import assetReducer from "./features/assetSlice";
import assetTypeReducer from "./features/assetTypeSlice";

import { authApi } from "./api/authApi";
import clientApi from "./api/clientApi";
import customerApi from "./api/customerApi";
import assetApi from "./api/assetApi";
import assetTypeApi from "./api/assetTypeApi";

const rootReducer = combineReducers({
  user: userReducer,
  client: clientReducer,
  customer: customerReducer,
  asset: assetReducer,
  assetType: assetTypeReducer,
  [authApi.reducerPath]: authApi.reducer,
  [clientApi.reducerPath]: clientApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [assetApi.reducerPath]: assetApi.reducer,
  [assetTypeApi.reducerPath]: assetTypeApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      clientApi.middleware,
      customerApi.middleware,
      assetApi.middleware,
      assetTypeApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
