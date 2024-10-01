import React from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import VerifyPhoneNumber from "../../Components/Auth/VerifyPhoneNumber";

const VerifyPhoneNumberPage: React.FC = () => {
  return (
    <AuthLayout>
      <VerifyPhoneNumber />
    </AuthLayout>
  );
};

export default VerifyPhoneNumberPage;
