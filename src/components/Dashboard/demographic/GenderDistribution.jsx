import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { FaMale, FaFemale, FaGenderless } from 'react-icons/fa'; // Icons for male and female

// Custom colors for the pie charts
const COLORS = ['#0088FE', '#FF69B4', '#FF69Bg'];

const GenderDistribution = () => {
  // Data for gender distribution
  const genderData = [48, 46, 6];  // Male: 51%, Female: 49%
  const genderLabels = ['Male', 'Female', 'Others'];

  // Gender data for icons and percentages
  const genderIconData = [
    { label: 'Male', value: 48, color: '#0088FE', icon: <FaMale size={30} className="text-blue-600" /> },
    { label: 'Female', value: 46, color: '#FF69B4', icon: <FaFemale size={30} className="text-pink-500" /> },
    { label: 'Others', value: 6, color: '#FF69Bg', icon: <FaGenderless size={30} className="text-[#FF69Bg]" /> },
  ];

  return (
    <div className="w-full ring-2 ring-white rounded-md flex flex-col justify-center items-center p-6 bg-transparent text-white">
      <h1 className='text-xl font-bold text-left'>Gender</h1>
      {/* Pie chart for gender distribution */}
      <div className="flex items-center">
        <PieChart width={250} height={350}>
          <Pie
            data={genderData.map((value, index) => ({
              name: genderLabels[index],
              value: value,
            }))}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {genderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Icons and values for gender distribution */}
        <div className="ml-8 flex flex-col justify-center">
          {genderIconData.map((gender, index) => (
            <div key={index} className="flex items-center mb-4">
              {/* Icon */}
              <div className="mr-4">
                {gender.icon}
              </div>

              {/* Label and Percentage */}
              <div className="flex flex-col">
                <span className="text-lg font-semibold" style={{ color: gender.color }}>
                  {gender.label}
                </span>
                <span className="text-lg">
                  {gender.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenderDistribution;
