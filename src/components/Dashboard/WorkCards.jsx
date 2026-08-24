import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

// Sample data for the bar graph (Revenue over the last 12 months)
const data = [
    { month: 'J', revenue: 150 },
    { month: 'F', revenue: 180 },
    { month: 'M', revenue: 200 },
    { month: 'A', revenue: 220 },
    { month: 'M', revenue: 270 },
    { month: 'J', revenue: 300 },
    { month: 'J', revenue: 350 },
    { month: 'A', revenue: 320 },
    { month: 'S', revenue: 290 },
    { month: 'O', revenue: 310 },
    { month: 'N', revenue: 240 },
    { month: 'D', revenue: 190 },
];

const cardData = [
    {
        title: 'Total Toilets Constructed',
        value: '509',
        subText: 'Retrofitted',
        subValue: '330',
        backgroundColor: 'bg-blue-900',
        chart: true,
    },
    {
        title: 'Total Water Bodies Rejuvenated',
        value: '25',
        subText: 'Water Supplied (MLD)',
        subValue: '1,900 MLD',
        backgroundColor: 'bg-blue-800',
        chart: true,
    },
    {
        title: 'Total Waste Disposed',
        value: '200 Tons',
        subText: 'Recycled',
        subValue: '60 Tons',
        backgroundColor: 'bg-blue-700',
        chart: true,
    },
    {
        title: 'Total Wash Products Sold',
        value: '1200',
        subText: 'Total Revenue',
        subValue: '₹ 10,00,000 Cr.',
        backgroundColor: 'bg-blue-600',
        chart: true,
    },
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white text-black p-2 rounded shadow-lg">
                <p>{`₹ ${payload[0].value.toFixed(2)} Cr.`}</p>
            </div>
        );
    }
    return null;
};

const yAxisTickFormatter = (value) => `${value} Cr.`;

const WorkCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {cardData.map((card, index) => (
                <div key={index} className={`p-4 rounded-lg ${card.backgroundColor} text-white`}>
                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                    <p className="text-2xl font-bold mb-2">{card.value}</p>

                    {card.subText && (
                        <>
                            <hr className="border-white my-2" />
                            <p className="text-sm text-gray-300">{card.subText}</p>
                            <p className="font-bold">{card.subValue}</p>
                        </>
                    )}

                    {card.chart && (
                        <div className="mt-4">
                            <ResponsiveContainer width="100%" height={100}>
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fontSize: 12, fill: '#FFF' }} // Adjust font size and color for X-axis
                                        tickSize={5} // Adjust tick size for better spacing
                                        tickMargin={5} // Adjust margin below the tick for better alignment
                                        axisLine={true} // Remove X-axis line for a cleaner look
                                        tickLine={false} // Remove tick lines
                                    />
                                    <YAxis
                                        tickFormatter={yAxisTickFormatter}
                                        tick={{
                                            fontSize: 10,      // Font size increased for better visibility
                                            fill: '#FFF',       // White color for the labels
                                            fontWeight: 'bold', // Make the labels bold
                                        }}
                                        tickLine={false}      // Remove tick lines for a cleaner look
                                        axisLine={false}      // Remove the axis line for a clean design
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

export default WorkCards;
