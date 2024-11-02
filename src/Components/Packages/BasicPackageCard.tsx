import React from "react";
import PurpleButton from "../Tags/PurpleButton";

interface BasicPackageCardProps {
    title: string;
    price: string;
    priceType: string;
    features: {
        label: string;
        value: string | number;
    }[];
}

const BasicPackageCard: React.FC<BasicPackageCardProps> = ({ title, price, features, priceType }) => {
    const formattedPriceType = priceType.replace(/ly$/, "");
    return (
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 text-center">
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
                <span className="text-base font-normal text-gray-500"> per {formattedPriceType}</span>
            </div>
            <ul className="mt-4 text-left space-y-1 text-gray-700">
                {features.map((feature, index) => (
                    <li key={index} className="flex justify-between">
                        <span>{feature.label}:</span>
                        <span>{feature.value}</span>
                    </li>
                ))}
            </ul>
            <PurpleButton text="Get Started" className="w-full mt-[2vw]" />
        </div>
    );
};

export default BasicPackageCard;