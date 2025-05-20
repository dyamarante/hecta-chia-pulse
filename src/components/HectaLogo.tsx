
import React from 'react';

interface HectaLogoProps {
  className?: string;
}

const HectaLogo: React.FC<HectaLogoProps> = ({
  className = ''
}) => {
  return (
    <div className={className}>
      <svg 
        width="180" 
        height="60" 
        viewBox="0 0 180 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      >
        {/* Semente circular (contorno dourado) */}
        <circle cx="35" cy="32" r="22" stroke="#C19A45" strokeWidth="2" fill="white" />
        
        {/* Folha estilizada (verde) dentro da semente */}
        <path d="M30 25C35 25 37 30 35 35C33 40 28 45 25 40C22 35 25 30 30 25Z" fill="#3A633A" />
        
        {/* Texto HECTA (verde) */}
        <text x="64" y="30" fontSize="18" fontWeight="bold" fill="#3A633A">HECTA</text>
        
        {/* Texto Chia (dourado) */}
        <text x="64" y="50" fontSize="22" fontWeight="bold" fill="#C19A45">Chia</text>
      </svg>
    </div>
  );
};

export default HectaLogo;
