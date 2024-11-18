import React, { useState } from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import AddTask from '../../Components/Tasks/ManageTasks/AddTask'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTaskByIdQuery, useUpdateTaskMutation } from '../../redux/api/taskApi';
import { Task } from '../../redux/features/taskSlice';
import { toast } from 'react-toastify';
import Loader from '../../Components/Constants/Loader';

const EditTaskPage: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const [loading, setLoading] = useState(false);
    const { data: task, isLoading } = useGetTaskByIdQuery(taskId!);
    const [updateTask] = useUpdateTaskMutation();
    const navigate = useNavigate();

    type APIError = {
        data: {
            message: string;
        };
    };

    const isAPIError = (error: any): error is APIError => {
        return error && error.data && typeof error.data.message === "string";
    };

    const handleUpdateTask = async (taskData: Task) => {
        try {
            setLoading(true);
            const result = await updateTask(taskData).unwrap();
            toast.success("Pump Brand updated successfully!", {
                onClose: () => navigate("/manage-pump-brands"),
                autoClose: 1000,
            });
            console.log("Pump brand updated successfully", result);
        } catch (error) {
            if (isAPIError(error)) {
                toast.error("Error Updating Pump Brand: " + error.data.message, {
                    onClose: () => navigate("/error/500"),
                    autoClose: 1000,
                });
            } else if (error instanceof Error) {
                toast.error("Error Updating Pump Brand: " + error.message, {
                    onClose: () => navigate("/error/500"),
                    autoClose: 1000,
                });
            } else {
                toast.error("An unknown error occurred", {
                    onClose: () => navigate("/error/500"),
                    autoClose: 1000,
                });
            }
            console.error("Error Updating Pump Brand:", error);
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-[70vh] flex items-center justify-center">
                <Loader />
            </div>
        );
    }
    return (
        <ClientLayout breadcrumb='Edit Task'>
            {loading ? (
                <div className="w-full h-[70vh] flex items-center justify-center">
                    <Loader text="Processing..." />
                </div>
            ) : (
                <AddTask onSubmit={handleUpdateTask} initialData={task} isEditing={true} />
            )}
        </ClientLayout>
    )
}

export default EditTaskPage