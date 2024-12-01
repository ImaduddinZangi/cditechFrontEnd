import React from "react";

interface WhiteButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  imgClassName?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: React.ReactNode;
  img?: string;
}

const WhiteButton: React.FC<WhiteButtonProps> = ({
  text,
  onClick,
  className = "",
  iconClassName,
  imgClassName,
  type = "button",
  disabled = false,
  icon,
  img,
}) => {
  return (
    <button
      type={type}
      className={`px-[1vw] py-[0.5vw] border bg-white text-inter text-darkgray-0 rounded-[0.4vw] text-[1vw] font-inter font-medium
        ${icon ? "flex flex-row items-center justify-between" : ""} 
      ${img ? "flex flex-row items-center justify-between" : ""} 
       ${disabled ? "cursor-not-allowed" : "hover:shadow-lg active:shadow-none"} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {icon && <span className={iconClassName}>{icon}</span>}
      {img && <img src={img} alt="icon" className={`w-[1vw] h-[1vw] ${imgClassName}`} />}
    </button>
  );
};

export default WhiteButton;
