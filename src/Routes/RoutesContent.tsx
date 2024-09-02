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
import AddAssetTypePage from "../Pages/Customer/Asset/AddAssetTypePage";
import AddPumpBrandPage from "../Pages/Customer/Pump/AddPumpBrandPage";
import ManageCustomerPage from "../Pages/Customer/ManageCustomerPage";
import AddPhotosPage from "../Pages/Customer/AddPhotosPage";
import TwoFactorAuthPage from "../Pages/Auth/twoFactorAuthPage";
import EditCustomerPage from "../Pages/Customer/EditCustomerPage";
import EditAssetPage from "../Pages/Customer/Asset/EditAssetPage";
import ClientProfilePage from "../Pages/ClientDashboard/ClientProfilePage";
import AssetPumps from "../Pages/Customer/Pump/AssetPumps";
import InspectionReportsPage from "../Pages/Inspection/InspectionReportsPage";
import InspectionTablePage from "../Pages/Inspection/InspectionTablePage";
import EditInspectionPage from "../Pages/Inspection/EditInspectionPage";
import PumpBrandsTablePage from "../Pages/Customer/Pump/PumpBrandsTablePage";

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
        <Route path="/add-asset-type" element={<AddAssetTypePage />} />
        {/* Pump */}
        <Route path="/add-pump-brand" element={<AddPumpBrandPage />} />
        <Route path="/asset-pumps" element={<AssetPumps />} />
        <Route path="/pump-brands-table" element={<PumpBrandsTablePage />} />
        {/* Photo */}
        <Route path="/add-photos" element={<AddPhotosPage />} />
        {/* Inspection */}
        <Route path="/add-inspection" element={<AddInspectionPage />} />
        <Route path="/inspection-reports" element={<InspectionReportsPage />} />
        <Route path="/inspection-table" element={<InspectionTablePage />} />
        <Route
          path="/update-inspection/:inspectionId"
          element={<EditInspectionPage />}
        />
      </Route>
    </Routes>
  );
};

export default RoutesContent;
