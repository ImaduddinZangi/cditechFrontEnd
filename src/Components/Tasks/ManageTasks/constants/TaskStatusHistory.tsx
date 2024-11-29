import React from "react";
import { useGetTaskStatusHistoriesQuery } from "../../../../redux/api/taskStatusHistoryApi";
import { useParams } from "react-router-dom";

const TaskStatusHistory: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { data: taskStatusHistoryData } = useGetTaskStatusHistoriesQuery(taskId as string);

  // Helper function to format the date
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString(); // Returns the local date
  };

  // Helper function to format the time
  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Returns local time (hh:mm AM/PM)
  };

  return (
    <div className="py-[0.5vw] border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">Sort By: Most Recent</h2>
      </div>
      <div className="space-y-4">
        {taskStatusHistoryData?.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-5 items-center border p-[1vw] rounded-lg my-[1vw]"
          >
            <div>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">Status:</p>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{task.taskStatus.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                <p className="text-[1vw] text-gray-0 font-medium font-inter">Set By:</p>
                <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{task.createdByUser.username}</p>
              </div>
            </div>
            <div>
              <img
                src={"https://via.placeholder.com/40"}
                alt="Profile"
                className="w-[3vw] h-[3vw] rounded-full"
              />
            </div>
            <div>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">Date:</p>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{formatDate(task.createdAt)}</p>
            </div>
            <div>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">Time:</p>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{formatTime(task.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusHistory;
