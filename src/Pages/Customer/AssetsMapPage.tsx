import React, { useMemo } from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import UtilityMaps from "../../Components/Maps/UtilityMaps";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import { StormDrainProperties } from "../../redux/features/assetSlice";

const AssetsMapPage: React.FC = () => {
    const { data: assetsData } = useGetAssetsQuery();

    const mapData = useMemo(() => {
        if (!assetsData) return [];

        // Map primary assets
        return assetsData.map((asset) => {
            const { latitude, longitude } = asset.properties || {};
            return {
                id: asset.id,
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
                label: asset.name,
                connections:
                    asset.properties &&
                    "connectedStormDrainAssetIds" in asset.properties
                        ? asset.properties.connectedStormDrainAssetIds
                        : [],
            };
        }).filter(item => !isNaN(item.lat) && !isNaN(item.lng));
    }, [assetsData]);

    // Generate connection lines
    const lines = useMemo(() => {
        if (!assetsData) return [];

        const connections: Array<{ start: { lat: number; lng: number }; end: { lat: number; lng: number } }> = [];

        assetsData.forEach((asset) => {
            if (asset.properties && "connectedStormDrainAssetIds" in asset.properties) {
                const { latitude, longitude, connectedStormDrainAssetIds } =
                    asset.properties as StormDrainProperties;

                connectedStormDrainAssetIds.forEach((connectedId) => {
                    const connectedAsset = assetsData.find((a) => a.id === connectedId);
                    if (connectedAsset && connectedAsset.properties) {
                        connections.push({
                            start: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
                            end: {
                                lat: parseFloat(connectedAsset.properties.latitude),
                                lng: parseFloat(connectedAsset.properties.longitude),
                            },
                        });
                    }
                });
            }
        });

        return connections;
    }, [assetsData]);

    return (
        <ClientLayout breadcrumb="Assets Map">
            <UtilityMaps mapType="assets" data={mapData} lines={lines} />
        </ClientLayout>
    );
};

export default AssetsMapPage;
