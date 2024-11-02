import React, { useState } from "react";

const MyFeePlan: React.FC = () => {
  // Sample subscription data
  const [MyFeePlan] = useState({
    currentPlan: "Unlimited Plus",
    price: "$29.99",
    planStatus: "Active",
    subscriptionDate: "July 20, 2024",
    term: "Monthly",
    nextDueDate: "Aug 20, 2024",
    paymentMethod: "Net 30",
  });

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-4 gap-6 text-[1vw]">
        {/* First Column */}
        <div>
          <p className="text-darkgray-0 font-semibold">Current Plan:</p>
          <p className="text-gray-0">{MyFeePlan.currentPlan}</p>
        </div>
        <div>
          <p className="text-darkgray-0 font-semibold">Price:</p>
          <p className="text-gray-0">{MyFeePlan.price}</p>
        </div>

        {/* Second Column */}
        <div>
          <p className="text-darkgray-0 font-semibold">Plan Status:</p>
          <p className="text-gray-0">{MyFeePlan.planStatus}</p>
        </div>
        <div>
          <p className="text-darkgray-0 font-semibold">Subscription Date:</p>
          <p className="text-gray-0">{MyFeePlan.subscriptionDate}</p>
        </div>

        {/* Third Column */}
        <div>
          <p className="text-darkgray-0 font-semibold">Term:</p>
          <p className="text-gray-0">{MyFeePlan.term}</p>
        </div>
        <div>
          <p className="text-darkgray-0 font-semibold">Next Due Date:</p>
          <p className="text-gray-0">{MyFeePlan.nextDueDate}</p>
        </div>

        {/* Fourth Column */}
        <div>
          <p className="text-darkgray-0 font-semibold">Payment Method:</p>
          <p className="text-gray-0">{MyFeePlan.paymentMethod}</p>
        </div>
      </div>
    </div>
  );
};

export default MyFeePlan;
