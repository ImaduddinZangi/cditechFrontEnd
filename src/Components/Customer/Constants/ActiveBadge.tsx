import React from 'react';

interface ActiveBadgeProps {
  iconColor: string;
  bgColor: string;
  textColor: string;
  text: string;
  half?: boolean;
}

const ActiveBadge: React.FC<ActiveBadgeProps> = ({iconColor, bgColor, text, textColor, half}) => {
  return (
    <div className={`flex items-center space-x-2 ${bgColor} rounded-full ${half ? "w-1/2" :  ""} px-[0.5vw] py-[0.25vw]`}>
      <span className={`${iconColor} rounded-full w-[0.5vw] h-[0.5vw]`}></span>
      <span className={`${textColor} font-medium`}>{text}</span>
    </div>
  );
};

export default ActiveBadge;


