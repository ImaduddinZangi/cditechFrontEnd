import React from "react";

const InspectionForm: React.FC = () => {
  return (
    <div className="bg-white m-[2vw] p-6 rounded-lg shadow-lg">
      <form>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="customer"
              className="block text-sm font-medium text-gray-700"
            >
              Customer:
            </label>
            <select
              id="customer"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="customer1">Customer 1</option>
              <option value="customer2">Customer 2</option>
              <option value="customer3">Customer 3</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="asset"
              className="block text-sm font-medium text-gray-700"
            >
              Asset:
            </label>
            <select
              id="asset"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="asset1">Asset 1</option>
              <option value="asset2">Asset 2</option>
              <option value="asset3">Asset 3</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="checklist"
              className="block text-sm font-medium text-gray-700"
            >
              Inspection checklist:
            </label>
            <select
              id="checklist"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="checklist1">Checklist 1</option>
              <option value="checklist2">Checklist 2</option>
              <option value="checklist3">Checklist 3</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="interval"
              className="block text-sm font-medium text-gray-700"
            >
              Inspection Interval:
            </label>
            <input
              type="email"
              id="interval"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="email@example.com"
            />
          </div>
          <div className="col-span-2 flex items-center">
            <span className="mr-4 text-sm font-medium text-gray-700">
              Inspection Recording:
            </span>
            <label className="mr-2">
              <input
                type="radio"
                name="recording"
                value="yes"
                className="mr-1 accent-darkpurple-0"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="recording"
                value="no"
                className="mr-1 accent-darkpurple-0"
              />
              No
            </label>
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              Inspection End Date:
            </label>
            <input
              type="date"
              id="endDate"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Do Not Save And Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-purple-500 text-white rounded-md"
          >
            Complete & Start First Inspection
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-700 text-white rounded-md"
          >
            Complete New Inspection
          </button>
        </div>
      </form>
    </div>
  );
};

export default InspectionForm;
