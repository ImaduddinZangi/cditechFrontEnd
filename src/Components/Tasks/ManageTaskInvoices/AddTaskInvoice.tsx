import React, { useEffect, useState } from 'react';
import InputField from '../../Tags/InputField';
import WhiteButton from '../../Tags/WhiteButton';
import PurpleButton from '../../Tags/PurpleButton';
import SelectField, { Option } from '../../Tags/SelectField';
import { useGetServicesQuery } from '../../../redux/api/serviceApi';
import { TaskType } from '../../../redux/features/taskTypeSlice';

interface AddTaskInvoiceProps {
    onSubmit: (data: TaskType) => void;
    initialData?: Partial<TaskType>;
}

const AddTaskInvoice: React.FC<AddTaskInvoiceProps> = ({ onSubmit, initialData }) => {
    const [services, setServices] = useState<Option[]>([]);
    const [pairedServiceFeeId, setPairedServiceFeeId] = useState<Option | null>(null);
    const [name, setName] = useState<string>(initialData?.name || "");
    const [pairedServiceFeeQuantityRequired, setPairedServiceFeeQuantityRequired] = useState<boolean>(initialData?.pairedServiceFeeQuantityRequired || false);
    const { data: servicesData } = useGetServicesQuery();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({
            id: initialData?.id,
            name,
            pairedServiceFeeId: pairedServiceFeeId?.value || "",
            pairedServiceFeeQuantityRequired,
        });
    };

    useEffect(() => {
        if (servicesData) {
            const serviceOptions = servicesData.map((service) => ({
                label: `${service.name} - $${service.price}`,
                value: service.id,
            }));
            setServices(serviceOptions);

            if (serviceOptions.length > 0) {
                setPairedServiceFeeId(serviceOptions[0]);
            }
        }
    }, [servicesData]);

    return (
        <form
            onSubmit={handleSubmit}
            className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-[0.4vw] font-inter"
        >
            <div className="flex justify-end items-center mb-[1.5vw]">
                <WhiteButton text="Cancel" />
            </div>
            <div className="space-y-[1.5vw]">
                <InputField
                    label="Task Type Name:"
                    fieldType="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter task type name"
                    required
                />
                <SelectField
                    label="Paired Service Fee:"
                    value={pairedServiceFeeId}
                    onChange={setPairedServiceFeeId}
                    options={services}
                    required
                />
                <div>
                    <div className="w-full flex items-center space-x-[1vw]">
                        <p className="text-[1vw] text-darkgray-0 font-medium">Service Fee Requires Quantity?</p>
                        <label className="flex items-center space-x-[0.2vw]">
                            <input
                                type="radio"
                                name="pump1Runs"
                                checked={pairedServiceFeeQuantityRequired}
                                onChange={() => setPairedServiceFeeQuantityRequired(true)}
                                className="accent-purple-0"
                            />
                            <p className="text-[1vw] text-darkgray-0 font-medium">Yes</p>
                        </label>
                        <label className="flex items-center space-x-[0.2vw]">
                            <input
                                type="radio"
                                name="pump1Runs"
                                checked={!pairedServiceFeeQuantityRequired}
                                onChange={() => setPairedServiceFeeQuantityRequired(false)}
                                className="accent-purple-0"
                            />
                            <p className="text-[1vw] text-darkgray-0 font-medium">No</p>
                        </label>
                    </div>
                    <p className="text-[0.9vw] text-gray-0 mt-[0.5vw]">
                        If no, default quantity is always 1
                    </p>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between space-x-4 mt-[10vw]">
                <p className="text-[0.9vw] text-gray-0 mt-[0.5vw]">
                    Default Types: Yes
                </p>
                <PurpleButton type='submit' text="Save & Close" />
            </div>
        </form>
    );
};

export default AddTaskInvoice;
