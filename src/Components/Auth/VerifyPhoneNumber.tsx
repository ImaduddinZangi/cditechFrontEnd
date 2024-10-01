import React, { useState } from "react";
import PurpleButton from "../Tags/PurpleButton";

const VerifyPhoneNumber: React.FC = () => {
  const [phoneDigits, setPhoneDigits] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="flex w-full items-center justify-center h-full">
      <div className="w-full max-w-[30vw] p-[2vw] bg-white rounded shadow-lg text-center">
        <p className="text-[2vw] font-semibold">Other options</p>
        <form onSubmit={handleSubmit} className="mt-[1vw]">
          <p>
            Please enter the last four digits of the phone number associated
            with your account.
          </p>
          <div className="flex justify-center mt-[0.5vw]">
            <span className="mr-[0.5vw]">XXX-782-</span>
            <input
              type="text"
              value={phoneDigits}
              onChange={(e) => setPhoneDigits(e.target.value)}
              className="border rounded px-[0.5vw]"
              placeholder="XXXX"
              maxLength={4}
              required
            />
          </div>
          <PurpleButton
            type="submit"
            className="w-full mt-[1vw]"
            text="Submit"
          />
          <p className="mt-[1vw]">
            If the number above matches the phone number on your account, we
            will send you a one-time SMS code to login.
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyPhoneNumber;
