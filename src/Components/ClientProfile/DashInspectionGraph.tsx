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
        backgroundColor: "rgb(105, 65, 198)",
        borderRadius: 10,
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      },
      {
        label: "Pending",
        data: [10, 15, 6, 7, 4, 6, 8, 11, 10, 13, 9, 15],
        backgroundColor: "rgb(158, 119, 237)",
        borderRadius: 10,
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      },
      {
        label: "Failed",
        data: [5, 8, 2, 4, 3, 2, 5, 7, 6, 9, 4, 8],
        backgroundColor: "rgb(214, 187, 251)",
        borderRadius: 10,
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
    elements: {
      bar: {
        borderRadius: 10,
      },
    },
  };

  return (
    <div className="flex flex-col p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-[1vw]">
        <h2 className="text-[1.5vw] font-semibold text-darkgray-0">
          Inspections
        </h2>
        <WhiteButton text="View Report" />
      </div>
      <div className="relative w-full h-[300px]">
        {/* Adjusted height */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DashInspectionGraph;
