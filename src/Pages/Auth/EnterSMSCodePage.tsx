import React from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import EnterSMSCode from "../../Components/Auth/EnterSMSCode";

const EnterSMSCodePage: React.FC = () => {
  return (
    <AuthLayout>
      <EnterSMSCode />
    </AuthLayout>
  );
};

export default EnterSMSCodePage;
