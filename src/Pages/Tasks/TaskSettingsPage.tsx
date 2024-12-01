import React, { useState } from 'react';
import ClientLayout from '../../Layouts/ClientLayout';
import TaskSettingsDetails from '../../Components/Tasks/TaskSettings/TaskSettingsDetails';
import { toast, ToastContainer } from 'react-toastify';
import { useGetTaskSettingsQuery, useUpdateTaskSettingsMutation } from '../../redux/api/taskSettingsApi';
import { useNavigate } from 'react-router-dom';
import { TaskSettings } from '../../redux/features/taskSettingsSlice';
import Loader from '../../Components/Constants/Loader';

const TaskSettingsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { data: taskAssignmentData } = useGetTaskSettingsQuery();
  const [createTaskAssignmentSettings] = useUpdateTaskSettingsMutation();
  const navigate = useNavigate();

  type APIError = {
    data: {
      message: string;
    };
  };

  const isAPIError = (error: any): error is APIError => {
    return error && error.data && typeof error.data.message === "string";
  };

  const handleUpdateTaskAssignmentSettings = async (taskAssignmentSettingsData: TaskSettings) => {
    try {
      setLoading(true);
      await createTaskAssignmentSettings(taskAssignmentSettingsData).unwrap();
      toast.success("Task Settings updating successfully!", {
        onClose: () => navigate("/manage-pump-brands"),
        autoClose: 1000,
      });
    } catch (error) {
      if (isAPIError(error)) {
        toast.error("Error Updating Task Settings: " + error.data.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else if (error instanceof Error) {
        toast.error("Error updating Task Settings: " + error.message, {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      } else {
        toast.error("An unknown error occurred", {
          onClose: () => navigate("/error/500"),
          autoClose: 1000,
        });
      }
      console.error("Error updating Task Settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout breadcrumb='Task Settings'>
      {loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        <TaskSettingsDetails
          taskAssignmentOnSubmit={handleUpdateTaskAssignmentSettings}
          taskAssignmentInitialData={taskAssignmentData}
        />
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

export default TaskSettingsPage