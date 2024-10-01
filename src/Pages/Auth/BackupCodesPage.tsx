import React from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import BackupCodes from "../../Components/Auth/BackupCodes";

const BackupCodesPage: React.FC = () => {
  return (
    <AuthLayout>
      <BackupCodes />
    </AuthLayout>
  );
};

export default BackupCodesPage;
