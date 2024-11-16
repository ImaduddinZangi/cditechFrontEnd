import React from "react";

interface TaskStatusHistoryItem {
  id: string;
  status: string;
  setBy: string;
  date: string;
  time: string;
  profileImage: string;
}

const taskStatusHistoryData: TaskStatusHistoryItem[] = [
  {
    id: "1",
    status: "Not Completed",
    setBy: "First, Last",
    date: "July 25 2024",
    time: "7:35 PM",
    profileImage: "https://via.placeholder.com/40", // Placeholder image
  },
  {
    id: "2",
    status: "Not Completed",
    setBy: "First, Last",
    date: "July 25 2024",
    time: "7:35 PM",
    profileImage: "https://via.placeholder.com/40", // Placeholder image
  },
  {
    id: "3",
    status: "Not Completed",
    setBy: "First, Last",
    date: "July 25 2024",
    time: "7:35 PM",
    profileImage: "https://via.placeholder.com/40", // Placeholder image
  },
  {
    id: "4",
    status: "Not Completed",
    setBy: "First, Last",
    date: "July 25 2024",
    time: "7:35 PM",
    profileImage: "https://via.placeholder.com/40", // Placeholder image
  },
];

const TaskStatusHistory: React.FC = () => {
  return (
    <div className="py-[0.5vw] border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">Sort By: Most Recent</h2>
      </div>
      <div className="space-y-4">
        {taskStatusHistoryData.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-4 items-center border p-[1vw] rounded-lg my-[1vw]"
          >
            <div>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">Status:</p>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{task.status}</p>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={task.profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-[1vw] text-gray-0 font-medium font-inter">Set By:</p>
                <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{task.setBy}</p>
              </div>
            </div>
            <div>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">Date:</p>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{task.date}</p>
            </div>
            <div>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">Time:</p>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{task.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusHistory;
