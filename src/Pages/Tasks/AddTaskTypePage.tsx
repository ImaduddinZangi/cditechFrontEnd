import React, { useState } from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import AddTaskType from '../../Components/Tasks/ManageTaskTypes/AddTaskType'
import { useCreateTaskTypeMutation } from '../../redux/api/taskTypeApi';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { TaskType } from '../../redux/features/taskTypeSlice';
import Loader from '../../Components/Constants/Loader';

const AddTaskTypePage: React.FC = () => {
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

  const handleAddTaskType = async (taskTypeData: TaskType) => {
    try {
      setLoading(true);
      await createTaskType(taskTypeData).unwrap();
      toast.success("Task Type added successfully!", {
        onClose: () => navigate("/manage-task-types"),
        autoClose: 1000,
      });
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Adding Task Type: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error Adding Task Type: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error Adding Task Type:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout breadcrumb='New Asset Type'>
      {loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        <AddTaskType onSubmit={handleAddTaskType} />
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

export default AddTaskTypePage