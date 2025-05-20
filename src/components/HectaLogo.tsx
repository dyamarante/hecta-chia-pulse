
import React from 'react';

interface HectaLogoProps {
  className?: string;
}

const HectaLogo: React.FC<HectaLogoProps> = ({
  className = ''
}) => {
  return (
    <div className={className}>
      <img 
        src="/lovable-uploads/663f7222-29a5-4b6d-9fee-60359ce519ce.png" 
        alt="Hecta Chia Logo" 
        style={{ 
          display: 'block', 
          width: 'auto', 
          height: 'auto', 
          maxWidth: '100%', 
          maxHeight: '100%',
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default HectaLogo;
