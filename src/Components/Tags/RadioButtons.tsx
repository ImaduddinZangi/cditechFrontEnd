import React from 'react';

interface RadioButtonsProps {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({ label, checked, onChange }) => {
    return (
        <div className="flex items-center space-x-[2vw]">
            <label className="block text-[1vw] font-medium text-darkgray-0">{label}</label>
            <label className="block text-[1vw] font-medium text-darkgray-0 flex flex-row items-center gap-[0.3vw]">
                <input
                    type="radio"
                    checked={checked}
                    onChange={() => onChange(true)}
                    className="accent-purple-0 w-[1vw]"
                />
                Yes
            </label>
            <label className="block text-[1vw] font-medium text-darkgray-0 flex flex-row items-center gap-[0.3vw]">
                <input
                    type="radio"
                    checked={!checked}
                    onChange={() => onChange(false)}
                    className="accent-purple-0 w-[1vw]"
                />
                No
            </label>
        </div>
    );
};

export default RadioButtons;
