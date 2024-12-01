import React, { FormEvent } from "react";

interface PurpleButtonProps {
  text: string;
  onClick?: () => void;
  onEvent?: (event: FormEvent) => void;
  className?: string;
  imgClassName?: string;
  iconClassName?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: React.ReactNode;
  img?: string;
}

const PurpleButton: React.FC<PurpleButtonProps> = ({
  text,
  onClick,
  onEvent,
  className = "",
  imgClassName,
  iconClassName,
  type = "button",
  disabled = false,
  icon,
  img,
}) => {
  return (
    <button
      type={type}
      className={`${icon ? "flex flex-row items-center justify-between" : ""} ${icon ? "flex flex-row items-center justify-between" : ""} ${img ? "flex flex-row items-center justify-between" : ""} px-[1vw] py-[0.5vw] bg-purple-0 text-inter text-white rounded-[0.4vw] text-[1vw] font-inter ${disabled ? "cursor-not-allowed" : "hover:shadow-lg active:shadow-none"} font-medium ${className}`}
      onClick={onClick || onEvent}
      disabled={disabled}
    >
      {text}
      {icon && <span className={iconClassName}>{icon}</span>}
      {img && <img src={img} alt="icon" className={`w-[1vw] h-[1vw] ${imgClassName}`} />}
    </button>
  );
};

export default PurpleButton;
