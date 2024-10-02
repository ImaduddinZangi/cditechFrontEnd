import React from "react";
import WhiteButton from "../Tags/WhiteButton";

const CompanyNotificationSettings: React.FC = () => {
  return (
    <div className="p-[1vw]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-semibold text-[1vw]">
            Primary notification email:
          </p>
          <p className="text-[1vw]">bobplumbing@gmail.com</p>
          <p className="font-semibold text-[1vw] mt-2">
            Primary notification phone:
          </p>
          <p className="text-[1vw]">800-99-3355</p>
        </div>
        <WhiteButton text="Edit" />
      </div>
      <div className="grid grid-cols-2 gap-x-[4vw] gap-y-[2vw]">
        {/* Notification Settings */}
        <div>
          <p className="font-semibold text-[1vw]">Past-Due Inspection:</p>
          <label className="mr-4">
            <input type="checkbox" className="mr-2" /> SMS
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> Email
          </label>
        </div>

        <div>
          <p className="font-semibold text-[1vw]">Upcoming Inspection:</p>
          <label className="mr-4">
            <input type="checkbox" className="mr-2" /> SMS
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> Email
          </label>
        </div>

        <div>
          <p className="font-semibold text-[1vw]">Major Security Alerts:</p>
          <label className="mr-4">
            <input type="checkbox" className="mr-2" /> SMS
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> Email
          </label>
        </div>

        <div>
          <p className="font-semibold text-[1vw]">New User Added:</p>
          <label className="mr-4">
            <input type="checkbox" className="mr-2" /> SMS
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> Email
          </label>
        </div>

        <div>
          <p className="font-semibold text-[1vw]">Billing Alerts:</p>
          <label className="mr-4">
            <input type="checkbox" className="mr-2" /> SMS
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> Email
          </label>
        </div>

        <div>
          <p className="font-semibold text-[1vw]">QuickBooks Link Alerts:</p>
          <label className="mr-4">
            <input type="checkbox" className="mr-2" /> SMS
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> Email
          </label>
        </div>

        <div>
          <p className="font-semibold text-[1vw]">Errors Alerts:</p>
          <label className="mr-4">
            <input type="checkbox" className="mr-2" /> SMS
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> Email
          </label>
        </div>

        <div>
          <p className="font-semibold text-[1vw]">Monthly Reports:</p>
          <label className="mr-4">
            <input type="checkbox" className="mr-2" /> SMS
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> Email
          </label>
        </div>
      </div>
    </div>
  );
};

export default CompanyNotificationSettings;
