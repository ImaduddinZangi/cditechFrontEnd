import React from "react";

const CompanyFeePlan: React.FC = () => {
  return (
    <div className="p-[1vw]">
      <h2 className="font-bold text-[1.5vw]">Ultimate Plus</h2>
      <div className="flex flex-col gap-[1vw] mt-[1vw]">
        <div className="w-full grid grid-cols-4 gap-[1vw]">
          <div>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              Customers:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              288 / unlimited
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              Assets:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              789 / unlimited
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              Inspections:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              807 / 1000
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              Photo storage:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              306Gb / 500Gb
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              Pdf storage:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              70Mb / 1Gb
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              Video storage:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              709Mb / 5Gb
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              Users:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              17 / 25
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              Customer portal:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">No</p>
          </div>
          <div>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              SMS Messages:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              2044 / 10,000
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-4 gap-[1vw]">
          <div>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              Price:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              $129.99
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              Term:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Monthly
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              Next Bill Date:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              07-08-2028
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              Start Date:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              07-08-2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyFeePlan;
