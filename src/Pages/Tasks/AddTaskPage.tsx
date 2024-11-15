import React, { useState } from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import AddTask from '../../Components/Tasks/ManageTasks/AddTask'
import { useCreateTaskMutation } from '../../redux/api/taskApi';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../redux/features/taskSlice';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../Components/Constants/Loader';

const AddTaskPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [createTask] = useCreateTaskMutation();
    const navigate = useNavigate();

    type APIError = {
        data: {
            message: string;
        };
    };

    const isAPIError = (error: any): error is APIError => {
        return error && error.data && typeof error.data.message === "string";
    };

    const handleAddTask = async (taskData: Task) => {
        try {
            setLoading(true);
            await createTask(taskData).unwrap();
            toast.success("Task added successfully!", {
                onClose: () => navigate("/manage-tasks"),
                autoClose: 1000,
            });
        } catch (error) {
            if (isAPIError(error)) {
                toast.error("Error Adding Task: " + error.data.message, {
                    onClose: () => navigate("/error/500"),
                    autoClose: 1000,
                });
            } else if (error instanceof Error) {
                toast.error("Error Adding Task: " + error.message, {
                    onClose: () => navigate("/error/500"),
                    autoClose: 1000,
                });
            } else {
                toast.error("An unknown error occurred", {
                    onClose: () => navigate("/error/500"),
                    autoClose: 1000,
                });
            }
            console.error("Error Adding Task:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <ClientLayout breadcrumb='New Task'>
            {loading ? (
                <div className="w-full h-[70vh] flex items-center justify-center">
                    <Loader text="Processing..." />
                </div>
            ) : (
                <AddTask onSubmit={handleAddTask} />
            )}
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </ClientLayout>
    )
}

export default AddTaskPage