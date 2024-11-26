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
import inspectionReportsReducer from "./features/inspectionReportsSlice";
import inspectionChecklistReducer from "./features/inspectionChecklistSlice";
import checkListItemReducer from "./features/checkListItemSlice";
import userGroupReducer from "./features/userGroupSlice";
import clientUserReducer from "./features/clientUserSlice";
import groupPermissionsReducer from "./features/groupPermissionsSlice";
import invoiceReducer from "./features/invoiceSlice";
import companyReducer from "./features/companySlice";
import serviceReducer from "./features/serviceSlice";
import checklistTemplateReducer from "./features/checklistTemplateSlice";
import packagesReducer from "./features/packagesSlice";
import clientLogsReducer from "./features/clientLogsSlice";
import taskReducer from "./features/taskSlice";
import taskTypeReducer from "./features/taskTypeSlice";
import taskStatusReducer from "./features/taskStatusSlice";
import taskStatusHistoryReducer from "./features/taskStatusHistorySlice";
import taskSettingsReducer from "./features/taskSettingsSlice";

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
import inspectionReportsApi from "./api/inspectionReportsApi";
import userGroupApi from "./api/userGroupApi";
import clientUserApi from "./api/clientUserApi";
import groupPermissionsApi from "./api/groupPermissionsApi";
import invoiceApi from "./api/invoiceApi";
import inspectionChecklistApi from "./api/inspectionChecklistApi";
import companyApi from "./api/companyApi";
import serviceApi from "./api/serviceApi";
import checklistTemplateApi from "./api/checklistTemplateApi";
import packagesApi from "./api/packagesApi";
import clientLogsApi from "./api/clientLogsApi";
import taskApi from "./api/taskApi";
import taskTypeApi from "./api/taskTypeApi";
import taskStatusApi from "./api/taskStatusApi";
import taskStatusHistoryApi from "./api/taskStatusHistoryApi";
import taskSettingsApi from "./api/taskSettingsApi";

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
  inspectionReports: inspectionReportsReducer,
  inspectionChecklists: inspectionChecklistReducer,
  checkListItem: checkListItemReducer,
  userGroup: userGroupReducer,
  clientUser: clientUserReducer,
  groupPermissions: groupPermissionsReducer,
  invoices: invoiceReducer,
  company: companyReducer,
  service: serviceReducer,
  checklistTemplate: checklistTemplateReducer,
  packages: packagesReducer,
  clientLogs: clientLogsReducer,
  task: taskReducer,
  taskType: taskTypeReducer,
  taskStatus: taskStatusReducer,
  taskStatusHistory: taskStatusHistoryReducer,
  taskSettings: taskSettingsReducer,
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
  [inspectionReportsApi.reducerPath]: inspectionReportsApi.reducer,
  [inspectionChecklistApi.reducerPath]: inspectionChecklistApi.reducer,
  [checkListItemApi.reducerPath]: checkListItemApi.reducer,
  [userGroupApi.reducerPath]: userGroupApi.reducer,
  [clientUserApi.reducerPath]: clientUserApi.reducer,
  [groupPermissionsApi.reducerPath]: groupPermissionsApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [checklistTemplateApi.reducerPath]: checklistTemplateApi.reducer,
  [packagesApi.reducerPath]: packagesApi.reducer,
  [clientLogsApi.reducerPath]: clientLogsApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [taskTypeApi.reducerPath]: taskTypeApi.reducer,
  [taskStatusApi.reducerPath]: taskStatusApi.reducer,
  [taskStatusHistoryApi.reducerPath]: taskStatusHistoryApi.reducer,
  [taskSettingsApi.reducerPath]: taskSettingsApi.reducer,
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
      inspectionReportsApi.middleware,
      inspectionChecklistApi.middleware,
      checkListItemApi.middleware,
      userGroupApi.middleware,
      clientUserApi.middleware,
      groupPermissionsApi.middleware,
      invoiceApi.middleware,
      companyApi.middleware,
      serviceApi.middleware,
      checklistTemplateApi.middleware,
      packagesApi.middleware,
      clientLogsApi.middleware,
      taskApi.middleware,
      taskTypeApi.middleware,
      taskStatusApi.middleware,
      taskStatusHistoryApi.middleware,
      taskSettingsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
