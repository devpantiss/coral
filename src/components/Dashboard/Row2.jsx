import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const barData = [
    { range: "0-25K", count: 368730 },
    { range: "25-50K", count: 110592 },
    { range: "50K-1Lakh", count: 55169 },
    { range: "1-2 Lakhs", count: 38853 },
    { range: "2-3 Lakhs", count: 16848 },
    { range: "3-4 Lakhs", count: 8249 },
    { range: "4-5 Lakhs", count: 13107 },
    { range: "5+ Lakhs", count: 2672 },
];

const analysisData = {
    government: {
        department: "Out Patient Department (OPD)",
        value: "27.03 Cr.",
        items: [
            { name: "In Patient Department (IPD)", count: "1.45 Cr." },
            { name: "Operation Minor", count: "52.56 Lakhs" },
            { name: "Institutional Delivery", count: "23.65 Lakhs" },
        ],
    },
    private: {
        department: "General Medicine",
        value: "7,74,144",
        items: [
            { name: "Ophthalmology", count: "6,53,083" },
            { name: "Obstetrics and Gynecology", count: "2,97,825" },
            { name: "General Surgery", count: "2,67,146" },
        ],
    },
};

const hospitalData = {
    government: {
        topHospital: "SCB Medical College",
        value: "76.58 Lakhs",
        hospitals: [
            { name: "CAPITAL HOSPITAL", type: "District Hospital", count: "67.66 Lakhs" },
            { name: "MUNICIPALITY HOSPITAL, BBSR", type: "Community Health Center", count: "15.43 Lakhs" },
            { name: "Anandapur SDH", type: "Sub-District Hospital", count: "12.56 Lakhs" },
        ],
    },
    private: {
        topHospital: "HI-TECH MEDICAL COLLEGE AND HOSPITAL",
        value: "9,326",
        hospitals: [
            { name: "SADGURU HOSPITAL", count: "8,932" },
            { name: "LEPRA SOCIETY MAHANADI NETRA CHIKITALAYA", count: "7,115" },
            { name: "KALINGA INSTITUTE OF MEDICAL SCIENCE", count: "5,228" },
        ],
    },
};

const Row2 = () => {
    const [selectedTab, setSelectedTab] = useState("government");

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const currentAnalysis = analysisData[selectedTab];
    const currentHospitals = hospitalData[selectedTab];

    return (
        <div className="bg-transparent ring-2 ring-white text-white p-4 rounded-lg my-5">
            {/* Tabs */}
            <div className="flex justify-end">
                <button
                    onClick={() => handleTabChange("government")}
                    className={`text-lg px-4 py-2 rounded-t-lg ${
                        selectedTab === "government" ? "bg-blue-800" : "bg-blue-700"
                    }`}
                >
                    Government
                </button>
                <button
                    onClick={() => handleTabChange("private")}
                    className={`text-lg px-4 py-2 rounded-t-lg ${
                        selectedTab === "private" ? "bg-blue-800" : "bg-blue-700"
                    }`}
                >
                    Private
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-x-6">
                {/* Amount Claimed vs Card Holders Count */}
            <div className="bg-blue-900 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Amount Claimed v/s Card Holders Count</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" tick={{ fill: "#FFF" }} />
                        <YAxis tick={{ fill: "#FFF" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#B47DFF" />
                    </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center mt-2 space-x-2 text-gray-300">
                    <span>2019</span><span>2020</span><span>2021</span><span>2022</span>
                    <span className="text-yellow-400">2023</span><span>2024</span>
                </div>
            </div>

            {/* Top Analysis */}
            <div className="bg-blue-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Top Analysis</h3>
                <p className="text-orange-500">{currentAnalysis.department}</p>
                <p className="text-3xl font-bold">{currentAnalysis.value}</p>
                <ul className="mt-4 space-y-2">
                    {currentAnalysis.items.map((item, index) => (
                        <li key={index} className="flex justify-between">
                            <span>{item.name}</span>
                            <span className="text-lg font-bold">{item.count}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Top Hospitals */}
            <div className="bg-blue-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Top Hospitals</h3>
                <p className="text-lg font-bold">{currentHospitals.topHospital}</p>
                <p className="text-3xl font-bold text-yellow-400">{currentHospitals.value}</p>
                <ul className="mt-4 space-y-2">
                    {currentHospitals.hospitals.map((hospital, index) => (
                        <li key={index} className="flex justify-between">
                            <span>{hospital.name}</span>
                            <span>{hospital.count}</span>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </div>
    );
};

export default Row2;
