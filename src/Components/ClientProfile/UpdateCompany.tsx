import React, { useEffect, useState } from "react";
import PurpleButton from "../Tags/PurpleButton";
import InputField from "../Tags/InputField";
import { states } from "../Customer/Constants/usStates";
import cities from "cities.json";
import SelectField, { Option } from "../Tags/SelectField";
import PhoneInput from "../Tags/PhoneInput";
import { Company } from "../../redux/features/companySlice";
import WhiteButton from "../Tags/WhiteButton";
import { useNavigate } from "react-router-dom";

interface City {
  name: string;
  lat: string;
  lng: string;
  country: string;
  admin1: string;
  admin2: string;
}

interface UpdateCompanyProps {
  onSubmit: (data: Company) => void;
  initialData?: Partial<Company>;
}

const companyTypeOptions: Option[] = [
  { label: "LLC", value: "llc" },
  { label: "Corporation", value: "corporation" },
  { label: "Sole Proprietorship", value: "sole_proprietorship" },
  { label: "Partnership", value: "partnership" },
  { label: "Limited Liability Partnership (LLP)", value: "llp" },
  { label: "Cooperative", value: "cooperative" },
  { label: "Non-Profit Organization", value: "non_profit" },
  { label: "Trust", value: "trust" },
  { label: "Other", value: "other" },
];

const industryOptions: Option[] = [
  { label: "Technology", value: "tech" },
  { label: "Healthcare", value: "health" },
  { label: "Finance", value: "finance" },
  { label: "Retail", value: "retail" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Education", value: "education" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Construction", value: "construction" },
  { label: "Transportation", value: "transportation" },
  { label: "Government", value: "government" },
  { label: "Media & Entertainment", value: "media_entertainment" },
  { label: "Professional Services", value: "professional_services" },
  { label: "Non-Profit", value: "non_profit" },
  { label: "Other", value: "other" },
];

const paymentMethodOptions: Option[] = [
  { label: "Credit Card", value: "credit_card" },
  { label: "Debit Card", value: "debit_card" },
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "PayPal", value: "paypal" },
  { label: "Google Pay", value: "google_pay" },
  { label: "Apple Pay", value: "apple_pay" },
  { label: "Cash by Hand", value: "cash_by_hand" },
  { label: "Check", value: "check" },
  { label: "Money Order", value: "money_order" },
  { label: "Bitcoin", value: "bitcoin" },
  { label: "Other", value: "other" },
];

const UpdateCompany: React.FC<UpdateCompanyProps> = ({
  onSubmit,
  initialData,
}) => {
  const [companyName, setCompanyName] = useState(
    initialData?.company_name || ""
  );
  const [companyType, setCompanyType] = useState<Option | null>(
    initialData?.company_type
      ? { label: initialData.company_type, value: initialData.company_type }
      : null
  );
  const [industry, setIndustry] = useState<Option | null>(
    initialData?.industry
      ? { label: initialData.industry, value: initialData.industry }
      : null
  );
  const [companyLogo, setCompanyLogo] = useState<string>(
    initialData?.company_logo || ""
  );
  const [address, setAddress] = useState(initialData?.address || "");
  const [billingAddress, setBillingAddress] = useState(
    initialData?.billing_address || ""
  );
  const [city, setCity] = useState<Option | null>(
    initialData?.city
      ? { label: initialData.city, value: initialData.city }
      : null
  );
  const [state, setState] = useState<Option | null>(
    initialData?.state
      ? { label: initialData.state, value: initialData.state }
      : null
  );
  const [zipcode, setZipcode] = useState(initialData?.zipcode || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [phone2, setPhone2] = useState(initialData?.phone2 || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [website, setWebsite] = useState(initialData?.website || "");
  const [paymentMethod, setPaymentMethod] = useState<Option | null>(
    initialData?.payment_method
      ? { label: initialData.payment_method, value: initialData.payment_method }
      : null
  );
  const [citiesOfSelectedState, setCitiesOfSelectedState] = useState<Option[]>(
    []
  );

  const navigate = useNavigate();

  useEffect(() => {
    const getCities = (stateValue: string | null): Option[] => {
      return stateValue
        ? (cities as City[])
            .filter((city) => city.admin1 === stateValue)
            .map((city) => ({
              value: city.name,
              label: city.name,
            }))
        : [];
    };

    setCitiesOfSelectedState(getCities(state?.value || null));
  }, [state]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      id: initialData?.id,
      company_name: companyName,
      company_type: companyType?.value || "",
      industry: industry?.value || "",
      company_logo: companyLogo,
      address,
      billing_address: billingAddress,
      city: city?.label || "",
      state: state?.label || "",
      zipcode,
      phone,
      phone2,
      email,
      website,
      payment_method: paymentMethod?.value || "",
    });
  };

  return (
    <div className="p-[2vw] m-[2vw] bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        {/* Company Information */}
        <div className="grid grid-cols-2 gap-[1vw]">
          <InputField
            label="Company Name"
            name="companyName"
            fieldType="text"
            value={companyName}
            placeholder="Enter company name"
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <div>
            <SelectField
              label="Company Type"
              value={companyType}
              options={companyTypeOptions}
              onChange={(option) => setCompanyType(option)}
              required
            />
          </div>
          <div>
            <SelectField
              label="Industry"
              value={industry}
              options={industryOptions}
              onChange={(option) => setIndustry(option)}
              required
            />
          </div>
          <div>
            <SelectField
              label="Payment Method"
              value={paymentMethod}
              options={paymentMethodOptions}
              onChange={(option) => setPaymentMethod(option)}
              required
            />
          </div>
          <InputField
            label="Company Email"
            name="email"
            fieldType="email"
            value={email}
            placeholder="Enter company email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            label="Company Website"
            name="website"
            fieldType="text"
            value={website}
            placeholder="Enter company website"
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
        </div>

        {/* Address Section */}
        <div className="grid grid-cols-2 gap-[1vw] mt-[1vw]">
          <InputField
            label="Company Address"
            name="companyAddress"
            fieldType="text"
            value={address}
            placeholder="Enter company address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <InputField
            label="Billing Address"
            name="billingAddress"
            fieldType="text"
            value={billingAddress}
            placeholder="Enter billing address"
            onChange={(e) => setBillingAddress(e.target.value)}
            required
          />
          <SelectField
            label="State"
            value={state}
            placeholder="Select State"
            onChange={(option) => {
              setState(option);
              setCity(null);
            }}
            options={states}
            required
          />
          <SelectField
            label="City"
            value={city}
            onChange={(option) => setCity(option)}
            options={citiesOfSelectedState}
            placeholder="Select City"
            disabled={!state}
            required
          />
          <InputField
            label="Zipcode"
            name="zipcode"
            fieldType="text"
            value={zipcode}
            placeholder="Enter Zip Code"
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
          <PhoneInput
            label="Phone"
            name="phone"
            value={phone}
            onChange={setPhone}
            required
          />
          <PhoneInput
            label="Phone 2"
            name="phone2"
            value={phone2}
            onChange={setPhone2}
          />
          <InputField
            label="Company Logo"
            name="companyLogo"
            fieldType="text"
            value={companyLogo}
            placeholder="http://www.logo.com"
            onChange={(e) => setCompanyLogo(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end space-x-[1vw] mt-[1vw]">
          <PurpleButton type="submit" text="Update" />
          <WhiteButton
            type="button"
            text="Cancel"
            onClick={() => navigate("/client-profile")}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateCompany;
