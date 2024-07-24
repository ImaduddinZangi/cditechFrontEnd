import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../Middleware/ProtectedRoutes";
import ClientSignInPage from "../Pages/Auth/ClientSignInPage";
import ClientDashboardPage from "../Pages/ClientDashboard/ClientDashboardPage";
import ManagementSignInPage from "../Pages/Auth/ManagementSignInPage";
import CustomerTablePage from "../Pages/Customer/CustomerTablePage";
import ManageCustomerPage from "../Pages/Customer/ManageCustomerPage";
import ClientRegistrationPage from "../Pages/Auth/ClientRegistrationPage";
import EmployeeDashboardPage from "../Pages/EmployeeDashboard/EmployeeDashboardPae";
import AddInspectionPage from "../Pages/Inspection/AddInspectionPage";
import AddCustomerPage from "../Pages/Customer/AddCustomerPage";
import AddAssetsPage from "../Pages/Asset/AddAssetsPage";
import AddAssetTypePage from "../Pages/Asset/AddAssetTypePage";
import ManageCustomers from "../Pages/Customer/ManageCustomers";

const RoutesContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientSignInPage />} />
      <Route path="/client-login" element={<ClientSignInPage />} />
      <Route path="/management-login" element={<ManagementSignInPage />} />
      <Route path="/client-registration" element={<ClientRegistrationPage />} />
      <Route path="/customer" element={<ManageCustomerPage />} />
      <Route path="/cust" element={<EmployeeDashboardPage />} />
      <Route
        path="/client-dashboard"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <ClientDashboardPage />
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
        path="/manage-customer"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <ManageCustomers/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RoutesContent;
