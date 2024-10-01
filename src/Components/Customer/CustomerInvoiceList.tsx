import React from "react";
import PurpleButton from "../Tags/PurpleButton";

const invoices = [
  {
    number: "Id12548",
    date: "07-08-2029",
    status: "Placeholder",
    sentStatus: "Sent",
    amountTotal: "02-16-2021",
  },
  {
    number: "Id12546",
    date: "07-08-2029",
    status: "Placeholder",
    sentStatus: "Sent",
    amountTotal: "02-16-2021",
  },
  {
    number: "Id12545",
    date: "07-08-2029",
    status: "Placeholder",
    sentStatus: "Sent",
    amountTotal: "02-16-2021",
  },
];

const CustomerInvoiceList: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="border p-2 rounded-lg w-[15vw]"
            placeholder="Search"
          />
          <div>
            <p>Customer Balance</p>
            <p className="font-semibold">10,013.14</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <PurpleButton text="Sort By" />
          <PurpleButton text="Add new Invoice" />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 bg-gray-100 p-4 rounded-lg font-semibold">
        <p className="col-span-2">Invoice Number</p>
        <p className="col-span-2">Date</p>
        <p className="col-span-2">Status</p>
        <p className="col-span-2">Sent Status</p>
        <p className="col-span-3">Invoice Amount Total</p>
        <p className="col-span-1"></p>
      </div>
      {invoices.map((invoice, index) => (
        <div
          key={index}
          className="grid grid-cols-12 gap-4 p-4 border-b items-center"
        >
          <p className="col-span-2">{invoice.number}</p>
          <p className="col-span-2">{invoice.date}</p>
          <p className="col-span-2">{invoice.status}</p>
          <p className="col-span-2">{invoice.sentStatus}</p>
          <p className="col-span-3">{invoice.amountTotal}</p>
          <PurpleButton text="Manage" />
        </div>
      ))}
    </div>
  );
};

export default CustomerInvoiceList;
