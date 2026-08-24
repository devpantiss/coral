import React, { useState, useEffect } from "react";

const fetchData = () => {
    // Simulating a call to fetch real-time data, replace with an actual API call
    return Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        district: `District ${index % 10}`,
        block: `Block ${index % 5}`,
        centerName: `Welfare Kendra ${index + 1}`,
        address: `Street ${index + 1}, Area ${index % 20}`,
        providersOnboarded: Math.floor(Math.random() * 100),
        contactPerson: `Person ${index + 1}`,
        contactNumber: `987654${1000 + index}`,
    }));
};

const MoWashWelfareKendra = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [districtFilter, setDistrictFilter] = useState("");
    const [blockFilter, setBlockFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        // Simulate fetching data
        const fetchDataAsync = async () => {
            const result = fetchData();
            setData(result);
        };
        fetchDataAsync();
    }, []);

    const filteredData = data
        .filter((item) =>
            item.centerName.toLowerCase().includes(searchText.toLowerCase())
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
                        placeholder="Name / Address / PIN"
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
                        {/* Populate districts */}
                    </select>
                    <select
                        className="p-2 bg-blue-800 text-white rounded"
                        value={blockFilter}
                        onChange={(e) => setBlockFilter(e.target.value)}
                    >
                        <option value="">Select Block/ULB</option>
                        {/* Populate blocks */}
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
                            <th className="px-4 py-2 text-left">Block/ULB</th>
                            <th className="px-4 py-2 text-left">Kendra Name</th>
                            <th className="px-4 py-2 text-left">Address</th>
                            <th className="px-4 py-2 text-center">Providers Onboarded</th>
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
                                <td className="px-4 py-2">{item.centerName}</td>
                                <td className="px-4 py-2">{item.address}</td>
                                <td className="px-4 py-2 text-center">{item.providersOnboarded}</td>
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

export default MoWashWelfareKendra;
