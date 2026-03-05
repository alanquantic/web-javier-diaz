import React from "react";
import blueLogoSrc from '@/assets/images/jd-blue.png';
// We'll need a white version too, but for now using the blue one
import whiteLogoSrc from '@/assets/images/jd-blue.png';

interface LogoProps {
  variant?: 'blue' | 'white';
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ variant = 'blue', width = 60, height = 60 }) => {
  const logoSrc = variant === 'blue' ? blueLogoSrc : whiteLogoSrc;
  
  return (
    <img 
      src={logoSrc} 
      alt="Javier Díaz Logo"
      className="w-10 h-10 md:w-[40px] md:h-[40px]"
      style={{ filter: variant === 'white' ? 'brightness(0) invert(1)' : 'none' }}
    />
  );
};

export default Logo;
