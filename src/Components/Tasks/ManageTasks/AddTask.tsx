import React, { useEffect, useState } from 'react';
import InputField from '../../Tags/InputField';
import WhiteButton from '../../Tags/WhiteButton';
import PurpleButton from '../../Tags/PurpleButton';
import SelectField, { Option } from '../../Tags/SelectField';
import { useGetAssetsQuery } from '../../../redux/api/assetApi';
import { Task } from '../../../redux/features/taskSlice';
import { useGetTaskTypesQuery } from '../../../redux/api/taskTypeApi';
import { useGetClientUsersQuery } from '../../../redux/api/clientUserApi';

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
    initialData?: Partial<Task>;
}

const AddTask: React.FC<AddTaskProps> = ({ onSubmit, initialData }) => {
    const [reoccurringEndDate, setReoccurringEndDate] = useState<string>(initialData?.reoccurringEndDate || "");
    const [dueDate, setDueDate] = useState<string>(initialData?.dueDate || "");
    const [assets, setAssets] = useState<Option[]>([]);
    const [assetIds, setAssetIds] = useState<string[]>(initialData?.assetIds || []);
    const [taskTypes, setTaskTypes] = useState<Option[]>([]);
    const [taskTypeId, setTaskTypeId] = useState<Option | null>(null);
    const [users, setUsers] = useState<Option[]>([]);
    const [userId, setUserId] = useState<Option | null>(null);
    const [taskInterval, setTaskInterval] = useState<Option | null>(null);
    const [taskPriority, setTaskPriority] = useState<Option | null>(null);

    const { data: assetsData } = useGetAssetsQuery();
    const { data: usersData } = useGetClientUsersQuery();
    const { data: taskTypesData } = useGetTaskTypesQuery();

    // Handle asset selection toggle
    const toggleAssetSelection = (assetId: string) => {
        setAssetIds((prev) => 
            prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]
        );
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({
            customerId: "", // Assuming customerId will be passed or handled elsewhere
            taskTypeId: taskTypeId?.value,
            taskPriority: taskPriority?.value as 'Emergency' | 'High' | 'Normal' | 'Low',
            taskInterval: taskInterval?.value as 'One-Time' | 'Daily' | 'Bi-Monthly' | 'Monthly' | 'Quarterly' | 'Annual',
            dueDate,
            reoccurringEndDate,
            assetIds,
            assignedUserIds: userId ? [userId.value] : [],
        });
    };

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
            const taskTypeOptions = taskTypesData
                .filter((taskType) => taskType.id !== undefined)
                .map((taskType) => ({
                    label: taskType.name,
                    value: taskType.id as string,
                }));
            setTaskTypes(taskTypeOptions);
        }
    }, [taskTypesData]);
    

    useEffect(() => {
        if (usersData) {
            const userOptions = usersData.map((user) => ({
                label: user.username,
                value: user.id,
            }));
            setUsers(userOptions);
        }
    }, [usersData]);

    return (
        <form onSubmit={handleSubmit} className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-[0.4vw] font-inter">
            <div className="flex justify-between items-start space-x-4">
                <div className="w-1/3 space-y-4">
                    <div>
                        <InputField
                            label='Customer:'
                            fieldType='text'
                            placeholder='Search'
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-darkgray-0 font-semibold mb-[1vw]">Task Assets</label>
                        <div className='border p-[1vw] space-y-[1vw] rounded-[0.4vw] h-[63vh] overflow-y-auto'>
                            {assets.map((asset) => (
                                <WhiteButton
                                    key={asset.value}
                                    text={asset.label}
                                    icon={!assetIds.includes(asset.value) && <span className="text-lg font-bold">+</span>}
                                    className='w-full'
                                    onClick={() => toggleAssetSelection(asset.value)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-2/3 border p-[1vw] rounded-[0.4vw]">
                    <div className='grid grid-cols-2 gap-[1vw]'>
                        <div className="flex flex-col space-y-[1vw]">
                            <SelectField
                                label='Task Type'
                                value={taskTypeId}
                                onChange={(option) => setTaskTypeId(option)}
                                placeholder='Select task type'
                                options={taskTypes}
                            />
                            <SelectField
                                label='Task Interval'
                                value={taskInterval}
                                onChange={(option) => setTaskInterval(option)}
                                options={intervalOptions}
                                placeholder='Select interval'
                            />
                            <InputField
                                label='Task Due Date:'
                                fieldType='date'
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                            <InputField
                                label='Task End Date:'
                                fieldType='date'
                                value={reoccurringEndDate}
                                onChange={(e) => setReoccurringEndDate(e.target.value)}
                            />
                            <SelectField
                                label='Assign To User'
                                value={userId}
                                onChange={(option) => setUserId(option)}
                                options={users}
                                placeholder='Select user'
                            />
                        </div>
                        <div className="flex flex-col">
                            <SelectField
                                label='Task Priority'
                                value={taskPriority}
                                onChange={(option) => setTaskPriority(option)}
                                placeholder='Select priority'
                                options={priorityOptions}
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-end space-x-[1vw] mt-[1vw]">
                        <PurpleButton type="submit" text='Save and Create New Task' />
                        <WhiteButton text='Cancel Go Back' />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddTask;
