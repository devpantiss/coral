import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for the water bodies rejuvenation graph
const waterData = [
  { type: "Ponds Rejuvenated", count: 532 },
  { type: "New Ponds Excavated", count: 123 },
  { type: "Wetlands Rejuvenated", count: 78 },
  { type: "Creeks Rejuvenated", count: 501 },
];

// Sample data for the waste disposal graph (monthly)
const wasteData = [
  { month: "J", waste: 50 },
  { month: "F", waste: 60 },
  { month: "M", waste: 75 },
  { month: "A", waste: 80 },
  { month: "M", waste: 90 },
  { month: "J", waste: 95 },
  { month: "J", waste: 100 },
  { month: "A", waste: 85 },
  { month: "S", waste: 78 },
  { month: "O", waste: 88 },
  { month: "N", waste: 82 },
  { month: "D", waste: 70 },
];

const workCardData = [
  {
    title: "Total Water Bodies Rejuvenated",
    value: "1,234",
    chartData: waterData, // Reference to the water rejuvenation data
    backgroundColor: "bg-blue-900",
    colSpan: 2,
  },
  {
    title: "Total Toilets Constructed",
    value: "567,890",
    subSections: [
      { label: "Retrofitted Toilets", value: "234,567" },
      { label: "New Toilets Constructed", value: "333,323" },
    ],
    backgroundColor: "bg-blue-800",
    colSpan: 1,
  },
  {
    title: "Total Waste Disposed",
    value: "7,890 Tons",
    chart: true,
    backgroundColor: "bg-blue-700",
    colSpan: 2,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-black p-2 rounded shadow-lg">
        <p>{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const WorkRow = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
      {workCardData.map((card, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg ${card.backgroundColor} text-white lg:col-span-${card.colSpan}`}
        >
          <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
          <p className="text-2xl font-bold mb-2">{card.value}</p>

          {/* Render bar chart for Water Bodies Rejuvenated */}
          {card.chartData && (
            <div className="mt-4">
              <hr className="border-white my-2" />
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={card.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="type"
                    tick={{ fontSize: 12, fill: "#FFF" }} // Adjust font size and color for X-axis
                    tickSize={5} // Adjust tick size for better spacing
                    tickMargin={5} // Adjust margin below the tick for better alignment
                    axisLine={false} // Remove X-axis line for a cleaner look
                    tickLine={false} // Remove tick lines
                  />
                  <YAxis
                    tick={{
                      fontSize: 10,
                      fill: "#FFF",
                      fontWeight: "bold",
                    }}
                    tickLine={false}
                    axisLine={false}
                    width={20}
                    domain={[0, 600]} // Set the domain based on the max value
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#FFA500" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs mt-2">Water bodies rejuvenation data</p>
            </div>
          )}

          {/* Render subsections for other cards */}
          {card.subSections && (
            <>
              <hr className="border-white my-2" />
              {card.subSections.map((section, i) => (
                <div key={i} className="mb-2">
                  <p className="text-sm text-gray-300">{section.label}</p>
                  <p className="font-bold">{section.value}</p>
                </div>
              ))}
            </>
          )}

          {/* Render bar chart for Waste Disposed */}
          {card.chart && (
            <div className="mt-4">
              <hr className="border-white my-2" />
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={wasteData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#FFF" }} // Adjust font size and color for X-axis
                    tickSize={5} // Adjust tick size for better spacing
                    tickMargin={5} // Adjust margin below the tick for better alignment
                    axisLine={true} // Remove X-axis line for a cleaner look
                    tickLine={false} // Remove tick lines
                  />
                  <YAxis
                    tick={{
                      fontSize: 10,
                      fill: "#FFF",
                      fontWeight: "bold",
                    }}
                    tickLine={false}
                    axisLine={false}
                    width={20}
                    domain={[0, 120]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="waste" fill="#FFA500" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs mt-2">Showing waste disposal for 2024</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkRow;
