import React from 'react';
import styles from './sdgSection.module.css'; // Corrected CSS module import

const SDGSection = () => {
  return (
    <div className="relative w-60 h-60 flex justify-center items-center bg-transparent">
      {/* Rotating colorful circle logo */}
      <div className="relative">
        <img
          src="/Home/SDG/sdg-wheel.svg" // Replace with actual image path
          alt="Rotating Logo"
          className={`w-60 h-60 ${styles.animateRotate}`} // Use CSS module class
        />
      </div>

      {/* White semicircle overlay */}
      <div className="absolute top-30 bottom-0 left-0 right-0 flex justify-center items-center">
        <div className="relative w-60 h-32 bg-white rounded-b-full overflow-hidden z-10">
          {/* Company logo inside the white semicircle */}
          <img
            src="/Home/SDG/mowash_SDG.png" // Replace with actual image path
            alt="Company Logo"
            className="absolute -top-10 h-[80px] inset-0 mx-auto my-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SDGSection;
