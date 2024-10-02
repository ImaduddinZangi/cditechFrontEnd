import React from "react";

interface OutlinePurpleButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const OutlinePurpleButton: React.FC<OutlinePurpleButtonProps> = ({
  text,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`px-[1vw] py-[0.5vw] bg-white text-purple-0 border border-purple-0 rounded-[0.4vw] text-[1vw] font-inter font-medium ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default OutlinePurpleButton;
