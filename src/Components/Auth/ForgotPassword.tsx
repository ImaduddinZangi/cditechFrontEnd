import React, { useState } from "react";
import InputField from "../Tags/InputField";
import "react-toastify/dist/ReactToastify.css";
import PurpleButton from "../Tags/PurpleButton";

interface ForgotPasswordProps {
  onSubmit: (email: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="flex w-full font-inter items-center justify-center h-full">
      <div className="w-full max-w-[80vw] md:max-w-[30vw] p-[4vw] md:p-[2vw] space-y-[0.5vh] bg-white rounded shadow-lg">
        <p className="text-[5vw] md:text-[2.5vw] text-dark-0 font-semibold text-center">
          Forgot Password
        </p>
        <p className="text-[2.2vw] md:text-[1vw] text-gray-0 text-center">
          Please enter your email to receive the reset link
        </p>
        <form
          className="space-y-[3vw] md:space-y-[1.5vw]"
          onSubmit={handleSubmit}
        >
          <div className="mt-[4vw] md:mt-[2vw]">
            <InputField
              label="Email"
              id="email"
              name="email"
              fieldType="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <PurpleButton
              type="submit"
              className="w-full"
              text="Send Reset Link"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
