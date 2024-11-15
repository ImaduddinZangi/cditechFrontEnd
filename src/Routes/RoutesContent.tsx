import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../Middleware/ProtectedRoutes";
import Error500 from "../Components/Constants/Error500";
import Error404 from "../Components/Constants/Error404";
import Loader from "../Components/Constants/Loader";
const ClientSignInPage = lazy(() => import("../Pages/Auth/ClientSignInPage"));
const ClientDashboardPage = lazy(
  () => import("../Pages/ClientProfile/ClientDashboardPage")
);
const ManagementSignInPage = lazy(
  () => import("../Pages/Auth/ManagementSignInPage")
);
const ManageCustomersPage = lazy(
  () => import("../Pages/Customer/ManageCustomersPage")
);
const ClientRegistrationPage = lazy(
  () => import("../Pages/Auth/ClientRegistrationPage")
);
const AddInspectionPage = lazy(
  () => import("../Pages/Inspection/AddInspectionPage")
);
const AddCustomerPage = lazy(() => import("../Pages/Customer/AddCustomerPage"));
const AddAssetsPage = lazy(
  () => import("../Pages/Customer/Asset/AddAssetsPage")
);
const AddPumpBrandPage = lazy(
  () => import("../Pages/Customer/Pump/AddPumpBrandPage")
);
const ManageCustomerPage = lazy(
  () => import("../Pages/Customer/ManageCustomerPage")
);
const TwoFactorAuthPage = lazy(() => import("../Pages/Auth/twoFactorAuthPage"));
const EditCustomerPage = lazy(
  () => import("../Pages/Customer/EditCustomerPage")
);
const EditAssetPage = lazy(
  () => import("../Pages/Customer/Asset/EditAssetPage")
);
const ClientProfilePage = lazy(
  () => import("../Pages/ClientProfile/ClientProfilePage")
);
const InspectionReportsPage = lazy(
  () => import("../Pages/Inspection/InspectionReportsPage")
);
const ManageInspectionsPage = lazy(
  () => import("../Pages/Inspection/ManageInspectionsPage")
);
const EditInspectionPage = lazy(
  () => import("../Pages/Inspection/EditInspectionPage")
);
const ManagePumpBrandsPage = lazy(
  () => import("../Pages/Customer/Pump/ManagePumpBrandsPage")
);
const InspectionDetailsPage = lazy(
  () => import("../Pages/Inspection/InspectionDetailsPage")
);
const AssetDetailsPage = lazy(
  () => import("../Pages/Customer/Asset/AssetDetailsPage")
);
const AddUserGroupPage = lazy(
  () => import("../Pages/UserGroups/Groups/AddUserGroupPage")
);
const EditPumpBrandPage = lazy(
  () => import("../Pages/Customer/Pump/EditPumpBrandPage")
);
const EditUserGroupPage = lazy(
  () => import("../Pages/UserGroups/Groups/EditUserGroupPage")
);
const UserGroupTablePage = lazy(
  () => import("../Pages/UserGroups/Groups/UserGroupTablePage")
);
const AddClientUserPage = lazy(
  () => import("../Pages/UserGroups/Users/AddClientUserPage")
);
const EditClientUserPage = lazy(
  () => import("../Pages/UserGroups/Users/EditClientUserPage")
);
const ClientUserTablePage = lazy(
  () => import("../Pages/UserGroups/Users/ClientUserTablePage")
);
const GrantGroupPermissionsPage = lazy(
  () => import("../Pages/UserGroups/Groups/GrantGroupPermissionsPage")
);
const UserGroupDetailsPage = lazy(
  () => import("../Pages/UserGroups/Groups/UserGroupDetailsPage")
);
const InvoiceTablePage = lazy(
  () => import("../Pages/Inspection/InvoiceTablePage")
);
const EditGroupPermissionsPage = lazy(
  () => import("../Pages/UserGroups/Groups/EditGroupPermissionsPage")
);
const InvoiceDetailsPage = lazy(
  () => import("../Pages/Inspection/InvoiceDetailsPage")
);
const ForgotPasswordPage = lazy(
  () => import("../Pages/Auth/ForgotPasswordPage")
);
const NewPasswordPage = lazy(() => import("../Pages/Auth/NewPasswordPage"));
const ViewFullMapPage = lazy(() => import("../Pages/Extras/ViewFullMapPage"));
const ManageServicesPage = lazy(
  () => import("../Pages/Services/ManageServicesPage")
);
const ManageServicePage = lazy(
  () => import("../Pages/Services/ManageServicePage")
);
const MyFeePlanPage = lazy(() => import("../Pages/Extras/MyFeePlanPage"));
const BackupCodesPage = lazy(() => import("../Pages/Auth/BackupCodesPage"));
const EnterSMSCodePage = lazy(() => import("../Pages/Auth/EnterSMSCodePage"));
const OtherOptionsInitialPage = lazy(
  () => import("../Pages/Auth/OtherOptionsInitialPage")
);
const TwoFactorSetupPage = lazy(
  () => import("../Pages/Auth/TwoFactorSetupPage")
);
const UseBackupCodePage = lazy(() => import("../Pages/Auth/UseBackupCodePage"));
const VerifyPhoneNumberPage = lazy(
  () => import("../Pages/Auth/VerifyPhoneNumberPage")
);
const PumpBrandDetailsPage = lazy(
  () => import("../Pages/Customer/Pump/PumpBrandDetailsPage")
);
const AddInspectionChecklistPage = lazy(
  () => import("../Pages/Inspection/AddInspectionChecklistPage")
);
const ClientLogsTablePage = lazy(
  () => import("../Pages/Logs/ClientLogsTablePage")
);
const ManagementLogsTablePage = lazy(
  () => import("../Pages/Logs/ManagementLogsTablePage")
);
const ClientUsersSessionsTablePage = lazy(
  () => import("../Pages/Logs/ClientUsersSessionsTablePage")
);
const EditPumpPage = lazy(() => import("../Pages/Customer/Pump/EditPumpPage"));
const AddServicePage = lazy(() => import("../Pages/Services/AddServicePage"));
const ViewCustomersMapPage = lazy(() => import("../Pages/Customer/ViewCustomersMapPage"));
const UpdateCompanyPage = lazy(() => import("../Pages/ClientProfile/UpdateCompanyPage"));
const FeePlansPage = lazy(() => import("../Pages/Packages/FeePlansPage"));
const TaskDashboardPage = lazy(() => import("../Pages/Tasks/TaskDashboardPage"));
const AddTaskTypePage = lazy(() => import("../Pages/Tasks/AddTaskTypePage"));
const AddTaskPage = lazy(() => import("../Pages/Tasks/AddTaskPage"));
const AddTaskInvoicePage = lazy(() => import("../Pages/Tasks/AddTaskInvoicePage"));
const ManageTasksPage = lazy(() => import("../Pages/Tasks/ManageTasksPage"));

