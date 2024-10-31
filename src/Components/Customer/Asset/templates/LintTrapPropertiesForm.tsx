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

const dutyOptions: Option[] = [
  { label: 'Light', value: 'Light' },
  { label: 'Normal', value: 'Normal' },
  { label: 'Heavy', value: 'Heavy' },
  { label: 'Severe', value: 'Severe' },
  { label: 'Unknown', value: 'Unknown' },
];

interface LintTrapPropertiesFormProps {
  updateProperties: (key: string, value: any) => void;
  properties: Record<string, any>;
}

const LintTrapPropertiesForm: React.FC<LintTrapPropertiesFormProps> = ({ updateProperties, properties }) => {
  const [serviceInterval, setServiceInterval] = useState<Option | null>(properties.serviceInterval ? { label: properties.serviceInterval, value: properties.serviceInterval } : null);
  const [gallons, setGallons] = useState(properties.gallons || '');
  const [material, setMaterial] = useState<Option | null>(properties.material ? { label: properties.material, value: properties.material } : null);
  const [latitude, setLatitude] = useState(properties.latitude || '');
  const [longitude, setLongitude] = useState(properties.longitude || '');
  const [qrCode, setQrCode] = useState(properties.qrCode || '');
  const [nfcId, setNfcId] = useState(properties.nfcId || '');
  const [duty, setDuty] = useState<Option | null>(properties.duty ? { label: properties.duty, value: properties.duty } : null);
  const [requireDisposalTicket, setRequireDisposalTicket] = useState(properties.requireDisposalTicket || false);
  const [eveningService, setEveningService] = useState(properties.eveningService || false);
  const [multipleOnSiteTraps, setMultipleOnSiteTraps] = useState(properties.multipleOnSiteTraps || false);

  useEffect(() => updateProperties('serviceInterval', serviceInterval?.value || ""), [serviceInterval]);
  useEffect(() => updateProperties('gallons', gallons), [gallons]);
  useEffect(() => updateProperties('material', material?.value || ""), [material]);
  useEffect(() => updateProperties('latitude', latitude), [latitude]);
  useEffect(() => updateProperties('longitude', longitude), [longitude]);
  useEffect(() => updateProperties('qrCode', qrCode), [qrCode]);
  useEffect(() => updateProperties('nfcId', nfcId), [nfcId]);
  useEffect(() => updateProperties('duty', duty?.value || ""), [duty]);
  useEffect(() => updateProperties('requireDisposalTicket', requireDisposalTicket), [requireDisposalTicket]);
  useEffect(() => updateProperties('eveningService', eveningService), [eveningService]);
  useEffect(() => updateProperties('multipleOnSiteTraps', multipleOnSiteTraps), [multipleOnSiteTraps]);

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
        label="Duty"
        value={duty}
        onChange={(option) => setDuty(option)}
        options={dutyOptions}
        placeholder="Select Duty"
        className="col-span-1"
      />
      <InputField label="Gallons" value={gallons} fieldType="number" onChange={(e) => setGallons(e.target.value)} className="col-span-1" placeholder='Gallons' />
      <InputField label="Latitude" value={latitude} fieldType="text" onChange={(e) => setLatitude(e.target.value)} className="col-span-1" placeholder='Latitude' />
      <InputField label="Longitude" value={longitude} fieldType="text" onChange={(e) => setLongitude(e.target.value)} className="col-span-1" placeholder='Longitude' />
      <InputField label="QR Code" value={qrCode} fieldType="text" onChange={(e) => setQrCode(e.target.value)} className="col-span-1" placeholder='Enter qr Code' />
      <InputField label="NFC ID" value={nfcId} fieldType="text" onChange={(e) => setNfcId(e.target.value)} className="col-span-1" placeholder='Enter nfc code' />
      <div className="flex items-center col-span-1 cursor-pointer">
        <input
          type="checkbox"
          id="requireDisposalTicket"
          checked={requireDisposalTicket}
          onChange={() => setRequireDisposalTicket((prev: boolean) => !prev)}
          className="mr-[0.5vw] accent-purple-0 cursor-pointer focus-outline-none"
        />
        <label htmlFor="requireDisposalTicket" className="block text-[1vw] font-medium text-darkgray-0 cursor-pointer">Require Disposal Ticket</label>
      </div>
      <div className="flex items-center col-span-1 cursor-pointer">
        <input
          type="checkbox"
          id="eveningService"
          checked={eveningService}
          onChange={() => setEveningService((prev: boolean) => !prev)}
          className="mr-[0.5vw] accent-purple-0 cursor-pointer focus-outline-none"
        />
        <label htmlFor="eveningService" className="block text-[1vw] font-medium text-darkgray-0 cursor-pointer">Evening Service</label>
      </div>
      <div className="flex items-center col-span-1 cursor-pointer">
        <input
          type="checkbox"
          id="multipleOnSiteTraps"
          checked={multipleOnSiteTraps}
          onChange={() => setMultipleOnSiteTraps((prev: boolean) => !prev)}
          className="mr-[0.5vw] accent-purple-0 cursor-pointer focus-outline-none"
        />
        <label htmlFor="multipleOnSiteTraps" className="block text-[1vw] font-medium text-darkgray-0 cursor-pointer">Multiple On-Site Traps</label>
      </div>
    </>
  );
};

export default LintTrapPropertiesForm;
