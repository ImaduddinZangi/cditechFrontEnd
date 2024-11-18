import React, { useEffect, useState } from 'react';
import InputField from '../../../Tags/InputField';
import SelectField, { Option } from '../../../Tags/SelectField';
import { useGetAssetsQuery } from '../../../../redux/api/assetApi';

const serviceIntervalOptions: Option[] = [
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Bi-Monthly', value: 'Bi-Monthly' },
    { label: 'Quarterly', value: 'Quarterly' },
    { label: 'Yearly', value: 'Yearly' },
    { label: 'On-Demand', value: 'On-Demand' },
    { label: 'Not Serviced', value: 'Not Serviced' },
];

const drainSizeOptions: Option[] = [
    { label: 'Extra Small', value: 'extra small' },
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
    { label: 'Extra Large', value: 'extra large' },
    { label: 'Huge', value: 'huge' },
    { label: 'Unknown', value: 'unknown' },
];

const materialOptions: Option[] = [
    { label: 'Plastic', value: 'Plastic' },
    { label: 'Fiberglass', value: 'Fiberglass' },
    { label: 'Concrete', value: 'Concrete' },
    { label: 'Other', value: 'Other' },
    { label: 'Unknown', value: 'Unknown' },
];

const dutyOptions: Option[] = [
    { label: 'Light', value: 'Light' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Heavy', value: 'Heavy' },
    { label: 'Severe', value: 'Severe' },
    { label: 'Unknown', value: 'Unknown' },
];

const drainGrateTypeOptions: Option[] = [
    { label: 'Steel', value: 'steel' },
    { label: 'Plastic', value: 'plastic' },
    { label: 'Hinged Steel', value: 'hinged steel' },
    { label: 'Other', value: 'other' },
    { label: 'Unknown', value: 'unknown' },
];

interface StormDrainPropertiesFormProps {
    updateProperties: (key: string, value: any) => void;
    properties: Record<string, any>;
}

const StormDrainPropertiesForm: React.FC<StormDrainPropertiesFormProps> = ({ updateProperties, properties }) => {
    const [serviceInterval, setServiceInterval] = useState<Option | null>(properties.serviceInterval ? { label: properties.serviceInterval, value: properties.serviceInterval } : null);
    const [drainSize, setDrainSize] = useState<Option | null>(properties.drainSize ? { label: properties.drainSize, value: properties.drainSize } : null);
    const [material, setMaterial] = useState<Option | null>(properties.material ? { label: properties.material, value: properties.material } : null);
    const [waterIntrusion, setWaterIntrusion] = useState(properties.waterIntrusion || false);
    const [damaged, setDamaged] = useState(properties.damaged || false);
    const [internalPipeDia, setInternalPipeDia] = useState(properties.internalPipeDia || '');
    const [latitude, setLatitude] = useState(properties.latitude || '');
    const [longitude, setLongitude] = useState(properties.longitude || '');
    const [qrCode, setQrCode] = useState(properties.qrCode || '');
    const [nfcId, setNfcId] = useState(properties.nfcId || '');
    const [drainDimensions, setDrainDimensions] = useState(properties.drainDimensions || '');
    const [duty, setDuty] = useState<Option | null>(properties.duty ? { label: properties.duty, value: properties.duty } : null);
    const [drainGrateType, setDrainGrateType] = useState<Option | null>(properties.drainGrateType ? { label: properties.drainGrateType, value: properties.drainGrateType } : null);
    const [connectedAssetLineColor, setConnectedAssetLineColor] = useState(properties.connectedAssetLineColor || '');
    const [connectedStormDrainAssetIds, setConnectedStormDrainAssetIds] = useState<string[]>(properties.connectedStormDrainAssetIds || []);
    const [assets, setAssets] = useState<Option[]>([]);

    useEffect(() => updateProperties('serviceInterval', serviceInterval?.value || ""), [serviceInterval]);
    useEffect(() => updateProperties('drainSize', drainSize?.value || ""), [drainSize]);
    useEffect(() => updateProperties('material', material?.value || ""), [material]);
    useEffect(() => updateProperties('waterIntrusion', waterIntrusion), [waterIntrusion]);
    useEffect(() => updateProperties('damaged', damaged), [damaged]);
    useEffect(() => updateProperties('internalPipeDia', internalPipeDia), [internalPipeDia]);
    useEffect(() => updateProperties('latitude', latitude), [latitude]);
    useEffect(() => updateProperties('longitude', longitude), [longitude]);
    useEffect(() => updateProperties('qrCode', qrCode), [qrCode]);
    useEffect(() => updateProperties('nfcId', nfcId), [nfcId]);
    useEffect(() => updateProperties('drainDimensions', drainDimensions), [drainDimensions]);
    useEffect(() => updateProperties('duty', duty?.value || ""), [duty]);
    useEffect(() => updateProperties('drainGrateType', drainGrateType?.value || ""), [drainGrateType]);
    useEffect(() => updateProperties('connectedAssetLineColor', connectedAssetLineColor), [connectedAssetLineColor]);
    useEffect(() => updateProperties('connectedStormDrainAssetIds', connectedStormDrainAssetIds), [connectedStormDrainAssetIds]);

    const { data: assetsData } = useGetAssetsQuery();

    useEffect(() => {
        if (assetsData) {
            const stormDrainAssets = assetsData.filter((asset) => asset.assetType?.name === 'Storm Drain');
            const assetOptions = stormDrainAssets.map((asset) => ({
                label: asset.name,
                value: asset.id,
            }));
            setAssets(assetOptions);

            if (stormDrainAssets.length === 0) {
                setConnectedStormDrainAssetIds([]);
                updateProperties('connectedStormDrainAssetIds', undefined);
            }
        }
    }, [assetsData]);

    useEffect(() => {
        if (connectedStormDrainAssetIds.length > 0) {
            updateProperties('connectedStormDrainAssetIds', connectedStormDrainAssetIds);
        } else {
            updateProperties('connectedStormDrainAssetIds', undefined);
        }
    }, [connectedStormDrainAssetIds]);

    const handleAddAsset = (assetId: string) => {
        setConnectedStormDrainAssetIds((prev) => {
            if (!prev.includes(assetId)) return [...prev, assetId];
            return prev;
        });
    };

    const handleRemoveAsset = (assetId: string) => {
        setConnectedStormDrainAssetIds((prev) => prev.filter((id) => id !== assetId));
    };

    return (
        <>
            <SelectField
                label="Service Interval"
                value={serviceInterval}
                onChange={(option) => setServiceInterval(option)}
                options={serviceIntervalOptions}
                placeholder="Select Service Interval"
                required
                className="col-span-1"
            />
            <SelectField
                label="Drain Size"
                value={drainSize}
                onChange={(option) => setDrainSize(option)}
                options={drainSizeOptions}
                placeholder="Select Drain Size"
                required
                className="col-span-1"
            />
            <SelectField
                label="Material"
                value={material}
                onChange={(option) => setMaterial(option)}
                options={materialOptions}
                placeholder="Select Material"
                required
                className="col-span-1"
            />
            <SelectField
                label="Duty"
                value={duty}
                onChange={(option) => setDuty(option)}
                options={dutyOptions}
                placeholder="Select Duty"
                className="col-span-1"
            />
            <SelectField
                label="Drain Grate Type"
                value={drainGrateType}
                onChange={(option) => setDrainGrateType(option)}
                options={drainGrateTypeOptions}
                placeholder="Select Drain Grate Type"
                className="col-span-1"
            />
            <>
                <SelectField
                    label="Connected Storm Drain Assets"
                    options={assets}
                    placeholder="Select Storm Drain Asset"
                    onChange={(option) => option && handleAddAsset(option.value)}
                    className="col-span-1"
                    disabled={assets.length === 0}
                />
                {assets.length > 0 && connectedStormDrainAssetIds.length > 0 && (
                    <div className="col-span-1">
                        <label className="block text-darkgray-0 font-medium text-[1vw] text-inter">Selected Storm Drain Assets</label>
                        <ul>
                            {connectedStormDrainAssetIds.map((id) => {
                                const asset = assets.find((asset) => asset.value === id);
                                return (
                                    <li key={id} className="flex items-center justify-between">
                                        <span className='block text-gray-0 text-[1vw] text-inter'>{asset?.label}</span>
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-700 text-[1vw] w-[5vw]"
                                            onClick={() => handleRemoveAsset(id)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </>
            <InputField label="Internal Pipe Diameter (inches)" value={internalPipeDia} fieldType="number" onChange={(e) => setInternalPipeDia(e.target.value)} className="col-span-1" placeholder='Enter Pipe Dia' />
            <InputField label="Latitude" value={latitude} fieldType="text" onChange={(e) => setLatitude(e.target.value)} className="col-span-1" placeholder='Latitude' />
            <InputField label="Longitude" value={longitude} fieldType="text" onChange={(e) => setLongitude(e.target.value)} className="col-span-1" placeholder='Longitude' />
            <InputField label="QR Code" value={qrCode} fieldType="text" onChange={(e) => setQrCode(e.target.value)} className="col-span-1" placeholder='Enter qr code' />
            <InputField label="NFC ID" value={nfcId} fieldType="text" onChange={(e) => setNfcId(e.target.value)} className="col-span-1" placeholder='Enter nfc code' />
            <InputField label="Drain Dimensions (feet)" value={drainDimensions} fieldType="text" onChange={(e) => setDrainDimensions(e.target.value)} className="col-span-1" placeholder='11*22*33' />
            <InputField label="Connected Asset Line Color" value={connectedAssetLineColor} fieldType="color" onChange={(e) => setConnectedAssetLineColor(e.target.value)} className="col-span-1" />
            <div className="flex items-center col-span-1 cursor-pointer">
                <input
                    type="checkbox"
                    id="waterIntrusion"
                    checked={waterIntrusion}
                    onChange={() => setWaterIntrusion((prev: boolean) => !prev)}
                    className="mr-[0.5vw] accent-purple-0 cursor-pointer focus-outline-none"
                />
                <label htmlFor="waterIntrusion" className="block text-[1vw] font-medium text-darkgray-0 cursor-pointer">Water Intrusion</label>
            </div>
            <div className="flex items-center col-span-1 cursor-pointer">
                <input
                    type="checkbox"
                    id="damaged"
                    checked={damaged}
                    onChange={() => setDamaged((prev: boolean) => !prev)}
                    className="mr-[0.5vw] accent-purple-0 cursor-pointer focus-outline-none"
                />
                <label htmlFor="damaged" className="block text-[1vw] font-medium text-darkgray-0 cursor-pointer">Damaged</label>
            </div>
        </>
    );
};

export default StormDrainPropertiesForm;
