import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Asset, GreaseTrapProperties, LiftStationProperties, LintTrapProperties, StormDrainProperties, TreatmentPlantDigesterProperties } from "../../../../redux/features/assetSlice";
import WhiteButton from "../../../Tags/WhiteButton";
import ActiveBadge from "../../../Customer/Constants/ActiveBadge";
import { useGetTaskByIdQuery } from "../../../../redux/api/taskApi";

const TaskAssets: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const { data: taskData } = useGetTaskByIdQuery(taskId || "");
    const [assets, setAssets] = useState<Asset[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (taskData?.assets) {
            setAssets(taskData.assets);
        }
    }, [taskData]);

    const handleEditAsset = (id: string) => {
        navigate(`/edit-asset/${id}`);
    };

    const handleShowPumps = (id: string) => {
        navigate(`/asset-details/${id}`);
    };

    function isTreatmentPlantDigesterProperties(
        properties: Asset["properties"] | null | undefined
    ): properties is TreatmentPlantDigesterProperties {
        return (
            properties != null &&
            "serviceInterval" in properties &&
            typeof properties.serviceInterval === "string"
        );
    }

    function isStormDrainProperties(
        properties: Asset["properties"] | null | undefined
    ): properties is StormDrainProperties {
        return (
            properties != null &&
            "drainSize" in properties &&
            typeof properties.drainSize === "string"
        );
    }

    function isLintTrapProperties(
        properties: Asset["properties"]
    ): properties is LintTrapProperties {
        return (properties as LintTrapProperties).gallons !== undefined;
    }

    function isLiftStationProperties(
        properties: Asset["properties"] | null | undefined
    ): properties is LiftStationProperties {
        return (
            properties != null &&
            "pipeDia" in properties &&
            typeof properties.pipeDia === "string"
        );
    }

    function isGreaseTrapProperties(
        properties: Asset["properties"]
    ): properties is GreaseTrapProperties {
        return (properties as GreaseTrapProperties).duty !== undefined;
    }

    const renderProperties = (asset: Asset) => {
        const { properties, assetType } = asset;

        switch (assetType?.name) {
            case "Treatment Plant Digester":
                if (isTreatmentPlantDigesterProperties(properties)) {
                    return (
                        <>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Service Interval:</p>
                                <p className="text-[1vw]">{properties.serviceInterval || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Gallons:</p>
                                <p className="text-[1vw]">{properties.gallons || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Material:</p>
                                <p className="text-[1vw]">{properties.material || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Connection Size:</p>
                                <p className="text-[1vw]">{properties.connectionSize || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Suction Required:</p>
                                <p className="text-[1vw]">{properties.suctionRequired ? "Yes" : "No"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Digester Dimensions:</p>
                                <p className="text-[1vw]">{properties.digesterDimensions || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Primary Treatment Plant Asset ID:</p>
                                <p className="text-[1vw]">{properties.primaryTreatmentPlantAssetId || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Lat/Lng:</p>
                                <p className="text-[1vw]">{`${properties.latitude}/${properties.latitude}` || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">QR Code:</p>
                                <p className="text-[1vw]">{properties.qrCode || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">NFC ID:</p>
                                <p className="text-[1vw]">{properties.nfcId || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Condition:</p>
                                <p className="text-[1vw]">{properties.condition || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Require Disposal Ticket:</p>
                                <p className="text-[1vw]">{properties.requireDisposalTicket ? "Yes" : "No"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Primary Plant Operator:</p>
                                <p className="text-[1vw]">{properties.primaryPlantOperator || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Operator Contact Name:</p>
                                <p className="text-[1vw]">{properties.operatorContactName || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Operator Contact Phone:</p>
                                <p className="text-[1vw]">{properties.operatorContactPhone || "N/A"}</p>
                            </div>
                        </>
                    );
                }
                break;

            case "Storm Drain":
                if (isStormDrainProperties(properties)) {
                    return (
                        <>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Service Interval:</p>
                                <p className="text-[1vw]">{properties.serviceInterval || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Drain Size:</p>
                                <p className="text-[1vw]">{properties.drainSize || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Material:</p>
                                <p className="text-[1vw]">{properties.material || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Water Intrusion:</p>
                                <p className="text-[1vw]">{properties.waterIntrusion ? "Yes" : "No"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Damaged:</p>
                                <p className="text-[1vw]">{properties.damaged ? "Yes" : "No"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Internal Pipe Diameter:</p>
                                <p className="text-[1vw]">{properties.internalPipeDia || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Lat/Lng:</p>
                                <p className="text-[1vw]">{`${properties.latitude}/${properties.latitude}` || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">QR Code:</p>
                                <p className="text-[1vw]">{properties.qrCode || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">NFC ID:</p>
                                <p className="text-[1vw]">{properties.nfcId || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Drain Dimensions:</p>
                                <p className="text-[1vw]">{properties.drainDimensions || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Duty:</p>
                                <p className="text-[1vw]">{properties.duty || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Drain Grate Type:</p>
                                <p className="text-[1vw]">{properties.drainGrateType || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Connected Asset Line Color:</p>
                                <p className="text-[1vw]">{properties.connectedAssetLineColor || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Connected Drains:</p>
                                <p className="text-[1vw]">{properties.connectedStormDrainAssetIds ? properties.connectedStormDrainAssetIds.length : "0"}</p>
                            </div>
                        </>
                    );
                }
                break;

            case "Lint Trap":
                if (isLintTrapProperties(properties)) {
                    return (
                        <>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Service Interval:</p>
                                <p className="text-[1vw]">{properties.serviceInterval || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Gallons:</p>
                                <p className="text-[1vw]">{properties.gallons || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Material:</p>
                                <p className="text-[1vw]">{properties.material || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Duty:</p>
                                <p className="text-[1vw]">{properties.duty || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">QR Code:</p>
                                <p className="text-[1vw]">{properties.qrCode || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">NFC ID:</p>
                                <p className="text-[1vw]">{properties.nfcId || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Lat/Lng:</p>
                                <p className="text-[1vw]">{`${properties.latitude}/${properties.latitude}` || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Require Disposal Ticket:</p>
                                <p className="text-[1vw]">{properties.requireDisposalTicket ? "Yes" : "No"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Multiple On-site Traps:</p>
                                <p className="text-[1vw]">{properties.multipleOnSiteTraps ? "Yes" : "No"}</p>
                            </div>
                        </>
                    );
                }
                break;

            case "Lift Station":
                if (isLiftStationProperties(properties)) {
                    return (
                        <>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Pipe Diameter:</p>
                                <p className="text-[1vw]">{properties.pipeDia || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Smart:</p>
                                <p className="text-[1vw]">{properties.smart || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Size:</p>
                                <p className="text-[1vw]">{properties.size || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Material:</p>
                                <p className="text-[1vw]">{properties.material || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Delete Protect:</p>
                                <p className="text-[1vw]">{properties.deleteProtect || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Duty:</p>
                                <p className="text-[1vw]">{properties.duty || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Rails:</p>
                                <p className="text-[1vw]">{properties.rails || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Float:</p>
                                <p className="text-[1vw]">{properties.float || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Pumps:</p>
                                <p className="text-[1vw]">{properties.pumps || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Power:</p>
                                <p className="text-[1vw]">{properties.power || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Lat/Lng:</p>
                                <p className="text-[1vw]">{`${properties.latitude}/${properties.latitude}` || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">QR Code:</p>
                                <p className="text-[1vw]">{properties.qrCode || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">NFC ID:</p>
                                <p className="text-[1vw]">{properties.nfcId || "N/A"}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[1vw] font-semibold">Inspection Interval:</p>
                                <p className="text-[1vw]">{properties.inspectionInterval || "N/A"}</p>
                            </div>
                        </>
                    );
                }
                break;

            case "Grease Trap":
                if (isGreaseTrapProperties(properties)) {
                    return (
                        <>
                            <>
                                <div className="col-span-1">
                                    <p className="text-[1vw] font-semibold">Service Interval:</p>
                                    <p className="text-[1vw]">{properties.serviceInterval || "N/A"}</p>
                                </div>
                                <div className="col-span-1">
                                    <p className="text-[1vw] font-semibold">Gallons:</p>
                                    <p className="text-[1vw]">{properties.gallons || "N/A"}</p>
                                </div>
                                <div className="col-span-1">
                                    <p className="text-[1vw] font-semibold">Material:</p>
                                    <p className="text-[1vw]">{properties.material || "N/A"}</p>
                                </div>
                                <div className="col-span-1">
                                    <p className="text-[1vw] font-semibold">Duty:</p>
                                    <p className="text-[1vw]">{properties.duty || "N/A"}</p>
                                </div>
                                <div className="col-span-1">
                                    <p className="text-[1vw] font-semibold">QR Code:</p>
                                    <p className="text-[1vw]">{properties.qrCode || "N/A"}</p>
                                </div>
                                <div className="col-span-1">
                                    <p className="text-[1vw] font-semibold">NFC ID:</p>
                                    <p className="text-[1vw]">{properties.nfcId || "N/A"}</p>
                                </div>
                                <div className="col-span-1">
                                    <p className="text-[1vw] font-semibold">Lat/Lng:</p>
                                    <p className="text-[1vw]">{`${properties.latitude}/${properties.latitude}` || "N/A"}</p>
                                </div>
                                <div className="col-span-1">
                                    <p className="text-[1vw] font-semibold">Require Disposal Ticket:</p>
                                    <p className="text-[1vw]">{properties.requireDisposalTicket ? "Yes" : "No"}</p>
                                </div>
                                <div className="col-span-1">
                                    <p className="text-[1vw] font-semibold">Multiple On-site Traps:</p>
                                    <p className="text-[1vw]">{properties.multipleOnSiteTraps ? "Yes" : "No"}</p>
                                </div>
                            </>
                        </>
                    );
                }
                break;

            default:
                return <p>No specific properties available.</p>;
        }
    };

    return (
        <div className="p-[1vw] font-inter">
            {assets?.map((asset) => (
                <div
                    key={asset.id}
                    className={`border-[0.15vw] rounded p-[1vw] mt-[1vw] relative ${asset.assetType?.name === "Treatment Plant Digester" ? "h-[65vh]" : ""}`}
                >
                    <div className="grid grid-cols-5 gap-y-[3vw] gap-x-[1vw] w-full text-darkgray-0">
                        <div>
                            <p className="text-[1vw] font-semibold">Asset Name:</p>
                            <p className="text-[1vw]">{asset.name || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-[1vw] font-semibold">Asset Type:</p>
                            <p className="text-[1vw]">{asset.assetType?.name || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-[1vw] font-semibold">Asset ID:</p>
                            <p className="text-[1vw]">{asset.id || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-[1vw] font-semibold">Status:</p>
                            <div className="text-[1vw]">
                                <ActiveBadge
                                    half
                                    iconColor={
                                        asset.status === "Active" || asset.status === "active"
                                            ? "bg-green-500"
                                            : asset.status === "Maintenance"
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                    }
                                    bgColor={
                                        asset.status === "Active" || asset.status === "active"
                                            ? "bg-green-100"
                                            : asset.status === "Maintenance"
                                                ? "bg-yellow-100"
                                                : "bg-red-100"
                                    }
                                    textColor={
                                        asset.status === "Active" || asset.status === "active"
                                            ? "text-green-800"
                                            : asset.status === "Maintenance"
                                                ? "bg-yellow-800"
                                                : "text-red-800"
                                    }
                                    text={asset.status}
                                />
                            </div>
                        </div>
                        {renderProperties(asset)}
                    </div>
                    <div className="flex justify-between mt-[1vw] w-1/3 absolute bottom-[1vw] right-[1vw]">
                        <WhiteButton
                            type="button"
                            className="shadow-md"
                            text="Edit Asset"
                            onClick={() => handleEditAsset(asset.id)}
                        />
                        <WhiteButton
                            type="button"
                            className="shadow-md"
                            text="Asset Details"
                            onClick={() => handleShowPumps(asset.id)}
                        />
                        <WhiteButton
                            type="button"
                            className="shadow-md"
                            text="Asset Photos"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskAssets;
