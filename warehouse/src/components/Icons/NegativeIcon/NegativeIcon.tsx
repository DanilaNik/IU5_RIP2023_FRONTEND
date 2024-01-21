import * as React from 'react';

const NegativeIcon: React.FC = () => {
 return (
    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
      <line x1="5" y1="5" x2="25" y2="25" stroke="#FFFFFF" strokeWidth="2"/>
      <line x1="25" y1="5" x2="5" y2="25" stroke="#FFFFFF" strokeWidth="2"/>
    </svg>
 );
}

export default NegativeIcon;
