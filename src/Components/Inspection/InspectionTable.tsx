import React from "react";
import {
  useGetInspectionsQuery,
  useDeleteInspectionMutation,
} from "../../redux/api/inspectionApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InspectionTable: React.FC = () => {
  const { data: inspections, isLoading, error } = useGetInspectionsQuery();
  const [deleteInspection] = useDeleteInspectionMutation();
  const navigate = useNavigate();

  const handleDelete = async (id: string | undefined) => {
    if (window.confirm("Are you sure you want to delete this inspection?")) {
      try {
        await deleteInspection(id || "").unwrap();
        toast.success("Inspection deleted successfully!", {
          onClose: () => window.location.reload(),
          autoClose: 500,
        });
      } catch (error) {
        toast.error("Error deleting inspection.");
      }
    }
  };

  const handleUpdate = (id: string | undefined) => {
    navigate(`/update-inspection/${id}`);
  };

  const handleDetails = (id: string | undefined) => {
    navigate(`/inspection-details/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading inspections.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
              Inspection ID
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
              Scheduled Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {inspections?.map((inspection) => (
            <tr key={inspection.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {inspection.id}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {inspection.name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {inspection.status}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {new Date(inspection.scheduledDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button
                  onClick={() => handleDetails(inspection.id)}
                  className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded mr-2"
                >
                  Details
                </button>
                <button
                  onClick={() => handleUpdate(inspection.id)}
                  className="text-white bg-yellow-500 hover:bg-yellow-700 px-3 py-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(inspection.id)}
                  className="text-white bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InspectionTable;
