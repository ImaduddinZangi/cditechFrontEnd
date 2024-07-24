import React, { useState } from "react";
import { getUserId } from "../../utils/utils";
import { useGetAssetTypesQuery } from "../../redux/api/assetTypeApi";
import { useGetCustomersQuery } from "../../redux/api/customerApi";

interface AddAssetProps {
  onSubmit: (
    name: string,
    type: string,
    customerId: string,
    clientId: string | undefined,
    location: string,
    latitude: number,
    longitude: number,
    description: string,
    status: string,
    inspectionInterval: string,
    qrCode: string,
    nfcCode: string,
    pipeDia: number,
    smart: string,
    size: string,
    material: string,
    deleteProtect: string,
    duty: string,
    rails: string,
    float: number,
    pumps: number
  ) => void;
}

const AddAsset: React.FC<AddAssetProps> = ({ onSubmit }) => {
  const clientId = getUserId();
  const { data: assetTypes, isLoading: assetTypesLoading } = useGetAssetTypesQuery();
  const { data: customers, isLoading: customersLoading } = useGetCustomersQuery();

  const [formState, setFormState] = useState({
    name: "",
    type: "",
    customerId: "",
    location: "",
    latitude: 0,
    longitude: 0,
    description: "",
    status: "active",
    inspectionInterval: "Monthly",
    qrCode: "",
    nfcCode: "",
    pipeDia: 0,
    smart: "No",
    size: "Medium",
    material: "Concrete",
    deleteProtect: "No",
    duty: "",
    rails: "No",
    float: 0,
    pumps: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(
      formState.name,
      formState.type,
      formState.customerId,
      clientId ?? undefined,
      formState.location,
      formState.latitude,
      formState.longitude,
      formState.description,
      formState.status,
      formState.inspectionInterval,
      formState.qrCode,
      formState.nfcCode,
      formState.pipeDia,
      formState.smart,
      formState.size,
      formState.material,
      formState.deleteProtect,
      formState.duty,
      formState.rails,
      formState.float,
      formState.pumps
    );
  };

  if (assetTypesLoading || customersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-darkgray-0">Asset Name:</label>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter asset name"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-darkgray-0">Asset Type:</label>
          <select
            name="type"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={formState.type}
            onChange={handleChange}
          >
            {assetTypes?.map((assetType: any) => (
              <option key={assetType.id} value={assetType.id}>
                {assetType.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-darkgray-0">Customer:</label>
          <select
            name="customerId"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={formState.customerId}
            onChange={handleChange}
          >
            <option value="">Select customer</option>
            {customers?.map((customer: any) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        {/* Add the rest of the form fields here following the same pattern */}
        {/* Location */}
        <div>
          <label className="block text-darkgray-0">Location:</label>
          <input
            type="text"
            name="location"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter asset location"
            value={formState.location}
            onChange={handleChange}
          />
        </div>
        {/* Latitude */}
        <div>
          <label className="block text-darkgray-0">Latitude:</label>
          <input
            type="number"
            name="latitude"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter latitude"
            value={formState.latitude}
            onChange={handleChange}
          />
        </div>
        {/* Longitude */}
        <div>
          <label className="block text-darkgray-0">Longitude:</label>
          <input
            type="number"
            name="longitude"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter longitude"
            value={formState.longitude}
            onChange={handleChange}
          />
        </div>
        {/* Description */}
        <div>
          <label className="block text-darkgray-0">Description:</label>
          <input
            type="text"
            name="description"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter description"
            value={formState.description}
            onChange={handleChange}
          />
        </div>
        {/* Status */}
        <div>
          <label className="block text-darkgray-0">Status:</label>
          <select
            name="status"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={formState.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        {/* Inspection Interval */}
        <div>
          <label className="block text-darkgray-0">Inspection Interval:</label>
          <select
            name="inspectionInterval"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={formState.inspectionInterval}
            onChange={handleChange}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
          </select>
        </div>
        {/* QR Code */}
        <div>
          <label className="block text-darkgray-0">QR Code:</label>
          <input
            type="text"
            name="qrCode"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter QR code"
            value={formState.qrCode}
            onChange={handleChange}
          />
        </div>
        {/* NFC Code */}
        <div>
          <label className="block text-darkgray-0">NFC Code:</label>
          <input
            type="text"
            name="nfcCode"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter NFC code"
            value={formState.nfcCode}
            onChange={handleChange}
          />
        </div>
        {/* Pipe Diameter */}
        <div>
          <label className="block text-darkgray-0">Pipe Diameter:</label>
          <input
            type="number"
            name="pipeDia"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter pipe diameter"
            value={formState.pipeDia}
            onChange={handleChange}
          />
        </div>
        {/* Smart */}
        <div>
          <label className="block text-darkgray-0">Smart:</label>
          <select
            name="smart"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={formState.smart}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {/* Size */}
        <div>
          <label className="block text-darkgray-0">Size:</label>
          <select
            name="size"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={formState.size}
            onChange={handleChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="XLarge">Xlarge</option>
            <option value="XXLarge">XXLarge</option>
          </select>
        </div>
        {/* Material */}
        <div>
          <label className="block text-darkgray-0">Material:</label>
          <select
            name="material"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={formState.material}
            onChange={handleChange}
          >
            <option value="Concrete">Concrete</option>
            <option value="Cement">Cement</option>
            <option value="Brass">Brass</option>
            <option value="Iron">Iron</option>
          </select>
        </div>
        {/* Delete Protect */}
        <div>
          <label className="block text-darkgray-0">Delete Protect:</label>
          <select
            name="deleteProtect"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={formState.deleteProtect}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {/* Duty */}
        <div>
          <label className="block text-darkgray-0">Duty:</label>
          <input
            type="text"
            name="duty"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter duty"
            value={formState.duty}
            onChange={handleChange}
          />
        </div>
        {/* Rails */}
        <div>
          <label className="block text-darkgray-0">Rails:</label>
          <select
            name="rails"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={formState.rails}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {/* Float */}
        <div>
          <label className="block text-darkgray-0">Float:</label>
          <input
            type="number"
            name="float"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter float"
            value={formState.float}
            onChange={handleChange}
          />
        </div>
        {/* Pumps */}
        <div>
          <label className="block text-darkgray-0">Pumps:</label>
          <input
            type="number"
            name="pumps"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter pumps"
            value={formState.pumps}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-darkgray-0 rounded-md shadow-sm"
          >
            Do Not Save & Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
          >
            Save & Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
