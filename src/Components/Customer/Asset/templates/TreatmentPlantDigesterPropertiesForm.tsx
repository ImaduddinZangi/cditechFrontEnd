import React, { useEffect, useState } from 'react';
import InputField from '../../../Tags/InputField';
import SelectField, { Option } from '../../../Tags/SelectField';

const serviceIntervalOptions: Option[] = [
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Bi-Monthly', value: 'Bi-Monthly' },
    { label: 'Quarterly', value: 'Quarterly' },
    { label: 'Yearly', value: 'Yearly' },
    { label: 'On-Demand', value: 'On-Demand' },
    { label: 'Not Serviced', value: 'Not Serviced' },
];

const materialOptions: Option[] = [
    { label: 'Plastic', value: 'Plastic' },
    { label: 'Fiberglass', value: 'Fiberglass' },
    { label: 'Concrete', value: 'Concrete' },
    { label: 'Other', value: 'Other' },
    { label: 'Unknown', value: 'Unknown' },
];

const conditionOptions: Option[] = [
    { label: 'Good', value: 'Good' },
    { label: 'Fair', value: 'Fair' },
    { label: 'Rough', value: 'Rough' },
    { label: 'Bad', value: 'Bad' },
    { label: 'Failing', value: 'Failing' },
    { label: 'Other', value: 'Other' },
];

interface TreatmentPlantDigesterPropertiesFormProps {
    updateProperties: (key: string, value: any) => void;
    properties: Record<string, any>;
}

