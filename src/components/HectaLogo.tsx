import React from 'react';
interface HectaLogoProps {
  className?: string;
}
const HectaLogo: React.FC<HectaLogoProps> = ({
  className = ''
}) => {
  return <div className={`flex items-center ${className}`}>
      
    </div>;
};
export default HectaLogo;