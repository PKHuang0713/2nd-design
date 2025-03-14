
import React from 'react';

interface BaseballCapProps {
  size?: number;
  className?: string;
}

const BaseballCap: React.FC<BaseballCapProps> = ({ size = 24, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5C4 7.5 7 5.5 12 5.5C17 5.5 20 7.5 20 10.5C20 12 19 14 17.5 15L16 16.5H8L6.5 15C5 14 4 12 4 10.5Z" />
      <path d="M8 16.5L5 19.5L4 18L6.5 15" />
      <path d="M16 16.5L19 19.5L20 18L17.5 15" />
      <path d="M8 11.5H16" />
    </svg>
  );
};

export default BaseballCap;
