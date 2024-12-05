// src/components/CustomLogo.js
import * as React from 'react';

function CustomLogo({ size = 40 }) {
  return (
    <img 
      src='../../../assets/pdf/OCA-Logo.png'  // Update with your logo's actual path
      alt="OCA Logo"
      style={{ width: size, height: size }}  // Adjust size based on your requirement
    />
  );
}

export default CustomLogo;