import React from "react";
import Image from "/assets/Content.png";

const AuthFooter: React.FC = () => {
  return (
    <div className="w-full h-[5vh] bg-lightgray-0 md:h-[10vh] border-t px-[2vw] flex flex-row items-center justify-between">
      <img
        src={Image}
        alt="icon"
        className="w-[4vw] md:w-[2vw] h-[4vw] md:h-[2vw]"
      />
      <p className="font-inter text-[2vw] md:text-[0.9vw] text-gray-0">
        {"\u00A9"}CDI Technologies.Inc
      </p>
    </div>
  );
};

export default AuthFooter;
