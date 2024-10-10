import React, { useState } from "react";
import InputField from "../Tags/InputField";
import PurpleButton from "../Tags/PurpleButton";
import { Link } from "react-router-dom";

interface ClientSignInProps {
  onSubmit: (email: string, password: string) => void;
}

const ClientSignIn: React.FC<ClientSignInProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="flex w-full font-inter items-center justify-center h-full">
      <div className="w-full max-w-[30vw] p-[2vw] space-y-[0.5vh] bg-white rounded shadow-lg">
        <p className="text-[2.5vw] text-dark-0 font-semibold text-center">
          Client Portal
        </p>
        <p className="text-[2vw] text-dark-0 font-semibold text-center">
          Log in to your account
        </p>
        <p className="text-[1vw] text-gray-0 text-center">
          Welcome back! Please enter your details
        </p>
        <form className="space-y-[1.5vw]" onSubmit={handleSubmit}>
          <div className="mt-[2vw]">
            <InputField
              label="Email"
              name="email"
              fieldType="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <InputField
              label="Password"
              name="password"
              fieldType="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-[1vw] h-[1vw] accent-purple-0 border-lightgray-0 rounded focus:ring-offset-white focus:ring-purple-0 cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="text-[1vw] text-darkgray-0 font-medium"
              >
                &nbsp;Remember for 30 days
              </label>
            </div>
            <div>
              <Link
                to="/forgot-password"
                className="text-[1vw] font-semibold text-purple-0 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div>
            <PurpleButton type="submit" className="w-full" text="Log In" />
          </div>
          {/* <div className="text-center text-[1vw] flex flex-row w-full items-center justify-center">
            <p className="text-gray-0">Don't have an account?&nbsp;</p>
            <Link
              to="/client-registration"
              className="text-purple-0 font font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default ClientSignIn;
