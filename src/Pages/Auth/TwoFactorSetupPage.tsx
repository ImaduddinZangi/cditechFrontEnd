import React from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import TwoFactorSetup from "../../Components/Auth/TwoFactorSetup";

const TwoFactorSetupPage: React.FC = () => {
  return (
    <AuthLayout>
      <TwoFactorSetup />
    </AuthLayout>
  );
};

export default TwoFactorSetupPage;
