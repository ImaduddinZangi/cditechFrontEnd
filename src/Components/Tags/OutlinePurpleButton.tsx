import React, { FormEvent } from "react";

interface OutlinePurpleButtonProps {
  text: string;
  onClick?: () => void;
  onEvent?: (event: FormEvent) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: React.ReactNode;
}

const OutlinePurpleButton: React.FC<OutlinePurpleButtonProps> = ({
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
      className={`${icon ? "flex flex-row items-center justify-between" : ""} px-[1vw] py-[0.5vw] bg-white hover:bg-purple-0 text-inter text-purple-0 hover:text-white border border-purple-0 rounded-[0.4vw] text-[1vw] font-inter font-medium duration-200 active:opacity-90 ${className}`}
      onClick={onClick || onEvent}
      disabled={disabled}
    >
      {text}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default OutlinePurpleButton;