const TreatmentPlantDigesterPropertiesForm: React.FC<TreatmentPlantDigesterPropertiesFormProps> = ({ updateProperties, properties }) => {
    const [serviceInterval, setServiceInterval] = useState<Option | null>(properties.serviceInterval ? { label: properties.serviceInterval, value: properties.serviceInterval } : null);
    const [gallons, setGallons] = useState(properties.gallons || '');
    const [material, setMaterial] = useState<Option | null>(properties.material ? { label: properties.material, value: properties.material } : null);
    const [connectionSize, setConnectionSize] = useState(properties.connectionSize || '');
    const [suctionRequired, setSuctionRequired] = useState(properties.suctionRequired || false);
    const [digesterDimensions, setDigesterDimensions] = useState(properties.digesterDimensions || '');
    const [primaryTreatmentPlantAssetId, setPrimaryTreatmentPlantAssetId] = useState(properties.primaryTreatmentPlantAssetId || '');
    const [latitude, setLatitude] = useState(properties.latitude || '');
    const [longitude, setLongitude] = useState(properties.longitude || '');
    const [qrCode, setQrCode] = useState(properties.qrCode || '');
    const [nfcId, setNfcId] = useState(properties.nfcId || '');
    const [condition, setCondition] = useState<Option | null>(properties.condition ? { label: properties.condition, value: properties.condition } : null);
    const [requireDisposalTicket, setRequireDisposalTicket] = useState(properties.requireDisposalTicket || false);
    const [primaryPlantOperator, setPrimaryPlantOperator] = useState(properties.primaryPlantOperator || '');
    const [operatorContactName, setOperatorContactName] = useState(properties.operatorContactName || '');
    const [operatorContactPhone, setOperatorContactPhone] = useState(properties.operatorContactPhone || '');
    const [videos, setVideos] = useState(properties.videos || []);
    const [files, setFiles] = useState(properties.files || []);

    useEffect(() => updateProperties('serviceInterval', serviceInterval?.value || ""), [serviceInterval]);
    useEffect(() => updateProperties('gallons', gallons), [gallons]);
    useEffect(() => updateProperties('material', material?.value || ""), [material]);
    useEffect(() => updateProperties('connectionSize', connectionSize), [connectionSize]);
    useEffect(() => updateProperties('suctionRequired', suctionRequired), [suctionRequired]);
    useEffect(() => updateProperties('digesterDimensions', digesterDimensions), [digesterDimensions]);
    useEffect(() => updateProperties('primaryTreatmentPlantAssetId', primaryTreatmentPlantAssetId), [primaryTreatmentPlantAssetId]);
    useEffect(() => updateProperties('latitude', latitude), [latitude]);
    useEffect(() => updateProperties('longitude', longitude), [longitude]);
    useEffect(() => updateProperties('qrCode', qrCode), [qrCode]);
    useEffect(() => updateProperties('nfcId', nfcId), [nfcId]);
    useEffect(() => updateProperties('condition', condition?.value || ""), [condition]);
    useEffect(() => updateProperties('requireDisposalTicket', requireDisposalTicket), [requireDisposalTicket]);
    useEffect(() => updateProperties('primaryPlantOperator', primaryPlantOperator), [primaryPlantOperator]);
    useEffect(() => updateProperties('operatorContactName', operatorContactName), [operatorContactName]);
    useEffect(() => updateProperties('operatorContactPhone', operatorContactPhone), [operatorContactPhone]);
    useEffect(() => updateProperties('videos', videos), [videos]);
    useEffect(() => updateProperties('files', files), [files]);

    return (
        <>
            <SelectField
                label="Service Interval"
                value={serviceInterval}
                onChange={(option) => setServiceInterval(option)}
                options={serviceIntervalOptions}
                placeholder="Select Service Interval"
                className="col-span-1"
                required
            />
            <SelectField
                label="Material"
                value={material}
                onChange={(option) => setMaterial(option)}
                options={materialOptions}
                placeholder="Select Material"
                className="col-span-1"
                required
            />
            <SelectField
                label="Condition"
                value={condition}
                onChange={(option) => setCondition(option)}
                options={conditionOptions}
                placeholder="Select Condition"
                className="col-span-1"
            />
            <InputField label="Gallons" value={gallons} fieldType="number" onChange={(e) => setGallons(e.target.value)} className="col-span-1" placeholder='Gallons' />
            <InputField label="Connection Size" value={connectionSize} fieldType="text" onChange={(e) => setConnectionSize(e.target.value)} className="col-span-1" placeholder='Connection Size' />
            <InputField label="Digester Dimensions (000 x 000 x 000)" value={digesterDimensions} fieldType="text" onChange={(e) => setDigesterDimensions(e.target.value)} className="col-span-1" placeholder='123*123*123' />
            <InputField label="Primary Treatment Plant Asset ID" value={primaryTreatmentPlantAssetId} fieldType="text" onChange={(e) => setPrimaryTreatmentPlantAssetId(e.target.value)} className="col-span-1" />
            <InputField label="Latitude" value={latitude} fieldType="text" onChange={(e) => setLatitude(e.target.value)} className="col-span-1" placeholder='Latitude' />
            <InputField label="Longitude" value={longitude} fieldType="text" onChange={(e) => setLongitude(e.target.value)} className="col-span-1" placeholder='Longitude' />
            <InputField label="QR Code" value={qrCode} fieldType="text" onChange={(e) => setQrCode(e.target.value)} className="col-span-1" placeholder='Enter qr code' />
            <InputField label="NFC ID" value={nfcId} fieldType="text" onChange={(e) => setNfcId(e.target.value)} className="col-span-1" placeholder='Enter nfc code' />
            <InputField label="Primary Plant Operator" value={primaryPlantOperator} fieldType="text" onChange={(e) => setPrimaryPlantOperator(e.target.value)} className="col-span-1" placeholder='Primary Plan Operator' />
            <InputField label="Operator Contact Name" value={operatorContactName} fieldType="text" onChange={(e) => setOperatorContactName(e.target.value)} className="col-span-1" placeholder='John Doe' />
            <InputField label="Operator Contact Phone" value={operatorContactPhone} fieldType="text" onChange={(e) => setOperatorContactPhone(e.target.value)} className="col-span-1" placeholder='+1234567890' />
            <InputField label="Videos (comma-separated URLs)" value={videos.join(", ")} fieldType="text" onChange={(e) => setVideos(e.target.value.split(", ").slice(0, 5))} className="col-span-1" />
            <InputField label="Files (comma-separated URLs)" value={files.join(", ")} fieldType="text" onChange={(e) => setFiles(e.target.value.split(", ").slice(0, 5))} className="col-span-1" />
            <div className="flex items-center col-span-1 cursor-pointer">
                <input
                    type="checkbox"
                    id="suctionRequired"
                    checked={suctionRequired}
                    onChange={() => setSuctionRequired((prev: boolean) => !prev)}
                    className="mr-[0.5vw] accent-purple-0 cursor-pointer focus:outline-none"
                />
                <label htmlFor="suctionRequired" className="block text-[1vw] font-medium text-darkgray-0 cursor-pointer">Suction Required</label>
            </div>
            <div className="flex items-center col-span-1 cursor-pointer">
                <input
                    type="checkbox"
                    id="requireDisposalTicket"
                    checked={requireDisposalTicket}
                    onChange={() => setRequireDisposalTicket((prev: boolean) => !prev)}
                    className="mr-[0.5vw] accent-purple-0 cursor-pointer focus:outline-none"
                />
                <label htmlFor="requireDisposalTicket" className="block text-[1vw] font-medium text-darkgray-0 cursor-pointer">Require Disposal Ticket</label>
            </div>
        </>
    );
};

export default TreatmentPlantDigesterPropertiesForm;
