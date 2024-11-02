import React from "react";
import PurpleButton from "../Tags/PurpleButton";

interface UltimatePackageCardProps {
    title: string;
    price: string;
    priceType: string;
    features: {
        label: string;
        value: string | number;
    }[];
    isBestOffer?: boolean;
}

const UltimatePackageCard: React.FC<UltimatePackageCardProps> = ({ title, price, features, isBestOffer, priceType }) => {
    const formattedPriceType = priceType.replace(/ly$/, "");
    return (
        <div className="p-6 rounded-lg shadow-lg text-center relative overflow-hidden bg-gradient-to-br from-purple-500 to-blue-400">
            {/* Best Offer Tag */}
            {isBestOffer && (
                <div className="absolute top-4 right-4 bg-white text-purple-500 font-semibold text-xs px-2 py-1 rounded-full shadow-md">
                    Best offer
                </div>
            )}

            {/* Icon */}
            <div className="flex justify-center items-center mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-purple-500"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
                    </svg>
                </div>
            </div>

            {/* Title and Price */}
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <div className="text-3xl font-bold text-white">
                {price}
                <span className="text-base font-normal text-gray-200"> per {formattedPriceType}</span>
            </div>

            {/* Features List */}
            <ul className="mt-4 text-left space-y-1 text-gray-100">
                {features.map((feature, index) => (
                    <li key={index} className="flex justify-between">
                        <span>{feature.label}:</span>
                        <span>{feature.value}</span>
                    </li>
                ))}
            </ul>
            <PurpleButton text="Get Started" className="mt-[2vw] w-full" />
        </div>
    );
};

export default UltimatePackageCard;