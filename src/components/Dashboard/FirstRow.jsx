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

// Sample data for the bar graph (Revenue over the last 12 months)
const data = [
  { month: "J", revenue: 100000.00 },
  { month: "F", revenue: 120000.00 },
  { month: "M", revenue: 133333.33 },
  { month: "A", revenue: 146666.67 },
  { month: "M", revenue: 180000.00 },
  { month: "J", revenue: 200000.00 },
  { month: "J", revenue: 233333.33 },
  { month: "A", revenue: 213333.33 },
  { month: "S", revenue: 193333.33 },
  { month: "O", revenue: 206666.67 },
  { month: "N", revenue: 160000.00 },
  { month: "D", revenue: 126666.67 },
];



const cardData = [
  {
    title: "Total MoWash Engineers",
    value: "657",
    subText: "Total Households Benefitted",
    subValue: "650",
    backgroundColor: "bg-blue-900",
  },
  {
    title: "Total MoWash Users",
    value: "813",
    subText: "Households Covered",
    subValue: "800",
    backgroundColor: "bg-blue-800",
  },
  {
    title: "Total Jobs Executed",
    value: "3500",
    subText: "Govt.",
    subValue: "0",
    additionalText: "Private",
    additionalValue: "3500",
    backgroundColor: "bg-blue-600",
  },
  {
    title: "Total Revenue Generated",
    value: "₹ 11,00,000",
    chart: true,
    backgroundColor: "bg-blue-500",
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-black p-2 rounded shadow-lg">
        <p>{`₹ ${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

const yAxisTickFormatter = (value) => `${value}`;

const FirstRow = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg ${card.backgroundColor} text-white ${
            card.chart ? "lg:col-span-2" : ""
          }`} // Make the card with the chart span 2 columns
        >
          <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
          <p className="text-2xl font-bold mb-2">{card.value}</p>

          {card.subText && (
            <>
              <hr className="border-white my-2" />
              <p className="text-sm text-gray-300">{card.subText}</p>
              <p className="font-bold">{card.subValue}</p>
            </>
          )}

          {card.additionalText && (
            <>
              <p className="text-sm text-gray-300">{card.additionalText}</p>
              <p className="font-bold">{card.additionalValue}</p>
            </>
          )}

          {card.chart && (
            <div className="mt-4">
              <hr className="border-white my-2" />
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={data}>
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
                    tickFormatter={yAxisTickFormatter}
                    tick={{
                      fontSize: 10, // Font size increased for better visibility
                      fill: "#FFF", // White color for the labels
                      fontWeight: "bold", // Make the labels bold
                    }}
                    tickLine={false} // Remove tick lines for a cleaner look
                    axisLine={false} // Remove the axis line for a clean design
                    width={20}
                    domain={[0, 400]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" fill="#FFA500" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs mt-2">Showing result of 2024</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FirstRow;
