import React from "react";
import Sidebar from "../Constants/Sidebar";
import ClientHeader from "../Constants/ClientHeader";
import NextButton from "./Constants/NextButton";
import PreviousButton from "./Constants/PreviousButton";
import ActiveBadge from "./Constants/ActiveBadge";

interface Customer {
  name: string;
  address: string;
  type: string;
  status: string;
}

const customers: Customer[] = [
  {
    name: "Olivia Rhye",
    address: "8080 Railroad St.",
    type: "Commercial",
    status: "Active",
  },
  {
    name: "Phoenix Baker",
    address: "8080 Railroad St.",
    type: "Commercial",
    status: "Active",
  },
  {
    name: "Lana Steiner",
    address: "7529 E. Pecan St.",
    type: "Commercial",
    status: "Active",
  },
  {
    name: "Demi Wilkinson",
    address: "775 Rolling Green Rd.",
    type: "Commercial",
    status: "Active",
  },
  {
    name: "Natali Craig",
    address: "3605 Parker Rd.",
    type: "Commercial",
    status: "Active",
  },
  {
    name: "Drew Cano",
    address: "8558 Green Rd.",
    type: "Commercial",
    status: "Active",
  },
  {
    name: "Kate Morrison",
    address: "3980 Poplar Dr.",
    type: "Commercial",
    status: "Active",
  },
];

const CustomerTable: React.FC = () => {
  return (
    <div>
      <Sidebar>
        <div>
    <ClientHeader/>
        <div className="container  mx-auto h-auto] pb-11 ">
          <div className="overflow-x-auto ">
            <div className="min-w-screen min-h-screen flex flex-col items-center justify-center overflow-hidden">
              <div className="w-full lg:w-5/6">
                <div className="bg-white shadow-md rounded my-6">
                  <div className="flex justify-between items-center px-6 py-4">
                    <div className="flex space-x-4">
                      <button className="w-[187px] h-[44px]  text-white font-inter font-semibold text-sm bg-purple-0 text-purple-600 border border-purple-600 rounded hover:bg-purple-200">
                        Add New Customer
                      </button>
                      <button className="w-[216px] h-[44px] text-white font-inter font-semibold text-sm bg-purple-0 text-purple-600 border border-purple-600 rounded hover:bg-purple-200">
                        Import New Customers
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between border items-center px-6 py-4">
                    <h2 className="text-lg font-semibold">
                      Customers{" "}
                      <span className="bg-custom-bg-color w-[77px] h-[22px] border rounded-[16px] text-sm text-purple-0 ">
                        Total=100
                      </span>
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search"
                          className="px-4 py-2 border rounded-full text-sm focus:outline-none"
                        />
                        <svg
                          className="w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <button className="w-[93px] h-[34px] rounded-[8px] font-inter text-base font-semibold bg-purple-100 text-purple-0 border border-purple-600  hover:bg-purple-200">
                        Sort By
                      </button>
                    </div>
                  </div>
                  <table className="min-w-max w-full table-auto">
                    <thead>
                      <tr className="h-[44px] text-gray-600 border uppercase text-sm leading-normal">
                        <th className="py-3 px-6 font-inter font-medium text-xs text-left">
                          Name
                        </th>
                        <th className="py-3 px-6 font-inter font-medium text-xs text-left">
                          Address
                        </th>
                        <th className="py-3 px-6 font-inter font-medium text-xs text-center">
                          Type
                        </th>
                        <th className="py-3 px-6 font-inter font-medium text-xs text-center">
                          Status
                        </th>
                        <th className="py-3 px-6 font-inter font-medium text-xs text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {customers.map((customer, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="w-[2.5vw] md:w-[1vw] h-[2.5vw] md:h-[1vw] accent-purple-0 border-lightgray-0 rounded focus:ring-offset-white focus:ring-purple-0 cursor-pointer mr-2"
                              />
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={`https://i.pravatar.cc/150?img=${index}`}
                                  alt={customer.name}
                                />
                              </div>
                              <span className="font-inter font-medium text-sm">
                                {customer.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left font-inter font-normal text-sm">
                            {customer.address}
                          </td>
                          <td className="py-3 px-6 text-left font-inter font-normal text-sm">
                            {customer.type}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <ActiveBadge />
                          </td>
                          <td className="py-3 px-6 text-center">
                            <button className="w-[179px] h-[44px] gap-[16px] font-inter font-semibold text-sm text-white bg-purple-0 border border-purple-600 shadow-sm rounded-[8px]">
                              Manage Customer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-between py-3 px-6">
                    <PreviousButton />
                    <div className="flex space-x-1">
                      {[...Array(10).keys()].map((page) => (
                        <button
                          key={page}
                          className="bg-gray-300 text-gray-600 py-1 px-3 rounded"
                        >
                          {page + 1}
                        </button>
                      ))}
                    </div>
                    <NextButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default CustomerTable;
