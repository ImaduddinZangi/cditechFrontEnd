import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTaskByIdQuery } from "../../../redux/api/taskApi";
import Loader from "../../Constants/Loader";
import OutlinePurpleButton from "../../Tags/OutlinePurpleButton";
import PurpleButton from "../../Tags/PurpleButton";

const TaskDetails: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const { data: task, isLoading, error } = useGetTaskByIdQuery(taskId || "");
    const navigate = useNavigate();

    const formatTimestamp = (timestamp: string): string => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    if (isLoading) {
        return (
            <div className="w-full h-[70vh] flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center">Error loading task details</p>;
    }

    return (
        <div className="m-[2vw] p-[1.5vw] bg-white shadow-lg rounded-lg">
            {task && (
                <div className="grid grid-cols-4 gap-[1vw]">
                    <div>
                        <p className="text-[1vw] text-gray-0 font-medium font-inter">Task Type:</p>
                        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{task.taskType.name}</p>
                    </div>
                    <div>
                        <p className="text-[1vw] text-gray-0 font-medium font-inter">Customer ID:</p>
                        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{task.customer?.id || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-[1vw] text-gray-0 font-medium font-inter">Due Date:</p>
                        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{formatTimestamp(task.dueDate)}</p>
                    </div>
                    <div>
                        <p className="text-[1vw] text-gray-0 font-medium font-inter">Task ID:</p>
                        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{task.taskId}</p>
                    </div>
                    <div>
                        <p className="text-[1vw] text-gray-0 font-medium font-inter">Status:</p>
                        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{task.taskStatus.name}</p>
                    </div>
                    <div>
                        <p className="text-[1vw] text-gray-0 font-medium font-inter">Priority:</p>
                        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{task.taskPriority}</p>
                    </div>
                    <div>
                        <p className="text-[1vw] text-gray-0 font-medium font-inter">Interval:</p>
                        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{task.taskInterval}</p>
                    </div>
                    <div>
                        <p className="text-[1vw] text-gray-0 font-medium font-inter">Weather:</p>
                        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{task.weather || "Not Available"}</p>
                    </div>
                    <div>
                        <p className="text-[1vw] text-gray-0 font-medium font-inter">Assigned Users:</p>
                        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                            {task.assignedUsers.map((user, index) => (
                                <span key={user.id}>
                                    {user.username}
                                    {index < task.assignedUsers.length - 1 && ", "}
                                </span>
                            ))}
                        </p>
                    </div>
                    <div>
                        <p className="text-[1vw] text-gray-0 font-medium font-inter">Assets:</p>
                        {task.assets.length > 0 ? (
                            <ul className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                                {task.assets.map((asset, index) => (
                                    <li key={asset.id}>
                                        {asset.name}
                                        {index < task.assets.length - 1 && ", "}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">No assets assigned</p>
                        )}
                    </div>
                </div>
            )}
            <div className="flex justify-end space-x-[1vw]">
                <OutlinePurpleButton text="Edit Task" onClick={() => navigate(`/edit-task/${task?.id}`)} />
                <OutlinePurpleButton text="Manage Customer" onClick={() => navigate("/manage-customer")} />
                <PurpleButton text="Back" onClick={() => navigate("/manage-tasks")} />
            </div>
        </div>
    );
};

export default TaskDetails;
