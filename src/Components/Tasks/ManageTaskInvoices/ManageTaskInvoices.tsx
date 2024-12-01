import React, { useState } from "react";
import WhiteButton from "../../Tags/WhiteButton";
import InputField from "../../Tags/InputField";
import SelectField, { Option } from "../../Tags/SelectField";
import TaskInvoicesTable from "./constants/TaskInvoicesTable";
import OutlinePurpleButton from "../../Tags/OutlinePurpleButton";
import image from "/assets/purpleNote.png"

const serviceData = [
  { title: "Service Call Standard", pairedService: "Service Call", price: 129.65 },
  { title: "Emergency Service Call", pairedService: "Labor By The Hour", price: 100.0 },
  { title: "Sewage Pumping By The Gallon", pairedService: "After Hour Labor", price: 150.0 },
  { title: "Lift Station Cleaning Large", pairedService: "Lift Station Cleaning Small", price: 200.0 },
];

const dummyInvoiceData = [
  { serviceDate: "04-07-2024", projectService: "Monthly Lift Station Inspection", qty: 1, rate: 475.0 },
  { serviceDate: "04-07-2024", projectService: "Monthly Lift Station Cleaning", qty: 1, rate: 475.0 },
  { serviceDate: "04-07-2024", projectService: "Monthly Lift Station Inspection", qty: 1, rate: 475.0 },
  { serviceDate: "04-07-2024", projectService: "Monthly Lift Station Cleaning", qty: 1, rate: 475.0 },
];

const termsOptions: Option[] = [
  { label: "Due on Receipt", value: "Due on Receipt" },
  { label: "Net 15", value: "Net 15" },
  { label: "Net 30", value: "Net 30" },
];

const ManageTaskInvoices: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [invoiceData, setInvoiceData] = useState(dummyInvoiceData);
  const [terms, setTerms] = useState<Option | null>(null);

  const handleQtyChange = (index: number, newQty: number) => {
    const updatedData = [...invoiceData];
    updatedData[index].qty = newQty;
    setInvoiceData(updatedData);
  };

  const handleRemove = (index: number) => {
    const updatedData = invoiceData.filter((_, i) => i !== index);
    setInvoiceData(updatedData);
  };

  const handleServiceClick = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-[0.4vw] font-inter">
      <h2 className="block text-[1.2vw] font-semibold text-darkgray-0 mb-[1.5vw]">Services & Products</h2>
      <div className="grid grid-cols-3 gap-[1.5vw]">
        <div className="w-full flex flex-col justify-between">
          <div className="border rounded-lg p-[1.5vw] bg-white">
            <h3 className="block text-[1vw] font-medium text-darkgray-0 mb-[1vw]">Tap to add Invoice</h3>
            <div className="grid grid-cols-2 gap-[0.5vw]">
              {serviceData.map((service, index) => (
                <WhiteButton
                  key={index}
                  text={service.title}
                  icon={
                    !selectedServices.includes(service.title) && (
                      <span className="font-bold text-[1vw]">+</span>
                    )
                  }
                  className={`w-full ${selectedServices.includes(service.title) ? "bg-gray-200" : ""
                    }`}
                  onClick={() => handleServiceClick(service.title)}
                />
              ))}
            </div>
          </div>
          <OutlinePurpleButton text="Save Invoice" className="w-full" img={image} />
        </div>

        <div className="col-span-2 border rounded-lg p-[1.5vw] bg-white">
          <p className="block text-[1vw] font-medium text-darkgray-0 mb-[1vw]">Invoice #25493</p>
          <TaskInvoicesTable
            invoiceData={invoiceData}
            onQtyChange={handleQtyChange}
            onRemove={handleRemove}
          />
          <div className="flex flex-row gap-[1vw] mt-[2vw]">
            <InputField label="Message" fieldType="text" className="w-2/3" />
            <SelectField
              label="Terms"
              value={terms}
              onChange={setTerms}
              options={termsOptions}
              placeholder="Due on Reciept"
              className="w-1/3"
            />
          </div>
          <div className="mt-[2vw] flex flex-col gap-[0.5vw]">
            <p className="block text-[1vw] font-medium text-darkgray-0">Tax: <span className="font-semibold">$0</span></p>
            <p className="block text-[1vw] font-medium text-darkgray-0">Total: <span className="font-semibold">$459</span></p>
            <p className="block text-[1vw] font-medium text-darkgray-0">Balance Due: <span className="font-semibold">$459</span></p>
            <p className="block text-[1vw] font-medium text-gray-0">Invoice #25493</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTaskInvoices;
