import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

// Trend data for districts (sample)
const generateTrendData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: `Sep-${23 + i % 2}`,
    claims: Math.floor(Math.random() * 50) + 50,
  }));
};

// District data
const districtData = [
  { district: 'Angul', claims: 97423, change: 4082, trend: generateTrendData() },
  { district: 'Bhadrak', claims: 128921, change: 3692, trend: generateTrendData() },
  { district: 'Ganjam', claims: 265179, change: -8887, trend: generateTrendData() },
  { district: 'Jajpur', claims: 219192, change: -7756, trend: generateTrendData() },
  { district: 'Jharsuguda', claims: 5455, change: 392, trend: generateTrendData() },
  { district: 'Kalahandi', claims: 55980, change: -2424, trend: generateTrendData() },
  { district: 'Kandhamal', claims: 9570, change: 0, trend: generateTrendData() },
  { district: 'Koraput', claims: 8937, change: 279, trend: generateTrendData() },
  { district: 'Nuapada', claims: 11137, change: 534, trend: generateTrendData() },
  { district: 'Rayagada', claims: 11942, change: 593, trend: generateTrendData() },
  { district: 'Sundargarh', claims: 130264, change: 5065, trend: generateTrendData() },
];


const DistrictRow = ({ district, claims, change, trend }) => {
  const changeDirection = change > 0 ? '↑' : '↓';
  const changeColor = change > 0 ? 'text-green-400' : 'text-red-400';

  return (
    <tr className="border-b border-gray-700">
      <td className="p-2">{district}</td>
      <td className="p-2 flex items-center space-x-2">
        <span>{claims.toLocaleString()}</span>
        <span className={`${changeColor}`}>
          {changeDirection} {Math.abs(change).toLocaleString()}
        </span>
      </td>
      <td className="p-2">
        <ResponsiveContainer width="100%" height={30}>
          <LineChart data={trend}>
            <Tooltip />
            <Line type="monotone" dataKey="claims" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </td>
    </tr>
  );
};

const ClaimSummaryTable = () => {
  const tableColumns = [
    districtData.slice(0, 4),
    districtData.slice(4, 8),
    districtData.slice(8, 11),
  ];

  return (
    <div className="p-8 bg-transparent mt-4 ring-2 ring-gray-700 rounded-md text-white">
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-600">
        District-Wise Revenue <span className="text-orange-400">11,00,000</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
        {tableColumns.map((column, index) => (
          <div key={index} className="flex-1">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-green-800 text-left">
                  <th className="p-2">District</th>
                  <th className="p-2">Revenue</th>
                  <th className="p-2">Monthly Trend</th>
                </tr>
              </thead>
              <tbody>
                {column.map((district, index) => (
                  <DistrictRow
                    key={index}
                    district={district.district}
                    claims={district.claims}
                    change={district.change}
                    trend={district.trend}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimSummaryTable;
