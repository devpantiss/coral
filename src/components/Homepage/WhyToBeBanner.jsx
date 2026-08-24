import React from 'react';
import { FaMoneyCheckAlt, FaClock, FaHeart, FaBaby } from 'react-icons/fa'; // Icons for MoWash Engineer
import { FiMonitor, FiTrendingUp, FiGlobe, FiUsers } from 'react-icons/fi'; // Icons for MoWash Preneur

const WhyToBeBanner = () => {

  return (
    <section
      className="relative h-[800px] md:h-[600px] flex items-center justify-center text-black"
      style={{
        backgroundImage: 'url("/images/water.webp")',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <div className="relative max-w-7xl h-full flex flex-col lg:flex-row justify-center items-center text-black px-8 py-6 md:px-16 z-10">
        {/* Left Section: MoWash Engineer */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center mx-auto">
          <h2 className="text-[44px] md:text-4xl font-bold mb-8">Why to be <span className='text-blue-600'>MoWash</span> Engineer</h2>
          <div className="flex justify-center mt-6 items-center gap-x-6">
            <div className='flex flex-col justify-center items-center'>
              <FaMoneyCheckAlt className="text-6xl text-blue-600" />
              <p className='text-center text-sm mt-2'>Regular payout with exciting bonuses & Incentives</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <FaClock className="text-6xl text-blue-600" />
              <p className='text-center text-sm mt-2'>Flexibility to work in your choice of shift</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <FaHeart className="text-6xl text-blue-600" />
              <p className='text-center text-sm mt-2'>Insurance of Rs 5 Lac for you and your family</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <FaBaby className="text-6xl text-blue-600" />
              <p className='text-center text-sm mt-2'>Maternity and period leave for women partners</p>
            </div>
          </div>
        </div>

        {/* Vertical Separator */}
        <div className="hidden md:block h-[350px] w-[2px] bg-black mx-8"></div>

        {/* Right Section: MoWash Preneur */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center mx-auto">
          <h2 className="text-[44px] md:text-4xl font-bold mb-8">Why to be <span className='text-blue-600'>MoWash</span> Preneur</h2>
          <div className="flex justify-center mt-6 items-center gap-x-6">
            <div className='flex flex-col justify-center items-center'>
              <FiMonitor className="text-6xl text-blue-600" />
              <p className='text-center text-sm mt-2'>Robust Incubation</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <FiTrendingUp className="text-6xl text-blue-600" />
              <p className='text-center text-sm mt-2'>Hi-Tech Innovation</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <FiGlobe className="text-6xl text-blue-600" />
              <p className='text-center text-sm mt-2'>Sustainable Business Model</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <FiUsers className="text-6xl text-blue-600" />
              <p className='text-center text-sm mt-2'>Empathetic Entrepreneurs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyToBeBanner;
