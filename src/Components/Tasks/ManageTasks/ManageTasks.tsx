import React, { useState, useMemo, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import PurpleButton from "../../Tags/PurpleButton";
import Loader from "../../Constants/Loader";
import { useGetTasksQuery } from "../../../redux/api/taskApi";
import WhiteButton from "../../Tags/WhiteButton";
import OutlinePurpleButton from "../../Tags/OutlinePurpleButton";

const ManageTasks: React.FC = React.memo(() => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 10;

    const { data: tasks, isLoading } = useGetTasksQuery();

    const handleSearchChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
        },
        []
    );

    const highlightText = useCallback((text: string, highlight: string) => {
        if (!highlight) return text;
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={index} className="bg-yellow-200">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    }, []);

    const filteredTasks = useMemo(() => {
        return tasks?.filter(
            (task) =>
                task.taskPriority?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.taskType?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.customer?.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.assets?.some((asset) => asset.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                task.dueDate?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, tasks]);

    const totalPages = Math.ceil((filteredTasks?.length || 0) / tasksPerPage);
    const paginatedData = filteredTasks?.slice(
        (currentPage - 1) * tasksPerPage,
        currentPage * tasksPerPage
    );

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="m-[2vw] font-inter">
            <div className="flex justify-between items-center py-[1vw]">
                <div className="flex flex-row items-center gap-[1vw]">
                    <PurpleButton text="Sort by Custom" />
                    <WhiteButton text="Assigned to me" />
                    <WhiteButton text="Not Assigned" />
                </div>
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search"
                        className="px-[1vw] py-[0.2vw] border rounded-[0.5vw] placeholder:text-[1vw] text-[1vw] focus:outline-none"
                    />
                    <FiSearch
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                        size={16}
                    />
                </div>
            </div>

            <div className="overflow-x-auto p-[1vw] shadow-lg rounded-lg">
                <table className="min-w-full bg-white border-b border-gray-200 rounded-lg">
                    <thead>
                        <tr className="h-[3vw] text-darkgray-0 border-b uppercase text-[1vw] leading-normal p-[0.2vw] bg-textpurple-0 rounded-[0.5vw] bg-opacity-5">
                            <th className="py-[1vw] px-[1.5vw] text-left">Priority</th>
                            <th className="py-[1vw] px-[1.5vw] text-left">Type</th>
                            <th className="py-[1vw] px-[1.5vw] text-left">Customer</th>
                            <th className="py-[1vw] px-[1.5vw] text-left">Assets</th>
                            <th className="py-[1vw] px-[1.5vw] text-left">Due Date</th>
                            <th className="py-[1vw] px-[1.5vw] text-left">Weather</th>
                            <th className="py-[1vw] px-[1.5vw] text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-[1vw] font-light">
                        {isLoading && (
                            <tr>
                                <td colSpan={7} className="text-center py-[2vw]">
                                    <Loader />
                                </td>
                            </tr>
                        )}
                        {!isLoading && paginatedData?.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-[2vw]">
                                    <p className="text-[1.5vw] font-semibold">No tasks found</p>
                                </td>
                            </tr>
                        )}
                        {!isLoading &&
                            paginatedData?.map((task, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                >
                                    <td className="py-[1vw] px-[1.5vw] text-left">
                                        {highlightText(task.taskPriority || "N/A", searchTerm)}
                                    </td>
                                    <td className="py-[1vw] px-[1.5vw] text-left">
                                        {highlightText(task.taskType?.name || "N/A", searchTerm)}
                                    </td>
                                    <td className="py-[1vw] px-[1.5vw] text-left">
                                        {highlightText(task.customer?.id || "N/A", searchTerm)}
                                    </td>
                                    <td className="py-[1vw] px-[1.5vw] text-left">
                                        {task.assets?.map((asset) => highlightText(asset.name || "N/A", searchTerm)).join(', ') || "N/A"}
                                    </td>
                                    <td className="py-[1vw] px-[1.5vw] text-left">
                                        {highlightText(new Date(task.dueDate || "N/A").toLocaleDateString(), searchTerm)}
                                    </td>
                                    <td className="py-[1vw] px-[1.5vw] text-left">
                                        {highlightText(task.weather || "N/A", searchTerm)}
                                    </td>
                                    <td className="py-[1vw] px-[1.5vw] text-left flex space-x-2">
                                        <WhiteButton text="Begin" />
                                        <OutlinePurpleButton text="Begin" />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-between py-[1vw]">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-[1vw] py-[0.5vw] border bg-white text-darkgray-0 rounded-[0.4vw] text-[1vw] font-inter font-medium"
                    >
                        Previous
                    </button>
                    <div className="flex space-x-1">
                        {[...Array(totalPages).keys()].map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page + 1)}
                                className={`${currentPage === page + 1
                                    ? "bg-purple-0 text-white"
                                    : "bg-gray-300 text-gray-600"
                                    } py-1 px-3 rounded`}
                            >
                                {page + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-[1vw] py-[0.5vw] border bg-white text-darkgray-0 rounded-[0.4vw] text-[1vw] font-inter font-medium"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ManageTasks;
