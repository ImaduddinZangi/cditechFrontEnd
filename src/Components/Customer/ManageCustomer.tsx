import React from "react";

const ManageCustomer: React.FC = () => {
  return (
    <div>
      <div className="p-4">
        <div className="bg-white shadow rounded-lg p-6 flex flex-col">
          <div className="flex justify-between ">
            <div>
              <p className="font-semibold">Name:</p>
              <p>Customer Name</p>
              <p className="font-semibold mt-2">Billing Address:</p>
              <p className="w-[139px]">123 North St City, State, Pin Code</p>
            </div>
            <div>
              <p className="font-semibold">Service Address:</p>
              <p className="w-[100px] h-[40px] font-inter  font-semibold text-sm ">
                132 Street St City, State, ZIP
              </p>
              <p className="font-semibold mt-2">Service Contact:</p>
              <p>John Smith</p>
              <p>999-999-9999</p>
            </div>
            <div>
              <p className="font-semibold">Type:</p>
              <p>Commercial</p>
              <p className="font-semibold mt-2">Gate Code:</p>
              <p>None</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p>Active</p>
              <p className="font-semibold mt-2">Previous Phone Number:</p>
              <p>Text</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1,358px] Gap-[24px] flex space-x-4">
        <div>
          <div>
            <button className="bg-purple-0 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-600">
              New Inspection
            </button>
            <button className="bg-purple-0 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-600">
              Send To GPS
            </button>
            <button className="bg-purple-0 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-600">
              Add New Asset
            </button>
            <button className="bg-purple-0 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-600">
              Blank Button
            </button>
          </div>
          <button className="bg-[#F9F5FF] border-2 border-purple-500 text-purple-500 font-semibold py-2 px-4 rounded-md hover:bg-purple-50 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 9l4.768-4.768m0 0a2.5 2.5 0 013.536 3.536L18.768 12.5m-5.036-3.536a2.5 2.5 0 01-3.536 0L9 7.768m0 0a2.5 2.5 0 01-3.536-3.536L7.768 3.5m5.036 3.536a2.5 2.5 0 013.536 0L15.232 9z"
              />
            </svg>
            Edit Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageCustomer;

// import React from 'react';

// const ButtonGroup: React.FC = () => {
//   return (
//
//   );
// };

// export default ButtonGroup;
