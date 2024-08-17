import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../Middleware/ProtectedRoutes";
import ClientSignInPage from "../Pages/Auth/ClientSignInPage";
import ClientDashboardPage from "../Pages/ClientDashboard/ClientDashboardPage";
import ManagementSignInPage from "../Pages/Auth/ManagementSignInPage";
import CustomerTablePage from "../Pages/Customer/CustomerTablePage";
import ClientRegistrationPage from "../Pages/Auth/ClientRegistrationPage";
import EmployeeDashboardPage from "../Pages/EmployeeDashboard/EmployeeDashboardPae";
import AddInspectionPage from "../Pages/Inspection/AddInspectionPage";
import AddCustomerPage from "../Pages/Customer/AddCustomerPage";
import AddAssetsPage from "../Pages/Customer/Asset/AddAssetsPage";
import AddAssetTypePage from "../Pages/Customer/Asset/AddAssetTypePage";
import AddPumpBrandPage from "../Pages/Customer/Pump/AddPumpBrandPage";
import ManageCustomerPage from "../Pages/Customer/ManageCustomerPage";
import AddPhotosPage from "../Pages/Customer/AddPhotosPage";
import TwoFactorAuthPage from "../Pages/Auth/twoFactorAuthPage";
import EditCustomerPage from "../Pages/Customer/EditCustomerPage";
import EditAssetPage from "../Pages/Customer/Asset/EditAssetPage";
import ClientProfilePage from "../Pages/ClientDashboard/ClientProfilePage";
import AssetPumps from "../Pages/Customer/Pump/AssetPumps";

const RoutesContent: React.FC = () => {
  return (
    <Routes>
      {/* Authenticatons */}
      <Route path="/" element={<ClientSignInPage />} />
      <Route path="/client-login" element={<ClientSignInPage />} />
      <Route path="/management-login" element={<ManagementSignInPage />} />
      <Route path="/client-registration" element={<ClientRegistrationPage />} />
      <Route path="/cust" element={<EmployeeDashboardPage />} />
      <Route
        path="/2fa"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <TwoFactorAuthPage />
          </ProtectedRoute>
        }
      />
      {/* Client */}
      <Route
        path="/client-dashboard"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <ClientDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client-profile"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <ClientProfilePage />
          </ProtectedRoute>
        }
      />
      {/* Customer */}
      <Route
        path="/manage-customer"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <ManageCustomerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-customer"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <AddCustomerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-customer/:customerId"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <EditCustomerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-table"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <CustomerTablePage />
          </ProtectedRoute>
        }
      />
      {/* Asstes */}
      <Route
        path="/add-asset"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <AddAssetsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-asset/:id"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <EditAssetPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-asset-type"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <AddAssetTypePage />
          </ProtectedRoute>
        }
      />
      {/* Pumps */}
      <Route
        path="/add-pump-brand"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <AddPumpBrandPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/asset-pumps"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <AssetPumps />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-photos"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <AddPhotosPage />
          </ProtectedRoute>
        }
      />
      {/* Inspection */}
      <Route
        path="/add-inspection"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <AddInspectionPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RoutesContent;