const RoutesContent: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex flex-row justify-center items-center">
          <Loader text="Loading lazy..." />
        </div>
      }
    >
      <Routes>
        {/* Error 500 */}
        <Route path="/error/500" element={<Error500 />} />

        {/* Authentication */}
        <Route path="/" element={<ClientSignInPage />} />
        <Route path="/client-login" element={<ClientSignInPage />} />
        <Route path="/management-login" element={<ManagementSignInPage />} />
        <Route
          path="/client-registration"
          element={<ClientRegistrationPage />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/new-password" element={<NewPasswordPage />} />
        <Route path="/backup-codes" element={<BackupCodesPage />} />
        <Route path="/sms-code" element={<EnterSMSCodePage />} />
        <Route path="/other-options" element={<OtherOptionsInitialPage />} />
        <Route path="/two-factor-setup" element={<TwoFactorSetupPage />} />
        <Route path="/use-backup-code" element={<UseBackupCodePage />} />
        <Route
          path="/verify-phone-number"
          element={<VerifyPhoneNumberPage />}
        />
        <Route element={<ProtectedRoute />}>
          {/* Protected Routes */}
          <Route path="/2fa" element={<TwoFactorAuthPage />} />

          {/* Client */}
          <Route path="/client-dashboard" element={<ClientDashboardPage />} />
          <Route path="/client-profile" element={<ClientProfilePage />} />
          <Route path="/update-company" element={<UpdateCompanyPage />} />

          {/* Customer */}
          <Route path="/manage-customer" element={<ManageCustomerPage />} />
          <Route path="/add-customer" element={<AddCustomerPage />} />
          <Route
            path="/edit-customer/:customerId"
            element={<EditCustomerPage />}
          />
          <Route path="/manage-customers" element={<ManageCustomersPage />} />
          <Route path="/customers-map" element={<ViewCustomersMapPage />} />

          {/* Asset */}
          <Route path="/add-asset" element={<AddAssetsPage />} />
          <Route path="/edit-asset/:id" element={<EditAssetPage />} />
          <Route
            path="/asset-details/:assetId"
            element={<AssetDetailsPage />}
          />

          {/* Pump */}
          <Route path="/add-pump-brand" element={<AddPumpBrandPage />} />
          <Route
            path="/edit-pump-brand/:pumpId"
            element={<EditPumpBrandPage />}
          />
          <Route
            path="/manage-pump-brands"
            element={<ManagePumpBrandsPage />}
          />
          <Route
            path="/pump-brand-detail/:pumpBrandId"
            element={<PumpBrandDetailsPage />}
          />
          <Route path="/edit-pump/:pumpId" element={<EditPumpPage />} />
          {/* Inspection */}
          <Route path="/add-inspection" element={<AddInspectionPage />} />
          <Route
            path="/inspection-checklist/:inspectionId"
            element={<AddInspectionChecklistPage />}
          />
          <Route
            path="/inspection-reports"
            element={<InspectionReportsPage />}
          />
          <Route
            path="/manage-inspections"
            element={<ManageInspectionsPage />}
          />
          <Route path="/manage-invoices" element={<InvoiceTablePage />} />
          <Route path="/invoice/:invoiceId" element={<InvoiceDetailsPage />} />
          <Route
            path="/update-inspection/:inspectionId"
            element={<EditInspectionPage />}
          />
          <Route
            path="/inspection-details/:inspectionId"
            element={<InspectionDetailsPage />}
          />

          {/* UserGroups */}
          <Route path="/add-user-group" element={<AddUserGroupPage />} />
          <Route
            path="/edit-user-group/:userGroupId"
            element={<EditUserGroupPage />}
          />
          <Route path="/manage-user-groups" element={<UserGroupTablePage />} />
          <Route
            path="/user-group-details/:userGroupId"
            element={<UserGroupDetailsPage />}
          />
          <Route
            path="/user-group-details/:groupId/edit-permission/:permissionId"
            element={<EditGroupPermissionsPage />}
          />
          <Route
            path="/user-group-permissions"
            element={<GrantGroupPermissionsPage />}
          />
          <Route path="/add-client-user" element={<AddClientUserPage />} />
          <Route
            path="/edit-client-user/:clientUserId"
            element={<EditClientUserPage />}
          />
          <Route path="/manage-users" element={<ClientUserTablePage />} />

          {/* LOGS */}
          <Route
            path="/client-logs-dashboard"
            element={<ClientLogsTablePage />}
          />
          <Route
            path="/management-logs-dashboard"
            element={<ManagementLogsTablePage />}
          />
          <Route
            path="/client-users-sessions"
            element={<ClientUsersSessionsTablePage />}
          />

          {/* Services */}
          <Route path="/manage-service" element={<ManageServicePage />} />
          <Route path="/manage-services" element={<ManageServicesPage />} />
          <Route path="/add-service" element={<AddServicePage />} />

          {/* Fee Plans */}
          <Route path="/fee-plans" element={<FeePlansPage />} />

          {/* Tasks */}
          <Route path="task-dashboard" element={<TaskDashboardPage />} />
          <Route path="manage-tasks" element={<ManageTasksPage />} />
          <Route path="add-task-type" element={<AddTaskTypePage />} />
          <Route path="add-task" element={<AddTaskPage />} />
          <Route path="add-task-invoice" element={<AddTaskInvoicePage />} />

          {/* EXTRAS */}
          <Route path="/full-view-map" element={<ViewFullMapPage />} />
          <Route path="/my-fee-plan" element={<MyFeePlanPage />} />
        </Route>

        {/* Catch-all for 404 errors */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesContent;
