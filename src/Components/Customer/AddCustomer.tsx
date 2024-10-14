import React, { useState, useEffect } from "react";
import cities from "cities.json";
import { states } from "./Constants/usStates";
import { useNavigate } from "react-router-dom";
import InputField from "../Tags/InputField";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import SelectField, { Option } from "../Tags/SelectField";
import { Customer } from "../../redux/features/customerSlice";
import OutlinePurpleButton from "../Tags/OutlinePurpleButton";
import AddPhotos from "./AddPhotos";
import PhoneInput from "../Tags/PhoneInput";

interface City {
  name: string;
  lat: string;
  lng: string;
  country: string;
  admin1: string;
  admin2: string;
}

const typeOptions = [
  { label: "Commercial", value: "Commercial" },
  { label: "Residential", value: "Residential" },
  { label: "Government", value: "Government" },
  { label: "Industrial", value: "Industrial" },
  { label: "Other", value: "Other" },
];

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Disabled", value: "Disabled" },
  { label: "Do Not Service", value: "Do Not Service" },
  { label: "Inactive", value: "Inactive" },
];

interface AddCustomerProps {
  onSubmit: (data: FormData) => void;
  initialData?: Partial<Customer>;
}

const AddCustomer: React.FC<AddCustomerProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [gateCode, setGateCode] = useState(initialData?.gate_code || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [address, setAddress] = useState(initialData?.address || "");
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [selectedCity, setSelectedCity] = useState<Option | null>(null);
  const [billingState, setBillingState] = useState<Option | null>(null);
  const [billingCity, setBillingCity] = useState<Option | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [zipCode, setZipCode] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");
  const [billingContactEmail, setBillingContactEmail] = useState(
    initialData?.billingContactEmail || ""
  );
  const [status, setStatus] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [type, setType] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [previousProvider, setPreviousProvider] = useState(
    initialData?.previousProvider || ""
  );
  const [serviceAddress, setServiceAddress] = useState(
    initialData?.service_address || ""
  );
  const [billingStreetAddress, setBillingStreetAddress] = useState(
    initialData?.billing_address || ""
  );

  const [citiesOfSelectedState, setCitiesOfSelectedState] = useState<Option[]>(
    []
  );
  const [billingCitiesOfSelectedState, setBillingCitiesOfSelectedState] =
    useState<Option[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getCities = (stateValue: string | null): Option[] => {
      return stateValue
        ? (cities as City[])
            .filter((city) => city.admin1 === stateValue)
            .map((city) => ({
              value: city.name,
              label: city.name,
              key: `${city.name}-${city.lat}-${city.lng}`,
            }))
        : [];
    };

    setCitiesOfSelectedState(getCities(selectedState?.value || null));
    setBillingCitiesOfSelectedState(getCities(billingState?.value || null));
  }, [selectedState, billingState]);

  useEffect(() => {
    if (initialData) {
      const serviceAddressParts = initialData.service_address
        ? initialData.service_address.split(", ")
        : [];
      const billingAddressParts = initialData.billing_address
        ? initialData.billing_address.split(", ")
        : [];

      setName(initialData.name ?? "");
      setEmail(initialData.email ?? "");
      setPhone(initialData.phone ?? "");
      setGateCode(initialData.gate_code ?? "");
      setPreviousProvider(initialData.previousProvider ?? "");

      if (serviceAddressParts.length > 0) {
        setServiceAddress(serviceAddressParts.slice(1, -2).join(", "));
        setSelectedCity({
          value: serviceAddressParts[serviceAddressParts.length - 2] ?? "",
          label: serviceAddressParts[serviceAddressParts.length - 2] ?? "",
        });
        setSelectedState({
          value: serviceAddressParts[serviceAddressParts.length - 1] ?? "",
          label: serviceAddressParts[serviceAddressParts.length - 1] ?? "",
        });
        setZipCode(serviceAddressParts[0] ?? "");
      }

      if (billingAddressParts.length > 0) {
        setBillingStreetAddress(billingAddressParts.slice(1, -2).join(", "));
        setBillingCity({
          value: billingAddressParts[billingAddressParts.length - 2] ?? "",
          label: billingAddressParts[billingAddressParts.length - 2] ?? "",
        });
        setBillingState({
          value: billingAddressParts[billingAddressParts.length - 1] ?? "",
          label: billingAddressParts[billingAddressParts.length - 1] ?? "",
        });
        setBillingZipCode(billingAddressParts[0] ?? "");
      }
    }
  }, [initialData]);

  const handlePhotosSubmit = (uploadedPhotos: File[]) => {
    setPhotos(uploadedPhotos);
    handleCloseModal();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const combinedBillingAddress = `${billingZipCode}, ${billingStreetAddress}, ${billingCity?.label}, ${billingState?.label}`;
    const combinedServiceAddress = `${zipCode}, ${serviceAddress}, ${selectedCity?.label}, ${selectedState?.label}`;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gate_code", gateCode);
    formData.append("phone", phone);
    formData.append("previous_phone_number", "");
    formData.append("address", address);
    formData.append("billing_address", combinedBillingAddress);
    formData.append("service_address", combinedServiceAddress);
    formData.append("type", type?.value || "");
    formData.append("status", status?.value || "");
    formData.append("service_contact", phone);
    formData.append("previousProvider", previousProvider);
    formData.append("billingContactEmail", billingContactEmail);
    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    onSubmit(formData);
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-[1.5vw]">
          <div>
            <InputField
              label="Customer Name"
              name="name"
              fieldType="text"
              value={name}
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <SelectField
              label="Customer Type"
              name="customerType"
              value={type}
              placeholder="Residential"
              options={typeOptions}
              onChange={(option) => setType(option)}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[1.5vw]">
          <div>
            <SelectField
              label="Customer Status"
              name="customerStatus"
              value={status}
              placeholder="Active"
              options={statusOptions}
              onChange={(option) => setStatus(option)}
              required
            />
          </div>
          <div>
            <InputField
              label="Customer Address"
              name="customerAddress"
              fieldType="text"
              value={address}
              placeholder="123 main street"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[1.5vw]">
          <div>
            <InputField
              label="Email Address"
              name="email"
              fieldType="email"
              value={email}
              placeholder="johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <InputField
              label="Previous Provider Company"
              name="previousProvider"
              fieldType="text"
              value={previousProvider}
              placeholder="Company name"
              onChange={(e) => setPreviousProvider(e.target.value)}
              required
            />
          </div>
          <div>
            <InputField
              label="Gate Code"
              name="gateCode"
              fieldType="text"
              value={gateCode}
              placeholder="1234"
              onChange={(e) => setGateCode(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-[1.5vw]">
          <div>
            <InputField
              label="Service Address"
              name="serviceAddress"
              fieldType="text"
              value={serviceAddress}
              placeholder="123 main sreet"
              onChange={(e) => setServiceAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <SelectField
              label="State"
              value={selectedState}
              placeholder="New York"
              onChange={(option) => {
                setSelectedState(option);
                setSelectedCity(null);
              }}
              options={states}
              required
            />
          </div>
          <div>
            <SelectField
              label="City"
              value={selectedCity}
              onChange={(option) => setSelectedCity(option)}
              options={citiesOfSelectedState}
              placeholder="New York City"
              disabled={!selectedState}
              required
            />
          </div>
          <div>
            <InputField
              label="Zipcode"
              name="zipCode"
              fieldType="text"
              value={zipCode}
              placeholder="12345"
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-[1.5vw]">
          <div>
            <InputField
              label="Billing Address"
              name="billingStreetAddress"
              fieldType="text"
              value={billingStreetAddress}
              placeholder="123 main street"
              onChange={(e) => setBillingStreetAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <SelectField
              label="State"
              value={billingState}
              onChange={(option) => {
                setBillingState(option);
                setBillingCity(null);
              }}
              options={states}
              placeholder="New York"
              required
            />
          </div>
          <div>
            <SelectField
              label="City"
              value={billingCity}
              onChange={(option) => setBillingCity(option)}
              options={billingCitiesOfSelectedState}
              disabled={!billingState}
              placeholder="New York City"
              required
            />
          </div>
          <div>
            <InputField
              label="Zipcode"
              name="billingZipCode"
              fieldType="text"
              value={billingZipCode}
              placeholder="12345"
              onChange={(e) => setBillingZipCode(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[1.5vw]">
          <div>
            <PhoneInput
              label="Service Contact"
              name="serviceContact"
              value={phone}
              placeholder="123456789"
              onChange={setPhone}
              required
            />
          </div>
          <div>
            <InputField
              label="Billing Contact Email"
              name="billingContactEmail"
              fieldType="email"
              value={billingContactEmail}
              placeholder="billingcontact@gmail.com"
              onChange={(e) => setBillingContactEmail(e.target.value)}
              required
            />
          </div>
          <OutlinePurpleButton onClick={handleOpenModal} text="Upload Photos" />
        </div>
        <div className="flex justify-end space-x-[1vw]">
          <PurpleButton type="submit" text="Create" />
          <WhiteButton
            type="button"
            text="Cancel"
            onClick={() => navigate("/manage-customers")}
          />
        </div>
      </form>
      {isModalOpen && (
        <AddPhotos
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handlePhotosSubmit}
          type="Customer"
        />
      )}
    </div>
  );
};

export default AddCustomer;
