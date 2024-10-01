import React from "react";
import WhiteButton from "../Tags/WhiteButton";
import PurpleButton from "../Tags/PurpleButton";

const BackupCodes: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-center h-full my-[2vw]">
      <div className="w-full max-w-[30vw] p-[2vw] bg-white rounded shadow-lg text-center">
        <p className="text-[2vw] font-semibold font-inter">Backup codes</p>
        <p className="mt-[1vw] text-[1.1vw] text-gray-0">
          Each backup code below can be used once to log in if you lose access
          to your primary 2FA method.
        </p>
        <div className="grid grid-cols-2 gap-[1vw] mt-[1vw]">
          {/* Display Backup Codes */}
          {Array.from({ length: 8 }, (_, i) => (
            <p key={i} className="text-[1.1vw] text-darkgray-0">
              XXXX - XXXX - XXXX
            </p>
          ))}
        </div>
        <WhiteButton text="Download Codes" className="mt-[1vw]" />
        <PurpleButton text="Continue" className="mt-[1vw] w-full" />
        <p className="mt-[1vw] text-gray-0 text-[1vw]">
          Once you leave this page, you will never be able to view these backup
          codes again. Only generate new ones if necessary.
        </p>
      </div>
    </div>
  );
};

export default BackupCodes;
