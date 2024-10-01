import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "tailwindcss/tailwind.css";
import WhiteButton from "../Tags/WhiteButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashInspectionGraph: React.FC = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Completed",
        data: [12, 19, 3, 5, 2, 3, 6, 9, 12, 14, 10, 16],
        backgroundColor: "rgba(75, 85, 255, 0.8)",
      },
      {
        label: "Pending",
        data: [10, 15, 6, 7, 4, 6, 8, 11, 10, 13, 9, 15],
        backgroundColor: "rgba(139, 92, 246, 0.8)",
      },
      {
        label: "Failed",
        data: [5, 8, 2, 4, 3, 2, 5, 7, 6, 9, 4, 8],
        backgroundColor: "rgba(196, 181, 253, 0.8)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Inspections",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="flex flex-col w-full p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Inspections</h2>
        <WhiteButton text="View Report" />
      </div>
      <div className="relative w-full h-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DashInspectionGraph;
