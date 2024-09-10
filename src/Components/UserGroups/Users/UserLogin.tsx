import React, { useState } from "react";
import InputField from "../../Tags/InputField";

interface UserLoginProps {
  onSubmit: (email: string, password: string) => void;
}

const UserLogin: React.FC<UserLoginProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="flex w-full font-inter items-center justify-center h-full">
      <div className="w-full max-w-[80vw] md:max-w-[30vw] p-[2vw] space-y-[0.5vh] bg-white rounded shadow-lg">
        <p className="text-[2.5vw] text-dark-0 font-semibold text-center">
          Client Portal
        </p>
        <p className="text-[2vw] text-dark-0 font-semibold text-center">
          Log in to your account
        </p>
        <p className="text-[1vw] text-gray-0 text-center">
          Welcome back! Please enter your details
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
            <InputField
              label="Password"
              id="password"
              name="password"
              fieldType="password"
              autoComplete="current-password"
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
              <a
                href="/forgot-password"
                className="text-[1vw] font-semibold text-purple-0 hover:opacity-95"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-[2vw] md:px-[1vw] py-[1vw] md:py-[0.5vw] text-[2.5vw] md:text-[1vw] font-semibold text-white bg-purple-0 rounded-[1vw] md:rounded-[0.5vw] hover:bg-opacity-95 focus:outline-none focus:opacity-90"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
