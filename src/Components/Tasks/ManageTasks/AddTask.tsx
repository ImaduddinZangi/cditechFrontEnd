import React, { useEffect, useState } from 'react';
import InputField from '../../Tags/InputField';
import WhiteButton from '../../Tags/WhiteButton';
import PurpleButton from '../../Tags/PurpleButton';
import SelectField, { Option } from '../../Tags/SelectField';
import { useGetAssetsQuery } from '../../../redux/api/assetApi';
import { GetTask, Task } from '../../../redux/features/taskSlice';
import { useGetTaskTypesQuery } from '../../../redux/api/taskTypeApi';
import { useGetClientUsersQuery } from '../../../redux/api/clientUserApi';
import { useGetCustomersQuery } from '../../../redux/api/customerApi';

const intervalOptions = [
    { label: "Daily", value: "Daily" },
    { label: "Bi-Monthly", value: "Bi-Monthly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Quarterly", value: "Quarterly" },
    { label: "Bi-Annual", value: "Bi-Annual" },
    { label: "Annual", value: "Annual" },
    { label: "One-Time", value: "One-Time" },
];

const priorityOptions = [
    { label: "Emergency", value: "Emergency" },
    { label: "High", value: "High" },
    { label: "Normal", value: "Normal" },
    { label: "Low", value: "Low" },
];

interface AddTaskProps {
    onSubmit: (data: Task) => void;
    initialData?: Partial<GetTask>;
    isEditing?: boolean;
}

