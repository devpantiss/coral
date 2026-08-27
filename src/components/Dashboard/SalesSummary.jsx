import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { workforceDistricts } from '../../data/workforceData';

const monthLabels = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

const districtData = workforceDistricts.map((district, districtIndex) => {
  const monthlyChange = [8, -3, 12, 6, -2, 4, 2, -1][districtIndex];
  const trend = monthLabels.map((month, monthIndex) => ({
    month,
    workforce: Math.max(
      0,
      district.total - monthlyChange + Math.round((monthIndex - 10) * monthlyChange * 0.55) + ((districtIndex + monthIndex) % 3 - 1),
    ),
  }));

  trend[trend.length - 1].workforce = district.total;
  return { district: district.name, workforce: district.total, change: monthlyChange, trend };
});


const DistrictRow = ({ district, workforce, change, trend }) => {
  const changeDirection = change > 0 ? '↑' : change < 0 ? '↓' : '—';
  const changeColor = change > 0 ? 'text-green-400' : change < 0 ? 'text-red-400' : 'text-gray-400';

  return (
    <tr className="border-b border-gray-700">
      <td className="p-2">{district}</td>
      <td className="p-2 flex items-center space-x-2">
        <span>{workforce.toLocaleString()}</span>
        <span className={`${changeColor}`}>
          {changeDirection} {change === 0 ? '' : Math.abs(change).toLocaleString()}
        </span>
      </td>
      <td className="p-2">
        <ResponsiveContainer width="100%" height={30}>
          <LineChart data={trend}>
            <Tooltip />
            <Line type="monotone" dataKey="workforce" stroke="#fb923c" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </td>
    </tr>
  );
};

const ClaimSummaryTable = () => {
  const tableColumns = [
    districtData.slice(0, 3),
    districtData.slice(3, 6),
    districtData.slice(6, 8),
  ];

  return (
    <div className="p-8 bg-transparent mt-4 ring-2 ring-gray-700 rounded-md text-white">
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-600">
        District-Wise Active Workforce <span className="text-orange-400">{workforceDistricts.reduce((sum, district) => sum + district.total, 0).toLocaleString('en-IN')}</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
        {tableColumns.map((column, index) => (
          <div key={index} className="flex-1">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-green-800 text-left">
                  <th className="p-2">District</th>
                  <th className="p-2">Active / Change</th>
                  <th className="p-2">12-Month Trend</th>
                </tr>
              </thead>
              <tbody>
                {column.map((district, index) => (
                  <DistrictRow
                    key={index}
                    district={district.district}
                    workforce={district.workforce}
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
