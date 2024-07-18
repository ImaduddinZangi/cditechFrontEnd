import React from "react";

const CustomerHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-[4vw] md:p-[2vw]">
      <div className="flex items-center">
        <img
          src="/assets/home-line.png"
          alt="icon"
          className="w-[3vw] md:w-[1.5vw] h-[3vw] md:h-[1.5vw]"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <img src="/assets/chevron-right.png" alt="icon" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-[2.5vw] md:text-[1vw] font-inter font-semibold text-darkgray-0">
          Manage Client
        </span>
      </div>
      <div className="flex items-center">
        <img
          className="w-[5vw] md:w-[2.5vw] h-[5vw] md:h-[2.5vw] rounded-full mr-[2vw] md:mr-[1vw]"
          src="https://via.placeholder.com/150"
          alt="Oliver Ray"
        />
        <div className="text-sm">
          <p className="text-darkgray-0 text-[2.5vw] md:text-[1vw] font-semibold leading-none font-inter">
            Oliver Ray
          </p>
          <p className="text-gray-0 text-[2.5vw] md:text-[1vw] font-inter">
            Oliverray@inspection.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerHeader;