const AddTask: React.FC<AddTaskProps> = ({ onSubmit, initialData, isEditing }) => {
    const [reoccurringEndDate, setReoccurringEndDate] = useState<string>(initialData?.reoccurringEndDate ? new Date(initialData.reoccurringEndDate).toISOString().slice(0, 10) : "");
    const [dueDate, setDueDate] = useState<string>(
        initialData?.dueDate ? new Date(initialData.dueDate).toISOString().slice(0, 10) : ""
    );
    const [customers, setCustomers] = useState<Option[]>([]);
    const [customerId, setCustomerId] = useState<Option | null>(
        initialData?.customer
            ? { label: initialData.customer.name, value: initialData.customer.id }
            : null
    );
    const [assets, setAssets] = useState<Option[]>([]);
    const [assetIds, setAssetIds] = useState<string[]>(
        initialData?.assets?.map((asset) => asset.id) || []
    );
    const [taskTypes, setTaskTypes] = useState<Option[]>([]);
    const [taskTypeId, setTaskTypeId] = useState<Option | null>(
        initialData?.taskType
            ? { label: initialData.taskType.name, value: initialData.taskType.id as string }
            : null
    );
    const [users, setUsers] = useState<Option[]>([]);
    const [assignedUserIds, setAssignedUserIds] = useState<string[]>(
        initialData?.assignedUsers?.map((user) => user.id) || []
    );
    const [taskInterval, setTaskInterval] = useState<Option | null>(
        initialData?.taskInterval
            ? { label: initialData.taskInterval, value: initialData.taskInterval }
            : null
    );
    const [taskPriority, setTaskPriority] = useState<Option | null>(
        initialData?.taskPriority
            ? { label: initialData.taskPriority, value: initialData.taskPriority }
            : null
    );

    const { data: assetsData } = useGetAssetsQuery();
    const { data: usersData } = useGetClientUsersQuery();
    const { data: taskTypesData } = useGetTaskTypesQuery();
    const { data: customersData } = useGetCustomersQuery();

    const toggleAssetSelection = (assetId: string) => {
        setAssetIds((prev) =>
            prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]
        );
    };

    const toggleUserSelection = (userId: string) => {
        setAssignedUserIds((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    useEffect(() => {
        if (customersData) {
            const customerOptions = customersData.map((customer) => ({
                label: customer.name,
                value: customer.id,
            }));
            setCustomers(customerOptions);

            if (initialData?.customer) {
                const selectedCustomer = customerOptions.find(
                    (c) => c.value === initialData.customer?.id
                );
                setCustomerId(selectedCustomer || null);
            }
        }
    }, [customersData, initialData]);

    useEffect(() => {
        if (assetsData) {
            const assetOptions = assetsData.map((asset) => ({
                label: asset.name,
                value: asset.id,
            }));
            setAssets(assetOptions);
        }
    }, [assetsData]);

    useEffect(() => {
        if (taskTypesData) {
            const taskTypeOptions = taskTypesData.map((taskType) => ({
                label: taskType.name,
                value: taskType.id as string,
            }));
            setTaskTypes(taskTypeOptions);

            if (initialData?.taskType) {
                const selectedTaskType = taskTypeOptions.find(
                    (c) => c.value === initialData.taskType?.id
                );
                setTaskTypeId(selectedTaskType || null);
            }
        }
    }, [taskTypesData, initialData]);

    useEffect(() => {
        if (usersData) {
            const userOptions = usersData.map((user) => ({
                label: user.username,
                value: user.id,
            }));
            setUsers(userOptions);
        }
    }, [usersData]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({
            customerId: customerId?.value || "",
            taskTypeId: taskTypeId?.value,
            taskPriority: taskPriority?.value as 'Emergency' | 'High' | 'Normal' | 'Low',
            taskInterval: taskInterval?.value as 'One-Time' | 'Daily' | 'Bi-Monthly' | 'Monthly' | 'Quarterly' | 'Annual',
            dueDate,
            reoccurringEndDate,
            assetIds,
            assignedUserIds,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-[0.4vw] font-inter">
            <div className="flex justify-between items-start space-x-[1vw]">
                <div className="w-1/3 space-y-[1vw]">
                    <SelectField
                        label="Customer"
                        value={customerId}
                        onChange={(option) => setCustomerId(option)}
                        options={customers}
                    />
                    <label className="block text-darkgray-0 font-semibold mb-[1vw]">Task Assets</label>
                    <div className="border p-[1vw] space-y-[1vw] rounded-[0.4vw] h-[63vh] overflow-y-auto">
                        {assets.map((asset) => (
                            <WhiteButton
                                key={asset.value}
                                text={asset.label}
                                icon={!assetIds.includes(asset.value) && <span className="text-lg font-bold">+</span>}
                                className={`w-full ${assetIds.includes(asset.value) ? 'bg-gray-200' : ''}`}
                                onClick={() => toggleAssetSelection(asset.value)}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-2/3 border p-[1vw] rounded-[0.4vw]">
                    <div className="grid grid-cols-2 gap-[1vw]">
                        <div className='flex flex-col gap-[1vw]'>
                            <SelectField
                                label="Task Type"
                                value={taskTypeId}
                                onChange={(option) => setTaskTypeId(option)}
                                options={taskTypes}
                                placeholder="Select task type"
                            />
                            <SelectField
                                label="Task Interval"
                                value={taskInterval}
                                onChange={(option) => setTaskInterval(option)}
                                options={intervalOptions}
                            />
                            <InputField
                                label="Task Due Date:"
                                fieldType="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                            <InputField
                                label="Task End Date:"
                                fieldType="date"
                                value={reoccurringEndDate}
                                onChange={(e) => setReoccurringEndDate(e.target.value)}
                            />
                            <SelectField
                                label="Assign To User"
                                options={users}
                                placeholder="Select Users"
                                onChange={(option) => option && toggleUserSelection(option.value)}
                            />
                            {users.length > 0 && assignedUserIds.length > 0 && (
                                <div className="col-span-2">
                                    <label className="block text-darkgray-0 font-medium text-[1vw] text-inter">Assigned Users</label>
                                    <ul>
                                        {assignedUserIds.map((id) => {
                                            const user = users.find((user) => user.value === id);
                                            return (
                                                <li key={id} className="flex items-center justify-between">
                                                    <span className='block text-gray-0 text-[1vw] text-inter'>{user?.label}</span>
                                                    <button
                                                        type="button"
                                                        className="text-red-500 hover:text-red-700 text-[1vw] w-[5vw]"
                                                        onClick={() => toggleUserSelection(id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div>
                            <SelectField
                                label="Task Priority"
                                value={taskPriority}
                                onChange={(option) => setTaskPriority(option)}
                                options={priorityOptions}
                                placeholder="Select priority"
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-end space-x-[1vw] mt-[1vw]">
                        <PurpleButton type="submit" text={isEditing ? "Update and Save" : "Save and Create New Task"} />
                        <WhiteButton text="Cancel Go Back" />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddTask;
