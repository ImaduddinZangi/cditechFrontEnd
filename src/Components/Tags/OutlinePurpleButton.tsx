import React, { FormEvent } from "react";

interface OutlinePurpleButtonProps {
  text: string;
  onClick?: () => void;
  onEvent?: (event: FormEvent) => void;
  className?: string;
  iconClassName?: string;
  imgClassName?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: React.ReactNode;
  img?: string;
}

const OutlinePurpleButton: React.FC<OutlinePurpleButtonProps> = ({
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
      className={`px-[1vw] py-[0.5vw] bg-white text-inter border rounded-[0.4vw] text-[1vw] font-inter font-medium duration-200 ${disabled
          ? "cursor-not-allowed"
          : "hover:bg-purple-0 hover:text-white border-purple-0 text-purple-0 active:opacity-90"
        } ${icon ? "flex flex-row items-center justify-between" : ""} ${img ? "flex flex-row items-center justify-between" : ""} ${className}`}
      onClick={disabled ? undefined : onClick || onEvent}
      disabled={disabled}
    >
      {text}
      {icon && <span className={iconClassName}>{icon}</span>}
      {img && <img src={img} alt="icon" className={`w-[1vw] h-[1vw] ${imgClassName}`} />}
    </button>
  );
};

export default OutlinePurpleButton;
