import React from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import UseBackupCode from "../../Components/Auth/UseBackupCode";

const UseBackupCodePage: React.FC = () => {
  return (
    <AuthLayout>
      <UseBackupCode />
    </AuthLayout>
  );
};

export default UseBackupCodePage;
