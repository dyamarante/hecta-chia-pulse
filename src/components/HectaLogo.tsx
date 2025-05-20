
import React from 'react';

interface HectaLogoProps {
  className?: string;
}

const HectaLogo: React.FC<HectaLogoProps> = ({
  className = ''
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width="180" 
        height="60" 
        viewBox="0 0 180 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Contorno da semente (dourado) */}
        <path d="M35 10C20 10 10 25 10 40C10 50 20 55 30 55C45 55 55 40 55 25C55 15 45 10 35 10Z" stroke="#C19A45" strokeWidth="3" fill="none" />
        
        {/* Folha dentro da semente (verde) */}
        <path d="M30 25C35 25 37 30 35 35C33 40 28 45 25 40C22 35 25 30 30 25Z" fill="#3A633A" />
        
        {/* Texto CO+ dentro da folha */}
        <text x="26" y="40" fontSize="10" fontWeight="bold" fill="#3A633A">CO+</text>
        
        {/* Texto HECTA (verde) */}
        <text x="62" y="30" fontSize="18" fontWeight="bold" fill="#3A633A">HECTA</text>
        
        {/* Texto Chia (dourado) */}
        <text x="62" y="50" fontSize="22" fontWeight="bold" fill="#C19A45">Chia</text>
      </svg>
    </div>
  );
};

export default HectaLogo;
