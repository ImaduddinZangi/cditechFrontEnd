import React, { useEffect, useState } from 'react';
import InputField from '../../../Tags/InputField';
import SelectField, { Option } from '../../../Tags/SelectField';

const inspectionIntervalOptions: Option[] = [
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Annually", value: "Annually" },
];

const smartOptions: Option[] = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
];

const sizeOptions: Option[] = [
    { label: "Small", value: "Small" },
    { label: "Medium", value: "Medium" },
    { label: "Large", value: "Large" },
    { label: "XLarge", value: "XLarge" },
    { label: "XXLarge", value: "XXLarge" },
];

const powerOptions: Option[] = [
    { label: "1 Phase", value: "1 Phase" },
    { label: "2 Phase", value: "2 Phase" },
    { label: "3 Phase", value: "3 Phase" },
    { label: "Wild", value: "Wild" },
    { label: "Unknown", value: "Unknown" },
    { label: "Other", value: "Other" },
];

const materialOptions: Option[] = [
    { label: "Concrete", value: "Concrete" },
    { label: "Steel", value: "Steel" },
    { label: "Fiberglass", value: "Fiberglass" },
    { label: "Composite", value: "Composite" },
    { label: "Other", value: "Other" },
    { label: "Unknown", value: "Unknown" },
];

const dutyOptions: Option[] = [
    { label: "Lite", value: "Lite" },
    { label: "Normal", value: "Normal" },
    { label: "Heavy", value: "Heavy" },
    { label: "Severe", value: "Severe" },
];

const railsOptions: Option[] = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
];

const pumpOptions: Option[] = [
    { label: "6", value: "6" },
    { label: "5", value: "5" },
    { label: "4", value: "4" },
    { label: "3", value: "3" },
    { label: "2", value: "2" },
    { label: "1", value: "1" },
];

const deleteOptions: Option[] = [
    { label: "No", value: "No" },
    { label: "Yes", value: "Yes" },
]

interface LiftStationPropertiesFormProps {
    updateProperties: (key: string, value: string) => void;
    properties: Record<string, any>;
    onPumpCountChange: (count: number) => void;
}

const LiftStationPropertiesForm: React.FC<LiftStationPropertiesFormProps> = ({ updateProperties, properties, onPumpCountChange }) => {
    const [pipeDia, setPipeDia] = useState(properties.pipeDia || '');
    const [smart, setSmart] = useState<Option | null>(properties.smart ? { label: properties.smart, value: properties.smart } : null);
    const [size, setSize] = useState(properties.size || '');
    const [material, setMaterial] = useState<Option | null>(properties.material ? { label: properties.material, value: properties.material } : null);
    const [deleteProtect, setDeleteProtect] = useState<Option | null>(properties.duty ? { label: properties.deleteProtect, value: properties.deleteProtect } : null);
    const [duty, setDuty] = useState<Option | null>(properties.duty ? { label: properties.duty, value: properties.duty } : null);
    const [rails, setRails] = useState(properties.rails || '');
    const [float, setFloat] = useState(properties.float || '');
    const [pumps, setPumps] = useState<Option | null>(
        properties.pumps ? { label: properties.pumps, value: properties.pumps } : null
    );
    const [power, setPower] = useState(properties.power || '');
    const [latitude, setLatitude] = useState(properties.latitude || '');
    const [longitude, setLongitude] = useState(properties.longitude || '');
    const [qrCode, setQrCode] = useState(properties.qrCode || '');
    const [nfcId, setNfcId] = useState(properties.nfcId || '');
    const [inspectionInterval, setInspectionInterval] = useState<Option | null>(properties.inspectionInterval ? { label: properties.inspectionInterval, value: properties.inspectionInterval } : null);

    useEffect(() => updateProperties('pipeDia', pipeDia), [pipeDia]);
    useEffect(() => updateProperties('smart', smart?.value || ""), [smart]);
    useEffect(() => updateProperties('size', size), [size]);
    useEffect(() => updateProperties('material', material?.value || ""), [material]);
    useEffect(() => updateProperties('deleteProtect', deleteProtect?.value || ""), [deleteProtect]);
    useEffect(() => updateProperties('duty', duty?.value || ""), [duty]);
    useEffect(() => updateProperties('rails', rails), [rails]);
    useEffect(() => updateProperties('float', float), [float]);
    useEffect(() => {
        updateProperties('pumps', pumps?.value || "");
        onPumpCountChange(Number(pumps?.value || 0));
    }, [pumps]);
    useEffect(() => updateProperties('power', power), [power]);
    useEffect(() => updateProperties('latitude', latitude), [latitude]);
    useEffect(() => updateProperties('longitude', longitude), [longitude]);
    useEffect(() => updateProperties('qrCode', qrCode), [qrCode]);
    useEffect(() => updateProperties('nfcId', nfcId), [nfcId]);
    useEffect(() => updateProperties('inspectionInterval', inspectionInterval?.value || ""), [inspectionInterval]);

    return (
        <>
            <SelectField
                label="Smart"
                value={smart}
                onChange={(option) => setSmart(option)}
                options={smartOptions}
                className="col-span-1"
                required
            />
            <SelectField
                label="Size"
                value={size}
                onChange={(option) => setSize(option)}
                options={sizeOptions}
                placeholder="Select Size"
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
                label="Delete Protect"
                name="deleteProtect"
                value={deleteProtect}
                placeholder="Select delete protect"
                onChange={(option) => setDeleteProtect(option)}
                options={deleteOptions}
                className="col-span-1"
            />
            <SelectField
                label="Duty"
                name="duty"
                value={duty}
                placeholder="Select Duty"
                onChange={(option) => setDuty(option)}
                options={dutyOptions}
                className="col-span-1"
            />
            <SelectField
                label="Rails"
                value={rails}
                onChange={(option) => setRails(option)}
                options={railsOptions}
                className="col-span-1"
                required
            />
            <SelectField
                label="Power"
                value={power}
                onChange={(option) => setPower(option)}
                options={powerOptions}
                className="col-span-1"
                required
            />
            <SelectField
                label="Inspection Interval"
                value={inspectionInterval}
                onChange={(option) => setInspectionInterval(option)}
                options={inspectionIntervalOptions}
                placeholder="Select Inspection Interval"
                className="col-span-1"
                required
            />
            <SelectField
                label="Pumps"
                name="pumps"
                value={pumps}
                placeholder="Select pumps"
                onChange={(option) => setPumps(option)}
                options={pumpOptions}
                className="col-span-1"
            />
            <InputField label="Pipe Diameter" value={pipeDia} fieldType='number' onChange={(e) => setPipeDia(e.target.value)} className="col-span-1" placeholder='Pipe dia' />
            <InputField label="Floats" fieldType='number' value={float} onChange={(e) => setFloat(e.target.value)} placeholder='Floats' />
            <InputField label="Latitude" fieldType='text' value={latitude} onChange={(e) => setLatitude(e.target.value)} className="col-span-1" placeholder='longitude' />
            <InputField label="Longitude" fieldType='text' value={longitude} onChange={(e) => setLongitude(e.target.value)} className="col-span-1" placeholder='latitude' />
            <InputField label="QR Code" fieldType='text' value={qrCode} onChange={(e) => setQrCode(e.target.value)} className="col-span-1" placeholder='Enter qr code' />
            <InputField label="NFC ID" fieldType='text' value={nfcId} onChange={(e) => setNfcId(e.target.value)} className="col-span-1" placeholder='Enter nfc code' />
        </>
    );
};

export default LiftStationPropertiesForm;
