import React, { useState } from "react";
import InputField from "../Tags/InputField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PurpleButton from "../Tags/PurpleButton";

interface NewPasswordProps {
  onSubmit: (password: string, confirmPassword: string) => void;
}

const NewPassword: React.FC<NewPasswordProps> = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      onSubmit(password, confirmPassword);
    }
  };

  return (
    <div className="flex w-full font-inter items-center justify-center h-full">
      <div className="w-full max-w-[80vw] md:max-w-[30vw] p-[4vw] md:p-[2vw] space-y-[0.5vh] bg-white rounded shadow-lg">
        <p className="text-[4vw] md:text-[2vw] text-dark-0 font-semibold text-center">
          Set a new password
        </p>
        <form
          className="space-y-[3vw] md:space-y-[1.5vw]"
          onSubmit={handleSubmit}
        >
          <div className="mt-[4vw] md:mt-[2vw]">
            <InputField
              label="New Password"
              id="new-password"
              name="new-password"
              fieldType="password"
              autoComplete="new-password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <InputField
              label="Confirm Password"
              id="confirm-password"
              name="confirm-password"
              fieldType="password"
              autoComplete="confirm-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <PurpleButton
              type="submit"
              className="w-full"
              text="Reset Password"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
