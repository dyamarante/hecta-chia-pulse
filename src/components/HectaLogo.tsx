
import React from 'react';

interface HectaLogoProps {
  className?: string;
}

const HectaLogo: React.FC<HectaLogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/1b75fca4-2547-4477-9c8e-54aa239b1bc6.png" 
        alt="Hecta Chia Logo" 
        className="h-10 w-auto"
      />
    </div>
  );
};

export default HectaLogo;
