import React from "react";
import PurpleButton from "../../Tags/PurpleButton";

interface TaskInvoiceProps {
    invoice: {
        id: number;
        customerName: string;
        customerEmail: string;
        subtotal: number;
        tax: number;
        total: number;
        createdDate: string;
        dueDate: string;
        terms: string;
        customerAddress: string;
        sentStatus: string;
        invoiceStatus: string;
    };
}

const TaskInvoice: React.FC<TaskInvoiceProps> = ({ invoice }) => {
    return (
        <div>
            <div className="flex flex-row items-center gap-[1vw]">
                <h2 className="text-[1.2vw] font-semibold">Task Invoice</h2>
                <p className="text-[1vw]">
                    *This Invoice is not completed. Please set status completed billed to finish Task
                </p>
            </div>
            <div className="p-[1.5vw] bg-white shadow-md rounded-md">
                <p className="text-[1vw] mb-[1vw]">Invoice # {invoice.id}</p>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col items-start gap-[1vw]">
                        <div>
                            <p className="text-[1vw] font-semibold">Customer Name:</p>
                            <p className="text-[1vw]">{invoice.customerName || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-[1vw] font-semibold">Customer Email:</p>
                            <p className="text-[1vw]">{invoice.customerEmail || "N/A"}</p>
                        </div>
                        <div className="flex flex-row items-center gap-[1vw]">
                            <p className="text-[1vw] font-semibold">Subtotal:</p>
                            <p className="text-[1vw]">${invoice.subtotal || "N/A"}</p>
                        </div>
                        <div className="flex flex-row items-center gap-[1vw]">
                            <p className="text-[1vw] font-semibold">Tax:</p>
                            <p className="text-[1vw]">${invoice.tax || "N/A"}</p>
                        </div>
                        <div className="flex flex-row items-center gap-[1vw]">
                            <p className="text-[1vw] font-semibold">Total:</p>
                            <p className="text-[1vw]">${invoice.total || "N/A"}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-[1vw]">
                        <div>
                            <p className="text-[1vw] font-semibold">Created Date:</p>
                            <p className="text-[1vw]">{invoice.createdDate || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-[1vw] font-semibold">Due Date:</p>
                            <p className="text-[1vw]">{invoice.dueDate || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-[1vw] font-semibold">Terms:</p>
                            <p className="text-[1vw]">${invoice.terms || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-[1vw] font-semibold">Customer Address:</p>
                            <p className="text-[1vw]">${invoice.customerAddress || "N/A"}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-[1vw]">
                        <div>
                            <p className="text-[1vw] font-semibold">Sent Status:</p>
                            <p className="text-[1vw]">${invoice.sentStatus || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-[1vw] font-semibold">Invoice Status:</p>
                            <p className="text-[1vw]">${invoice.invoiceStatus || "N/A"}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-[1vw]">
                            <PurpleButton text="Manage Invoice" />
                            <PurpleButton text="Send Invoice" />
                            <PurpleButton text="Future Use" />
                            <PurpleButton text="Future Use" />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default TaskInvoice;
