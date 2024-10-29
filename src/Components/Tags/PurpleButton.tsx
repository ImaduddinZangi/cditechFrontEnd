import React, { FormEvent } from "react";

interface PurpleButtonProps {
  text: string;
  onClick?: () => void;
  onEvent?: (event: FormEvent) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const PurpleButton: React.FC<PurpleButtonProps> = ({
  text,
  onClick,
  onEvent,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`px-[1vw] py-[0.5vw] bg-purple-0 text-white rounded-[0.4vw] text-[1vw] font-inter hover:shadow-lg active:shadow-none font-medium ${className}`}
      onClick={onClick || onEvent}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default PurpleButton;
