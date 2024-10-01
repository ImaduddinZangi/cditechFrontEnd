import React, { useState } from "react";
import PurpleButton from "../Tags/PurpleButton";

const UseBackupCode: React.FC = () => {
  const [backupCode, setBackupCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="flex w-full items-center justify-center h-full">
      <div className="w-full max-w-[30vw] p-[2vw] bg-white rounded shadow-lg text-center">
        <p className="text-[2vw] font-semibold">Use a backup code</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <p>Please enter one of your backup codes you created at sign up.</p>
          <input
            type="text"
            value={backupCode}
            onChange={(e) => setBackupCode(e.target.value)}
            className="w-full border rounded px-2 mt-2"
            placeholder="XXX - XXX - XXXX"
            required
          />
          <PurpleButton
            type="submit"
            className="w-full mt-[1vw]"
            text="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default UseBackupCode;
