import React, { useState } from "react";

interface TwoFactorAuthenticationProps {
  onSubmit: (code: string) => void;
  src: string;
}

const TwoFactorAuthentication: React.FC<TwoFactorAuthenticationProps> = ({
  onSubmit,
  src,
}) => {
  const [code, setCode] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(code);
  };

  return (
    <div className="flex w-full font-inter items-center justify-center h-full">
      <div className="w-full max-w-[80vw] md:max-w-[30vw] p-[4vw] md:p-[2vw] space-y-[0.5vh] bg-white rounded shadow-lg">
        <p className="text-[2.2vw] md:text-[1vw] text-gray-0 text-center">
          Scan the QR Code and enter the code in the field below!
        </p>
        <img src={src} alt="QR Code" className="w-1/2 mx-[25%]" />
        <form
          className="space-y-[3vw] md:space-y-[1.5vw]"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="code"
              className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
            >
              Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              required
              className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-[2vw] md:px-[1vw] py-[1vw] md:py-[0.5vw] text-[2.5vw] md:text-[1vw] font-semibold text-white bg-purple-0 rounded-[1vw] md:rounded-[0.5vw] hover:bg-opacity-95 focus:outline-none focus:opacity-90"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
