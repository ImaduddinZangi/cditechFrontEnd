import React from 'react';

interface ActiveBadgeProps {
  iconColor: string;
  bgColor: string;
  textColor: string;
  text: string;
}

const ActiveBadge: React.FC<ActiveBadgeProps> = ({iconColor, bgColor, text, textColor}) => {
  return (
    <div className={`flex items-center space-x-2 ${bgColor} rounded-full px-3 py-1`}>
      <span className={`${iconColor} rounded-full w-2.5 h-2.5`}></span>
      <span className={`${textColor} font-medium`}>{text}</span>
    </div>
  );
};

export default ActiveBadge;


