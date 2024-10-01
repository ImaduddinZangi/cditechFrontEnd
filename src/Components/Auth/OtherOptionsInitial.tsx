import React from "react";
import WhiteButton from "../Tags/WhiteButton";

const OtherOptionsInitial: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-center h-full">
      <div className="w-full max-w-[30vw] p-[2vw] bg-white rounded shadow-lg text-center">
        <p className="text-[2vw] font-semibold">Other options</p>
        <WhiteButton className="w-full mt-[1vw]" text="Use a backup code" />
        <WhiteButton
          className="w-full mt-[1vw]"
          text="Get a onetime SMS code"
        />
        <WhiteButton
          className="w-full mt-[1vw]"
          text="Get a onetime email code"
        />
        <a href="#" className="block mt-[1vw] text-purple-0">
          Still can't login?
        </a>
      </div>
    </div>
  );
};

export default OtherOptionsInitial;
