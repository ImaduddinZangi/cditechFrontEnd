import React, { useState } from "react";
import BasicPackageCard from "./BasicPackageCard";
import UltimatePackageCard from "./UltimatePackageCard";
import { useGetPackagesQuery } from "../../redux/api/packagesApi";
import { Package } from "../../redux/features/packagesSlice";

const FeePlan: React.FC = () => {
    const { data: packages } = useGetPackagesQuery();
    const [priceType, setPriceType] = useState<"monthly" | "yearly">("monthly");
    const [activeTab, setActiveTab] = useState("monthyl");

    const handleTabChange = (type: "monthly" | "yearly") => {
        setPriceType(type);
        setActiveTab(type);
    };

    const renderPackageCard = (pkg: Package) => {
        const price = priceType === "monthly" ? pkg.monthly_price : pkg.yearly_price;
        const packageProps = {
            title: pkg.name,
            price: `$${price.toFixed(2)}`,
            features: [
                { label: "Customers", value: pkg.customer_limit ?? "Unlimited" },
                { label: "Assets", value: pkg.asset_limit ?? "Unlimited" },
                { label: "Users", value: pkg.user_limit ?? "Unlimited" },
                { label: "Inspections", value: pkg.inspection_limit ?? "Unlimited" },
                { label: "Photo storage", value: `${pkg.photo_storage_limit ?? 0}GB` },
                { label: "Video Storage", value: `${pkg.video_storage_limit ?? 0}GB` },
                { label: "PDF Storage", value: `${pkg.pdf_storage_limit ?? 0} MB` },
                { label: "SMS", value: pkg.sms_limit ?? "Unlimited" },
                { label: "Customer Portal", value: pkg.customer_portal ? "Yes" : "No" },
            ],
        };

        switch (pkg.name) {
            case "Basic":
            case "Advanced":
                return <BasicPackageCard {...packageProps} />;
            case "Ultimate":
            case "Ultimate Plus":
                return <UltimatePackageCard {...packageProps} />;
            default:
                return null;
        }
    };

    return (
        <div className="p-[1vw] m-[2vw] font-inter bg-white shadow-lg rounded-lg overflow-y-auto">
            {/* Toggle Tabs */}
            <div className="w-[20vw] flex justify-between p-[0.2vw] bg-textpurple-0 rounded-[0.5vw] bg-opacity-5 font-semibold">
                <button
                    className={`flex-1 py-[0.5vw] text-[1vw] text-center ${activeTab === "monthly"
                        ? "bg-white shadow-lg rounded-[0.5vw]"
                        : "text-darkgray-0"
                        }`}
                    onClick={() => handleTabChange("monthly")}
                >
                    Monthly
                </button>
                <button
                    className={`flex-1 py-[0.5vw] text-[1vw] text-center ${activeTab === "yearly"
                        ? "bg-white shadow-lg rounded-[0.5vw]"
                        : "text-darkgray-0"
                        }`}
                    onClick={() => handleTabChange("yearly")}
                >
                    Yearly
                </button>
            </div>

            {/* Package Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {packages?.map((pkg) => (
                    <div key={pkg.id}>{renderPackageCard(pkg)}</div>
                ))}
            </div>
        </div>
    );
};

export default FeePlan;
