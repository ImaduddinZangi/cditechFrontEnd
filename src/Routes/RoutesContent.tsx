import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../Middleware/ProtectedRoutes";
import ClientSignInPage from "../Pages/Auth/ClientSignInPage";
import ClientDashboardPage from "../Pages/ClientDashboard/ClientDashboardPage";
import ManagementSignInPage from "../Pages/Auth/ManagementSignInPage";
import CustomerTablePage from "../Pages/Customer/CustomerTablePage";
import ClientRegistrationPage from "../Pages/Auth/ClientRegistrationPage";
import AddInspectionPage from "../Pages/Inspection/AddInspectionPage";
import AddCustomerPage from "../Pages/Customer/AddCustomerPage";
import AddAssetsPage from "../Pages/Customer/Asset/AddAssetsPage";
import AddPumpBrandPage from "../Pages/Customer/Pump/AddPumpBrandPage";
import ManageCustomerPage from "../Pages/Customer/ManageCustomerPage";
import AddPhotosPage from "../Pages/Customer/AddPhotosPage";
import TwoFactorAuthPage from "../Pages/Auth/twoFactorAuthPage";
import EditCustomerPage from "../Pages/Customer/EditCustomerPage";
import EditAssetPage from "../Pages/Customer/Asset/EditAssetPage";
import ClientProfilePage from "../Pages/ClientDashboard/ClientProfilePage";
import InspectionReportsPage from "../Pages/Inspection/InspectionReportsPage";
import InspectionTablePage from "../Pages/Inspection/InspectionTablePage";
import EditInspectionPage from "../Pages/Inspection/EditInspectionPage";
import PumpBrandsTablePage from "../Pages/Customer/Pump/PumpBrandsTablePage";
import InspectionDetailsPage from "../Pages/Inspection/InspectionDetailsPage";
import AssetDetailsPage from "../Pages/Customer/Asset/AssetDetailsPage";
import AddUserGroupPage from "../Pages/UserGroups/Groups/AddUserGroupPage";
import EditPumpBrandPage from "../Pages/Customer/Pump/EditPumpBrandPage";
import EditUserGroupPage from "../Pages/UserGroups/Groups/EditUserGroupPage";
import UserGroupTablePage from "../Pages/UserGroups/Groups/UserGroupTablePage";
import AddClientUserPage from "../Pages/UserGroups/Users/AddClientUserPage";
import EditClientUserPage from "../Pages/UserGroups/Users/EditClientUserPage";
import ClientUserTablePage from "../Pages/UserGroups/Users/ClientUserTablePage";
import GrantGroupPermissionsPage from "../Pages/UserGroups/Groups/GrantGroupPermissionsPage";
import UserGroupDetailsPage from "../Pages/UserGroups/Groups/UserGroupDetailsPage";
import InvoiceTablePage from "../Pages/Inspection/InvoiceTablePage";
import EditGroupPermissionsPage from "../Pages/UserGroups/Groups/EditGroupPermissionsPage";
import ReportedInspectionTablePage from "../Pages/Inspection/ReportedInspectionTablePage";
import InvoiceDetailsPage from "../Pages/Inspection/InvoiceDetailsPage";

const RoutesContent: React.FC = () => {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/" element={<ClientSignInPage />} />
      <Route path="/client-login" element={<ClientSignInPage />} />
      <Route path="/management-login" element={<ManagementSignInPage />} />
      <Route path="/client-registration" element={<ClientRegistrationPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/2fa" element={<TwoFactorAuthPage />} />
        {/* Client */}
        <Route path="/client-dashboard" element={<ClientDashboardPage />} />
        <Route path="/client-profile" element={<ClientProfilePage />} />
        {/* Customer */}
        <Route path="/manage-customer" element={<ManageCustomerPage />} />
        <Route path="/add-customer" element={<AddCustomerPage />} />
        <Route
          path="/edit-customer/:customerId"
          element={<EditCustomerPage />}
        />
        <Route path="/customer-table" element={<CustomerTablePage />} />
        {/* Asset */}
        <Route path="/add-asset" element={<AddAssetsPage />} />
        <Route path="/edit-asset/:id" element={<EditAssetPage />} />
        <Route path="/asset-details/:assetId" element={<AssetDetailsPage />} />
        {/* Pump */}
        <Route path="/add-pump-brand" element={<AddPumpBrandPage />} />
        <Route path="/edit-pump-brand/:pumpId" element={<EditPumpBrandPage />} />
        <Route path="/pump-brands-table" element={<PumpBrandsTablePage />} />
        {/* Photo */}
        <Route path="/add-photos" element={<AddPhotosPage />} />
        {/* Inspection */}
        <Route path="/add-inspection" element={<AddInspectionPage />} />
        <Route path="/inspection-reports" element={<InspectionReportsPage />} />
        <Route path="/inspection-table" element={<InspectionTablePage />} />
        <Route path="/pdf-uploaded-table" element={<ReportedInspectionTablePage />} />
        <Route path="/invoiced-inspections-table" element={<InvoiceTablePage />} />
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
        <Route
          path="/add-user-group"
          element={<AddUserGroupPage />}
        />
        <Route
          path="/edit-user-group/:userGroupId"
          element={<EditUserGroupPage />}
        />
        <Route
          path="/user-group-table"
          element={<UserGroupTablePage />}
        />
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
        <Route
          path="/add-client-user"
          element={<AddClientUserPage />}
        />
        <Route
          path="/edit-client-user/:clientUserId"
          element={<EditClientUserPage />}
        />
        <Route
          path="/client-user-table"
          element={<ClientUserTablePage />}
        />
      </Route>
    </Routes>
  );
};

export default RoutesContent;
