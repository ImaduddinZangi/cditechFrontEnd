import React from "react";

interface WhiteButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const WhiteButton: React.FC<WhiteButtonProps> = ({
  text,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`px-[1vw] py-[0.5vw] border bg-white hover:bg-gray-700 text-darkgray-0 hover:text-white rounded-[0.4vw] text-[1vw] font-inter font-medium active:opacity-90 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default WhiteButton;
