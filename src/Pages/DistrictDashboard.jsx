import React, { useState } from "react";

const districtsData = [
  {
    name: "ANGUL",
    jobsCompleted: "350",
    totalRevenue: "250,000",
    totalWorkers: "200",
    totalIncome: "250,000",
  },
  {
    name: "BHADRAK",
    jobsCompleted: "300",
    totalRevenue: "200,000",
    totalWorkers: "150",
    totalIncome: "200,000",
  },
  {
    name: "GANJAM",
    jobsCompleted: "450",
    totalRevenue: "300,000",
    totalWorkers: "225",
    totalIncome: "275,000",
  },
  {
    name: "JAJPUR",
    jobsCompleted: "325",
    totalRevenue: "225,000",
    totalWorkers: "176",
    totalIncome: "200,000",
  },
  {
    name: "JHARSUGUDA",
    jobsCompleted: "250",
    totalRevenue: "175,000",
    totalWorkers: "126",
    totalIncome: "150,000",
  },
  {
    name: "KALAHANDI",
    jobsCompleted: "275",
    totalRevenue: "200,000",
    totalWorkers: "150",
    totalIncome: "175,000",
  },
  {
    name: "KANDHAMAL",
    jobsCompleted: "200",
    totalRevenue: "125,000",
    totalWorkers: "100",
    totalIncome: "125,000",
  },
  {
    name: "KORAPUT",
    jobsCompleted: "225",
    totalRevenue: "150,000",
    totalWorkers: "125",
    totalIncome: "150,000",
  },
  {
    name: "MALKANGIRI",
    jobsCompleted: "150",
    totalRevenue: "100,000",
    totalWorkers: "75",
    totalIncome: "100,000",
  },
  {
    name: "NAYAGARH",
    jobsCompleted: "275",
    totalRevenue: "175,000",
    totalWorkers: "125",
    totalIncome: "150,000",
  },
  {
    name: "NUAPADA",
    jobsCompleted: "100",
    totalRevenue: "75,000",
    totalWorkers: "50",
    totalIncome: "75,000",
  },
  {
    name: "RAYAGADA",
    jobsCompleted: "200",
    totalRevenue: "125,000",
    totalWorkers: "100",
    totalIncome: "125,000",
  },
  {
    name: "SAMBALPUR",
    jobsCompleted: "350",
    totalRevenue: "225,000",
    totalWorkers: "176",
    totalIncome: "200,000",
  },
  {
    name: "SUNDARGARH",
    jobsCompleted: "350",
    totalRevenue: "250,000",
    totalWorkers: "200",
    totalIncome: "250,000",
  },
];

const DistrictDashboard = () => {
  const [activeTab, setActiveTab] = useState("jobs"); // State to track active tab

  // Helper function to calculate total for jobs/revenue or workers/income
  const calculateTotal = (key) => {
    return districtsData.reduce((total, district) => {
      const value = parseFloat(district[key].replace(/[^\d.]/g, ""));
      return total + value;
    }, 0);
  };

  const totalJobs = calculateTotal("jobsCompleted").toFixed(2) + "";
  const totalRevenue = calculateTotal("totalRevenue").toFixed(2) + "";
  const totalWorkers = calculateTotal("totalWorkers").toFixed(2) + "";
  const totalIncome = calculateTotal("totalIncome").toFixed(2) + "";

  return (
    <div className="p-8 bg-transparent text-white min-h-screen">
      <div className="text-2xl font-bold mb-4 flex justify-between">
        <span>Districts of Odisha</span>
        {/* Display total count on the top-right */}
        {activeTab === "jobs" ? (
          <div className="text-right">
            <p className="text-5xl font-extrabold">{totalJobs}</p>
            <p className="text-sm">Total Jobs Completed</p>
            <p className="text-5xl font-extrabold mt-2">{totalRevenue}</p>
            <p className="text-sm">Total Revenue (₹)</p>
          </div>
        ) : (
          <div className="text-right">
            <p className="text-5xl font-extrabold">{totalWorkers}</p>
            <p className="text-sm">Total Workers</p>
            <p className="text-5xl font-extrabold mt-2">{totalIncome}</p>
            <p className="text-sm">Total Income (₹)</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-4 py-2 mr-2 font-bold ${
            activeTab === "jobs" ? "bg-blue-700" : "bg-blue-500"
          }`}
        >
          Jobs & Revenue
        </button>
        <button
          onClick={() => setActiveTab("workers")}
          className={`px-4 py-2 font-bold ${
            activeTab === "workers" ? "bg-blue-700" : "bg-blue-500"
          }`}
        >
          Workers & Income
        </button>
      </div>

      {/* Content based on selected tab */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {districtsData.map((district, index) => (
          <div
            key={index}
            className="bg-blue-800 p-4 rounded-md shadow-md hover:bg-blue-700 transition-colors"
          >
            <h2 className="text-lg font-semibold">{district.name}</h2>

            {/* Render data based on active tab */}
            {activeTab === "jobs" ? (
              <div className="flex justify-between">
                <div>
                  <p className="mt-2 text-sm">Jobs Completed (no.)</p>
                  <p className="text-2xl font-bold">{district.jobsCompleted}</p>
                </div>
                <div>
                  <p className="mt-2 text-sm">Total Revenue (₹)</p>
                  <p className="text-2xl font-bold">{district.totalRevenue}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <p className="mt-2 text-sm">Total Workers (no.)</p>
                  <p className="text-2xl font-bold">{district.totalWorkers}</p>
                </div>
                <div>
                  <p className="mt-2 text-sm">Total Income (₹)</p>
                  <p className="text-2xl font-bold">{district.totalIncome}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistrictDashboard;
