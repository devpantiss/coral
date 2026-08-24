import React from 'react';

const Heading = ({ text, bgColor, color }) => {
  return (
    <div className="flex items-center my-10">
      {/* Vertical Line */}
      <div className={`h-6 w-1 ${bgColor} mr-3`}></div>
      
      {/* Heading Text */}
      <h2 className={`text-2xl md:text-3xl font-semibold ${color}`}>
        {text}
      </h2>
    </div>
  );
};

export default Heading;
