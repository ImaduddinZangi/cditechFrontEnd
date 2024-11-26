import React, { useMemo } from "react";
import UtilityMaps from "../../Components/Maps/UtilityMaps";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import {
    GreaseTrapProperties,
    LiftStationProperties,
    LintTrapProperties,
    StormDrainProperties,
    TreatmentPlantDigesterProperties
} from "../../redux/features/assetSlice";

const isStormDrain = (
    properties: TreatmentPlantDigesterProperties |
        LiftStationProperties |
        StormDrainProperties |
        GreaseTrapProperties |
        LintTrapProperties
): properties is StormDrainProperties => {
    return properties && "connectedAssetLineColor" in properties;
};

const AssetsMap: React.FC = () => {
    const { data: assetsData } = useGetAssetsQuery();

    const mapData = useMemo(() => {
        if (!assetsData) return [];

        return assetsData
            .map((asset) => {
                const { latitude, longitude } = asset.properties || {};

                return {
                    id: asset.id,
                    lat: parseFloat(latitude),
                    lng: parseFloat(longitude),
                    label: asset.name,
                };
            })
            .filter((item) => !isNaN(item.lat) && !isNaN(item.lng));
    }, [assetsData]);

    const lines = useMemo(() => {
        if (!assetsData) return [];

        const connections: Array<{
            start: { lat: number; lng: number };
            end: { lat: number; lng: number };
            color: string;
        }> = [];

        assetsData.forEach((asset) => {
            if (isStormDrain(asset.properties)) {
                const { latitude, longitude, connectedStormDrainAssetIds, connectedAssetLineColor } =
                    asset.properties;

                connectedStormDrainAssetIds?.forEach((connectedId) => {
                    const connectedAsset = assetsData.find((a) => a.id === connectedId);
                    if (connectedAsset && connectedAsset.properties) {
                        connections.push({
                            start: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
                            end: {
                                lat: parseFloat(connectedAsset.properties.latitude),
                                lng: parseFloat(connectedAsset.properties.longitude),
                            },
                            color: connectedAssetLineColor || "#ff0000",
                        });
                    }
                });
            }
        });

        return connections;
    }, [assetsData]);

    return (
        <div>
            <UtilityMaps mapType="assets" data={mapData} lines={lines} />
        </div>
    );
};

export default AssetsMap;