import React, { useState, useEffect } from "react";

// Mock data function to simulate fetching realistic service provider details
const fetchServiceProviders = () => {
    const districts = [
        "Angul", "Cuttack", "Bhadrak", "Jajapur", "Jharsuguda",
        "Kalahandi", "Kandhamal", "Koraput", "Nuapada", "Sundergarh"
    ];
    const blocks = [
        "Chhatrapur", "Niali", "Balianta", "Pipili", "Nimapara",
        "Tangi", "Jaleswar", "Jujumura", "Attabira", "Sohela"
    ];
    const serviceTypes = [
        "Electrician", "Plumber", "Mason", "Sanitary Worker",
        "Water Supply Engineer", "Solar Technician"
    ];
    const streetNames = [
        "Rajpath", "Kalpana Square", "Janpath", "Chandni Chowk", "Raja Road",
        "Lingaraj Road", "Market Street", "Kharavel Nagar", "Ring Road", "Subhash Marg"
    ];
    const areas = [
        "Old Town", "Civil Lines", "Industrial Estate", "Shanti Nagar", "Krishna Vihar",
        "Ashok Nagar", "Chandrasekharpur", "Khandagiri", "Saheed Nagar", "Jaydev Vihar"
    ];
    const names = [
        "Anil Kumar", "Suman Singh", "Deepak Reddy", "Priya Sharma", "Ravi Patnaik",
        "Arjun Das", "Neha Jaiswal", "Sunita Mohanty", "Amit Mishra", "Rohit Panda",
        "Sanjay Behera", "Sneha Sahu", "Rajeev Swain", "Alok Mahapatra", "Kajal Nayak"
    ];
    const designations = [
        "Field Technician", "Supervisor", "Worker", "Engineer", "Helper"
    ];

    return Array.from({ length: 100 }, (_, index) => {
        const district = districts[index % districts.length];
        const block = blocks[index % blocks.length];
        const serviceType = serviceTypes[index % serviceTypes.length];
        const street = streetNames[index % streetNames.length];
        const area = areas[index % areas.length];
        const onboardedDay = String((index % 28) + 1).padStart(2, '0');
        const providerName = names[index % names.length];
        const designation = designations[index % designations.length];

        return {
            id: index + 1,
            district,
            block,
            providerName: `${providerName} (${designation})`,
            serviceType,
            address: `${street}, ${area}`,
            onboardedDate: `2024-01-${onboardedDay}`,
            contactPerson: `${providerName}`,
            contactNumber: `98765${String(1000 + index).slice(-4)}`,
        };
    });
};

const MoWashServiceProvidersList = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [districtFilter, setDistrictFilter] = useState("");
    const [blockFilter, setBlockFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchDataAsync = async () => {
            const result = fetchServiceProviders();
            setData(result);
        };
        fetchDataAsync();
    }, []);

    const filteredData = data
        .filter((item) =>
            item.providerName.toLowerCase().includes(searchText.toLowerCase())
        )
        .filter(
            (item) =>
                (!districtFilter || item.district === districtFilter) &&
                (!blockFilter || item.block === blockFilter)
        );

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="bg-transparent ring-2 ring-white text-white p-4 rounded-lg">
            {/* Filters */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Provider Name / Address"
                        className="p-2 bg-blue-800 text-white rounded"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <select
                        className="p-2 bg-blue-800 text-white rounded"
                        value={districtFilter}
                        onChange={(e) => setDistrictFilter(e.target.value)}
                    >
                        <option value="">Select District</option>
                        {Array.from(new Set(data.map(item => item.district))).map((district, idx) => (
                            <option key={idx} value={district}>{district}</option>
                        ))}
                    </select>
                    <select
                        className="p-2 bg-blue-800 text-white rounded"
                        value={blockFilter}
                        onChange={(e) => setBlockFilter(e.target.value)}
                    >
                        <option value="">Select Block</option>
                        {Array.from(new Set(data.map(item => item.block))).map((block, idx) => (
                            <option key={idx} value={block}>{block}</option>
                        ))}
                    </select>
                    <button className="p-2 bg-blue-600 rounded">Search</button>
                </div>
            </div>

            {/* Results Info */}
            <p className="mb-4">
                Showing {itemsPerPage * (currentPage - 1) + 1}-
                {Math.min(itemsPerPage * currentPage, filteredData.length)} of{" "}
                {filteredData.length} Results
            </p>

            {/* Responsive Table */}
            <div className="overflow-auto">
                <table className="min-w-full text-sm bg-blue-800 rounded-lg">
                    <thead className="bg-blue-700">
                        <tr>
                            <th className="px-4 py-2 text-left">Sl#</th>
                            <th className="px-4 py-2 text-left">District</th>
                            <th className="px-4 py-2 text-left">Block</th>
                            <th className="px-4 py-2 text-left">Provider Name</th>
                            <th className="px-4 py-2 text-left">Service Type</th>
                            <th className="px-4 py-2 text-left">Address</th>
                            <th className="px-4 py-2 text-center">Onboarded Date</th>
                            <th className="px-4 py-2 text-left">Contact Person</th>
                            <th className="px-4 py-2 text-center">Contact No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr
                                key={item.id}
                                className="border-b border-blue-600 hover:bg-blue-700"
                            >
                                <td className="px-4 py-2">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td className="px-4 py-2">{item.district}</td>
                                <td className="px-4 py-2">{item.block}</td>
                                <td className="px-4 py-2">{item.providerName}</td>
                                <td className="px-4 py-2">{item.serviceType}</td>
                                <td className="px-4 py-2">{item.address}</td>
                                <td className="px-4 py-2 text-center">{item.onboardedDate}</td>
                                <td className="px-4 py-2">{item.contactPerson}</td>
                                <td className="px-4 py-2 text-center">{item.contactNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Responsive Pagination */}
            <div className="overflow-auto mt-4 flex justify-end space-x-1">
                <button
                    onClick={() => setCurrentPage(1)}
                    className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-blue-600" : "bg-blue-800"}`}
                    disabled={currentPage === 1}
                >
                    &lt;&lt;
                </button>
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-blue-800 rounded"
                >
                    &lt;
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-1 rounded ${
                            currentPage === index + 1 ? "bg-blue-600" : "bg-blue-800"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-blue-800 rounded"
                >
                    &gt;
                </button>
                <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-blue-600" : "bg-blue-800"}`}
                    disabled={currentPage === totalPages}
                >
                    &gt;&gt;
                </button>
            </div>
        </div>
    );
};

export default MoWashServiceProvidersList;
