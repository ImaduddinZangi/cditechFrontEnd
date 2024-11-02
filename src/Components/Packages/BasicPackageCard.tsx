import React from "react";

interface BasicPackageCardProps {
    title: string;
    price: string;
    features: {
        label: string;
        value: string | number;
    }[];
}

const BasicPackageCard: React.FC<BasicPackageCardProps> = ({ title, price, features }) => {
    return (
        <div className="max-w-xs p-6 bg-white rounded-lg shadow-lg border border-gray-200 text-center">
            <div className="flex justify-center items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-blue-500"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
                    </svg>
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <div className="text-3xl font-bold text-gray-800">
                {price}
                <span className="text-base font-normal text-gray-500"> per month</span>
            </div>
            <ul className="mt-4 text-left space-y-1 text-gray-700">
                {features.map((feature, index) => (
                    <li key={index} className="flex justify-between">
                        <span>{feature.label}:</span>
                        <span>{feature.value}</span>
                    </li>
                ))}
            </ul>
            <button className="mt-6 px-4 py-2 w-full text-white bg-blue-500 hover:bg-blue-600 rounded-md font-semibold">
                Get Started
            </button>
        </div>
    );
};

export default BasicPackageCard;