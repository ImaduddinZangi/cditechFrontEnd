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
import ManageCustomerAssetPage from "../Pages/Customer/ManageCustomerAssetPage";
import ManageCustomerPumpPage from "../Pages/Customer/ManageCustomerPumpPage";
import AddPhotosPage from "../Pages/Customer/AddPhotosPage";
import TwoFactorAuthPage from "../Pages/Auth/twoFactorAuthPage";
import EditCustomerPage from "../Pages/Customer/EditCustomerPage";

const RoutesContent: React.FC = () => {
  return (
    <Routes>
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
      <Route
        path="/client-dashboard"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <ClientDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-customer-asset"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <ManageCustomerAssetPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-customer-pump"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <ManageCustomerPumpPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-inspection"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <AddInspectionPage />
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
      <Route
        path="/add-asset"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <AddAssetsPage />
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
      <Route
        path="/add-pump-brand"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <AddPumpBrandPage />
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
    </Routes>
  );
};

export default RoutesContent;
