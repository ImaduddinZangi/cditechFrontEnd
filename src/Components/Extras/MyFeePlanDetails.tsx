import React, { useState } from "react";

const FeePlanDetails: React.FC = () => {
  const [planDetails] = useState({
    customers: "288 / unlimited",
    assets: "789 / unlimited",
    inspections: "807 / 1000",
    photoStorage: "306Gb / 500Gb",
    pdfStorage: "70Mb / 1Gb",
    videoStorage: "709Mb / 5Gb",
    smsMessages: "2084 / 10,000",
    users: "17 / 25",
    customerPortal: "No",
  });

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-4 gap-6 text-[1vw]">
        {/* First Column */}
        <div>
          <p className="text-darkgray-0 font-semibold">Customers:</p>
          <p className="text-gray-0">{planDetails.customers}</p>
          <p className="text-darkgray-0 font-semibold mt-4">Pdf storage:</p>
          <p className="text-gray-0">{planDetails.pdfStorage}</p>
          <p className="text-darkgray-0 font-semibold mt-4">SMS Messages:</p>
          <p className="text-gray-0">{planDetails.smsMessages}</p>
        </div>

        {/* Second Column */}
        <div>
          <p className="text-darkgray-0 font-semibold">Assets:</p>
          <p className="text-gray-0">{planDetails.assets}</p>
          <p className="text-darkgray-0 font-semibold mt-4">Video storage:</p>
          <p className="text-gray-0">{planDetails.videoStorage}</p>
        </div>

        {/* Third Column */}
        <div>
          <p className="text-darkgray-0 font-semibold">Inspections:</p>
          <p className="text-gray-0">{planDetails.inspections}</p>
          <p className="text-darkgray-0 font-semibold mt-4">Users:</p>
          <p className="text-gray-0">{planDetails.users}</p>
        </div>

        {/* Fourth Column */}
        <div>
          <p className="text-darkgray-0 font-semibold">Photo storage:</p>
          <p className="text-gray-0">{planDetails.photoStorage}</p>
          <p className="text-darkgray-0 font-semibold mt-4">Customer portal:</p>
          <p className="text-gray-0">{planDetails.customerPortal}</p>
        </div>
      </div>
    </div>
  );
};

export default FeePlanDetails;
