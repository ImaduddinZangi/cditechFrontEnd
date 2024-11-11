import React, { FormEvent } from "react";

interface PurpleButtonProps {
  text: string;
  onClick?: () => void;
  onEvent?: (event: FormEvent) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: React.ReactNode;
}

const PurpleButton: React.FC<PurpleButtonProps> = ({
  text,
  onClick,
  onEvent,
  className = "",
  type = "button",
  disabled = false,
  icon,
}) => {
  return (
    <button
      type={type}
      className={`${icon ? "flex flex-row items-center justify-between" : ""} px-[1vw] py-[0.5vw] bg-purple-0 text-inter text-white rounded-[0.4vw] text-[1vw] font-inter hover:shadow-lg active:shadow-none font-medium ${className}`}
      onClick={onClick || onEvent}
      disabled={disabled}
    >
      {text}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default PurpleButton;
