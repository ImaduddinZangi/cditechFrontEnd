import React from "react";

interface WhiteButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: React.ReactNode;
  iconClassName?: string;
}

const WhiteButton: React.FC<WhiteButtonProps> = ({
  text,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  icon,
  iconClassName,
}) => {
  return (
    <button
      type={type}
      className={`${icon ? "flex flex-row items-center justify-between" : ""} px-[1vw] py-[0.5vw] border bg-white text-inter text-darkgray-0 rounded-[0.4vw] text-[1vw] font-inter font-medium hover:shadow-lg active:shadow-none ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {icon && <span className={iconClassName}>{icon}</span>}
    </button>
  );
};

export default WhiteButton;
