import React, { useEffect, useState } from 'react';
import InputField from '../../../Tags/InputField';
import WhiteButton from '../../../Tags/WhiteButton';
import SelectField, { Option } from '../../../Tags/SelectField';
import { TaskSettings } from '../../../../redux/features/taskSettingsSlice';
import RadioButtons from '../../../Tags/RadioButtons';
import PurpleButton from '../../../Tags/PurpleButton';
import { useNavigate } from 'react-router-dom';

export interface TaskAssignmentSettingsProps {
    taskAssignmentOnSubmit: (data: TaskSettings) => void;
    taskAssignmentInitialData?: Partial<TaskSettings>;
}

const invoiceThemeOptions: Option[] = [
    { label: "Default Theme", value: "default" },
    { label: "Theme 1", value: "theme1" },
    { label: "Theme 2", value: "theme2" },
];

const TaskAssignmentSettings: React.FC<TaskAssignmentSettingsProps> = ({ taskAssignmentOnSubmit, taskAssignmentInitialData }) => {
    const [autoAssignUsersToTask, setAutoAssignUsersToTask] = useState<boolean>(false);
    const [maxInProgressTasksPerUser, setMaxInProgressTasksPerUser] = useState<number | null>(null);
    const [allowUsersToCompleteBillTask, setAllowUsersToCompleteBillTask] = useState<boolean>(false);
    const [assignUserToTaskUsingSchedules, setAssignUserToTaskUsingSchedules] = useState<boolean>(false);
    const [enableTaskWeights, setEnableTaskWeights] = useState<boolean>(false);
    const [captureTaskStatusGpsLocation, setCaptureTaskStatusGpsLocation] = useState<boolean>(false);
    const [automaticTaskArrivalStatus, setAutomaticTaskArrivalStatus] = useState<boolean>(false);
    const [automaticTaskInvoiceCreation, setAutomaticTaskInvoiceCreation] = useState<boolean>(false);
    const [taskInvoiceTheme, setTaskInvoiceTheme] = useState<Option | null>(null);
    const [taskWeather, setTaskWeather] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (taskAssignmentInitialData) {
            setAutoAssignUsersToTask(taskAssignmentInitialData.autoAssignUsersToTask || false);
            setMaxInProgressTasksPerUser(taskAssignmentInitialData.maxInProgressTasksPerUser || null);
            setAllowUsersToCompleteBillTask(taskAssignmentInitialData.allowUsersToCompleteBillTask || false);
            setAssignUserToTaskUsingSchedules(taskAssignmentInitialData.assignUserToTaskUsingSchedules || false);
            setEnableTaskWeights(taskAssignmentInitialData.enableTaskWeights || false);
            setCaptureTaskStatusGpsLocation(taskAssignmentInitialData.captureTaskStatusGpsLocation || false);
            setAutomaticTaskArrivalStatus(taskAssignmentInitialData.automaticTaskArrivalStatus || false);
            setAutomaticTaskInvoiceCreation(taskAssignmentInitialData.automaticTaskInvoiceCreation || false);
            setTaskInvoiceTheme(
                taskAssignmentInitialData.taskInvoiceTheme
                    ? { label: taskAssignmentInitialData.taskInvoiceTheme, value: taskAssignmentInitialData.taskInvoiceTheme }
                    : null
            );
            setTaskWeather(taskAssignmentInitialData.taskWeather || false);
        }
    }, [taskAssignmentInitialData]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = {
            client: taskAssignmentInitialData?.client!,
            autoAssignUsersToTask,
            maxInProgressTasksPerUser: maxInProgressTasksPerUser || 0,
            allowUsersToCompleteBillTask,
            assignUserToTaskUsingSchedules,
            enableTaskWeights,
            captureTaskStatusGpsLocation,
            automaticTaskArrivalStatus,
            automaticTaskInvoiceCreation,
            taskInvoiceTheme: taskInvoiceTheme?.value || "",
            taskWeather,
        };
        taskAssignmentOnSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-[1.5vw]">
                <RadioButtons
                    label="Auto assign task to users:"
                    checked={autoAssignUsersToTask}
                    onChange={setAutoAssignUsersToTask}
                />
                <InputField
                    label="Maximum In-progress Tasks to Users:"
                    fieldType="number"
                    value={maxInProgressTasksPerUser?.toString() || ""}
                    onChange={(e) => setMaxInProgressTasksPerUser(parseInt(e.target.value))}
                    placeholder="Enter max tasks"
                    className="flex flex-row items-center gap-[1vw]"
                    fieldClassName="max-w-[10vw]"
                />
                <RadioButtons
                    label="Allow Users to Complete Bill Tasks:"
                    checked={allowUsersToCompleteBillTask}
                    onChange={setAllowUsersToCompleteBillTask}
                />
                <RadioButtons
                    label="Auto Assign Tasks Using User Schedule:"
                    checked={assignUserToTaskUsingSchedules}
                    onChange={setAssignUserToTaskUsingSchedules}
                />
                <RadioButtons
                    label="Enable Task Weights:"
                    checked={enableTaskWeights}
                    onChange={setEnableTaskWeights}
                />
                <RadioButtons
                    label="Capture Task Status GPS Data:"
                    checked={captureTaskStatusGpsLocation}
                    onChange={setCaptureTaskStatusGpsLocation}
                />
                <RadioButtons
                    label="Automatic Task Arrival Status:"
                    checked={automaticTaskArrivalStatus}
                    onChange={setAutomaticTaskArrivalStatus}
                />
                <RadioButtons
                    label="Automatic Task Invoice Creation When Continuing With Service Fee:"
                    checked={automaticTaskInvoiceCreation}
                    onChange={setAutomaticTaskInvoiceCreation}
                />
                <SelectField
                    label="Task Invoice Theme:"
                    value={taskInvoiceTheme}
                    onChange={setTaskInvoiceTheme}
                    options={invoiceThemeOptions}
                    className='flex flex-row items-center gap-[1vw]'
                />
                <RadioButtons
                    label="Task Weather:"
                    checked={taskWeather}
                    onChange={setTaskWeather}
                />
            </div>
            <div className="flex justify-end space-x-[1vw] mt-[1.5vw]">
                <WhiteButton text="Set User Status" />
                <WhiteButton text="Manage Service Fee" onClick={() => navigate("/manage-services")} />
                <WhiteButton text="Future Use" />
                <PurpleButton text="Update" type='submit' />
            </div>
        </form>
    );
};

export default TaskAssignmentSettings;
