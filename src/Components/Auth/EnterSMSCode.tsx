import React, { useState } from "react";
import PurpleButton from "../Tags/PurpleButton";

const EnterSMSCode: React.FC = () => {
  const [smsCode, setSmsCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="flex w-full items-center justify-center h-full">
      <div className="w-full max-w-[30vw] p-[2vw] bg-white rounded shadow-lg text-center">
        <p className="text-[2vw] font-semibold">Other options</p>
        <form onSubmit={handleSubmit} className="mt-[1vw]">
          <p>Please enter the SMS code sent to your phone number.</p>
          <input
            type="text"
            value={smsCode}
            onChange={(e) => setSmsCode(e.target.value)}
            className="w-full border rounded px-[0.5vw] mt-[0.5vw]"
            placeholder="Enter SMS code"
            required
          />
          <PurpleButton
            type="submit"
            text="Submit"
            className="w-full mt-[1vw]"
          />
          <a href="#" className="block mt-[1vw] text-purple-0">
            Did not receive code?
          </a>
        </form>
      </div>
    </div>
  );
};

export default EnterSMSCode;
