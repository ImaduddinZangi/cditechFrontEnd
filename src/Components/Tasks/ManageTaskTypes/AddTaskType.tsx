import React, { useState, useEffect } from 'react';
import InputField from '../../Tags/InputField';
import WhiteButton from '../../Tags/WhiteButton';
import { TaskType } from '../../../redux/features/taskTypeSlice';
import SelectField, { Option } from '../../Tags/SelectField';
import { useGetServicesQuery } from '../../../redux/api/serviceApi';

interface AddTaskTypeProps {
    onSubmit: (data: TaskType) => void;
    initialData?: Partial<TaskType>;
}

const AddTaskType: React.FC<AddTaskTypeProps> = ({ onSubmit, initialData }) => {
    const [name, setName] = useState<string>(initialData?.name || "");
    const [taskWeight, setTaskWeight] = useState<number>(initialData?.taskWeight || 0);
    const [baseTaskWorkTime, setBaseTaskWorkTime] = useState<number>(initialData?.baseTaskWorkTime || 0);
    const [services, setServices] = useState<Option[]>([]);
    const [pairedServiceFeeId, setPairedServiceFeeId] = useState<Option | null>(null);
    const [pairedServiceFeeQuantityRequired, setPairedServiceFeeQuantityRequired] = useState<boolean>(initialData?.pairedServiceFeeQuantityRequired || false);
    const { data: servicesData } = useGetServicesQuery();

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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({
            id: initialData?.id,
            name,
            taskWeight,
            baseTaskWorkTime,
            pairedServiceFeeId: pairedServiceFeeId?.value || "",
            pairedServiceFeeQuantityRequired,
        });
    };

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
                <div className="w-full flex items-center space-x-[1vw]">
                    <p className="text-[1vw] text-darkgray-0 font-medium mr-[2vw]">Service Fee Requires Quantity?</p>
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
                <div className='grid grid-cols-2 gap-[1vw]'>
                    <InputField
                        label="Task Weight:"
                        fieldType="number"
                        value={taskWeight}
                        onChange={(e) => setTaskWeight(parseInt(e.target.value))}
                        placeholder="Task weight"
                        required
                    />
                    <InputField
                        label="Base Task Work Hours:"
                        fieldType="number"
                        value={baseTaskWorkTime}
                        onChange={(e) => setBaseTaskWorkTime(parseInt(e.target.value))}
                        placeholder="Task Hours"
                        required
                    />
                </div>
            </div>
            <div className="flex justify-end space-x-[1vw] mt-[10vw]">
                <WhiteButton type='submit' text="Save & Close" />
            </div>
        </form>
    );
};

export default AddTaskType;
