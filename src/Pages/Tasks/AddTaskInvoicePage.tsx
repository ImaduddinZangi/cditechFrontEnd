import React, { useState } from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import AddTaskInvoice from '../../Components/Tasks/ManageTasks/AddTaskInvoice'
import { TaskType } from '../../redux/features/taskTypeSlice';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../Components/Constants/Loader';
import { useCreateTaskTypeMutation } from '../../redux/api/taskTypeApi';
import { useNavigate } from 'react-router-dom';

const AddTaskInvoicePage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [createTaskType] = useCreateTaskTypeMutation();
    const navigate = useNavigate();

    type APIError = {
        data: {
            message: string;
        };
    };

    const isAPIError = (error: any): error is APIError => {
        return error && error.data && typeof error.data.message === "string";
    };

    const handleAddTaskInvoice = async (taskTypeData: TaskType) => {
        try {
            setLoading(true);
            await createTaskType(taskTypeData).unwrap();
            toast.success("Task Invoice added successfully!", {
                onClose: () => navigate("/manage-task-invoices"),
                autoClose: 1000,
            });
        } catch (error) {
            if (isAPIError(error)) {
                toast.error("Error Adding Task Invoice: " + error.data.message, {
                    onClose: () => navigate("/error/500"),
                    autoClose: 1000,
                });
            } else if (error instanceof Error) {
                toast.error("Error Adding Task Invoice: " + error.message, {
                    onClose: () => navigate("/error/500"),
                    autoClose: 1000,
                });
            } else {
                toast.error("An unknown error occurred", {
                    onClose: () => navigate("/error/500"),
                    autoClose: 1000,
                });
            }
            console.error("Error Adding Task Invoice:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <ClientLayout breadcrumb='Task Invoice'>
            {loading ? (
                <div className="w-full h-[70vh] flex items-center justify-center">
                    <Loader text="Processing..." />
                </div>
            ) : (
                <AddTaskInvoice onSubmit={handleAddTaskInvoice} />
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

export default AddTaskInvoicePage