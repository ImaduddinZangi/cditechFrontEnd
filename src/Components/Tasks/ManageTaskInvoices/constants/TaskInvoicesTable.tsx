import React from "react";

interface InvoiceItem {
    serviceDate: string;
    projectService: string;
    qty: number;
    rate: number;
}

interface TaskInvoicesTableProps {
    invoiceData: InvoiceItem[];
    onQtyChange: (index: number, newQty: number) => void;
    onRemove: (index: number) => void;
}

const TaskInvoicesTable: React.FC<TaskInvoicesTableProps> = ({
    invoiceData,
    onQtyChange,
    onRemove,
}) => {
    const handleIncrement = (index: number) => {
        const newQty = invoiceData[index].qty + 1;
        onQtyChange(index, newQty);
    };

    const handleDecrement = (index: number) => {
        const newQty = invoiceData[index].qty > 1 ? invoiceData[index].qty - 1 : 1;
        onQtyChange(index, newQty);
    };

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border p-[0.5vw] text-left text-[1vw]">#</th>
                    <th className="border p-[0.5vw] text-left text-[1vw] text-gray-0">Service Date</th>
                    <th className="border p-[0.5vw] text-left text-[1vw] text-gray-0">Project Service</th>
                    <th className="border p-[0.5vw] text-left text-[1vw] text-gray-0">QTY</th>
                    <th className="border p-[0.5vw] text-left text-[1vw] text-gray-0">Rate</th>
                    <th className="border p-[0.5vw] text-left text-[1vw] text-gray-0">Amount</th>
                    <th className="border p-[0.5vw] text-left text-[1vw] text-gray-0">Remove</th>
                </tr>
            </thead>
            <tbody>
                {invoiceData.map((item, index) => (
                    <tr key={index}>
                        <td className="border p-[0.5vw] text-[1vw]">{index + 1}</td>
                        <td className="border p-[0.5vw] text-[1vw] text-gray-0">{item.serviceDate}</td>
                        <td className="border p-[0.5vw] text-[1vw] text-gray-0">{item.projectService}</td>
                        <td className="border p-[0.5vw] text-[1vw] text-gray-0">
                            <div className="flex items-center space-x-[0.5vw]">
                                <button
                                    onClick={() => handleIncrement(index)}
                                    className="px-[0.5vw] py-[0.2vw] bg-gray-200 rounded-full hover:bg-gray-300"
                                >
                                    +
                                </button>
                                <span className="w-[1.5vw] text-center">{item.qty}</span>
                                <button
                                    onClick={() => handleDecrement(index)}
                                    className="px-[0.5vw] py-[0.2vw] bg-gray-200 rounded-full hover:bg-gray-300"
                                >
                                    -
                                </button>
                            </div>
                        </td>
                        <td className="border p-[0.5vw] text-[1vw] text-gray-0">${item.rate}</td>
                        <td className="border p-[0.5vw] text-[1vw] text-gray-0">${(item.qty * item.rate)}</td>
                        <td
                            onClick={() => onRemove(index)}
                            className="border p-[0.5vw] text-[1vw] text-center text-red-500 cursor-pointer"
                        >
                            x
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TaskInvoicesTable;
