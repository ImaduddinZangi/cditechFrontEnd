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

const RoutesContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientSignInPage />} />
      <Route path="/sign-in" element={<ClientSignInPage />} />
      <Route path="/sign" element={<ManagementSignInPage />} />
      <Route path="/register" element={<ClientRegistrationPage />} />
      <Route path="/table" element={<CustomerTablePage />} />
      <Route path="/customer" element={<ManageCustomerPage />} />
      <Route path="/cust" element={<EmployeeDashboardPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={true}>
            <ClientDashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RoutesContent;
