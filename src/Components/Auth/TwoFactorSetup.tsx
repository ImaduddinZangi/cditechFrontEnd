import React from "react";
import WhiteButton from "../Tags/WhiteButton";
import PurpleButton from "../Tags/PurpleButton";

const TwoFactorSetup: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-center h-full">
      <div className="w-full max-w-[30vw] p-[2vw] bg-white rounded shadow-lg text-center">
        <p className="text-[2vw] font-semibold">Two factor setup</p>
        <p>Your user account requires two-factor authentication.</p>
        <WhiteButton className="w-full mt-[1vw]" text="Google Authenticator" />
        <WhiteButton className="w-full mt-[1vw]" text="SMS Login Code" />
        <WhiteButton className="w-full mt-[1vw]" text="Email Login Code" />
        <p className="mt-4">Please choose your primary 2FA method.</p>
        <PurpleButton className="w-full mt-[1vw]" text="Continue" />
      </div>
    </div>
  );
};

export default TwoFactorSetup;
