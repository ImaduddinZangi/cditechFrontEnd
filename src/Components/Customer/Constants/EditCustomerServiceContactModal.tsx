import React, { FormEvent, useEffect, useState } from "react";
import InputField from "../../Tags/InputField";
import PurpleButton from "../../Tags/PurpleButton";
import { Customer } from "../../../redux/features/customerSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdateServiceContactMutation } from "../../../redux/api/customerApi";

interface EditCustomerServiceContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Partial<Customer>;
}

const EditCustomerServiceContactModal: React.FC<EditCustomerServiceContactModalProps> = ({ isOpen, onClose, initialData }) => {
    const [serviceFirstName, setServiceFirstName] = useState("");
    const [serviceLastName, setServiceLastName] = useState("");
    const [serviceContact, setServiceContact] = useState<string>(initialData?.service_contact || "");
    const [updateCustomer] = useUpdateServiceContactMutation();
    const navigate = useNavigate();

    const customerId = localStorage.getItem("selectedCustomerId");

    type APIError = {
        data: {
            message: string;
        };
    };

    const isAPIError = (error: any): error is APIError => {
        return error && error.data && typeof error.data.message === "string";
    };

    const combinedServiceContact = `${serviceFirstName}, ${serviceLastName}, ${serviceContact}`;
    const data = {
        id: customerId as string,
        service_contact: combinedServiceContact,
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await updateCustomer(data).unwrap();
            toast.success("Customer updated successfully!", {
                autoClose: 1000,
            });
            setTimeout(() => {
                navigate("/manage-customer");
            }, 1000);
        } catch (error) {
            if (isAPIError(error)) {
                toast.error("Error Updating Customer: " + error.data.message, {
                    autoClose: 1000,
                });
            } else if (error instanceof Error) {
                toast.error("Error Updating Customer: " + error.message, {
                    autoClose: 1000,
                });
            } else {
                toast.error("An unknown error occurred", {
                    autoClose: 1000,
                });
            }
            console.error("Error Updating Customer:", error);
        }
    };

    useEffect(() => {
        if (initialData) {
            const serviceContactParts = initialData.service_contact ? initialData.service_contact.split(", ") : [];
            setServiceFirstName(serviceContactParts[0] ?? "");
            setServiceLastName(serviceContactParts[1] ?? "");
            setServiceContact(serviceContactParts[2] ?? "");
        }
    }, [initialData])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[50vw] p-[2vw] relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    ✕
                </button>
                <form onSubmit={handleSubmit} className="font-inter">
                    <div className="grid grid-cols-2 gap-[1vw]">
                        <InputField
                            label="Service First Name"
                            name="serviceFirstName"
                            fieldType="text"
                            value={serviceFirstName}
                            placeholder="Enter service first name"
                            onChange={(e) => setServiceFirstName(e.target.value)}
                            required
                        />
                        <InputField
                            label="Service Last Name"
                            name="serviceLastName"
                            fieldType="text"
                            value={serviceLastName}
                            placeholder="Enter service Last name"
                            onChange={(e) => setServiceLastName(e.target.value)}
                            required
                        />
                        <InputField
                            label="Service Contact"
                            name="serviceContact"
                            fieldType="text"
                            value={serviceContact}
                            placeholder="Enter service contact"
                            onChange={(e) => setServiceContact(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-[1vw] mt-[1vw]">
                        <PurpleButton type="submit" text="Save" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCustomerServiceContactModal;
