// import React from "react";

// const franchiseData = [
//   {
//     id: 1,
//     franchise: "Mumbai Central",
//     type: "City Franchise",
//     region: "Mumbai",
//     sales: "₹12.5L",
//     commission: "₹3.75L",
//     status: "Active",
//   },
//   {
//     id: 2,
//     franchise: "Delhi NCR",
//     type: "State Franchise",
//     region: "Delhi",
//     sales: "₹18.2L",
//     commission: "₹5.46L",
//     status: "Active",
//   },
//   {
//     id: 3,
//     franchise: "Bangalore South",
//     type: "District Franchise",
//     region: "Bangalore",
//     sales: "₹9.8L",
//     commission: "₹2.94L",
//     status: "Active",
//   },
//   {
//     id: 4,
//     franchise: "Pune West",
//     type: "Area Franchise",
//     region: "Pune",
//     sales: "₹6.4L",
//     commission: "₹1.92L",
//     status: "Active",
//   },
//   {
//     id: 5,
//     franchise: "Hyderabad East",
//     type: "Area Franchise",
//     region: "Hyderabad",
//     sales: "₹5.2L",
//     commission: "₹1.56L",
//     status: "Pending",
//   },
// ];

// function FranchisePerformance() {
//   return (
//     <div className="mt-10 bg-white shadow-sm border border-gray-200 rounded-xl p-5">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-semibold">Franchise Performance</h2>
//         <button className="text-sm text-blue-600 hover:underline">
//           View All
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse text-sm">
//           <thead>
//             <tr className="bg-gray-100 text-gray-600">
//               <th className="text-left p-3 font-medium">Franchise</th>
//               <th className="text-left p-3 font-medium">Type</th>
//               <th className="text-left p-3 font-medium">Region</th>
//               <th className="text-left p-3 font-medium">Sales</th>
//               <th className="text-left p-3 font-medium">Commission</th>
//               <th className="text-left p-3 font-medium">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {franchiseData.map((row) => (
//               <tr key={row.id} className="border-b hover:bg-gray-50 transition">
//                 <td className="p-3">{row.franchise}</td>
//                 <td className="p-3 text-gray-600">{row.type}</td>
//                 <td className="p-3 text-gray-600">{row.region}</td>
//                 <td className="p-3 font-semibold">{row.sales}</td>
//                 <td className="p-3 font-semibold">{row.commission}</td>

//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-medium ${
//                       row.status === "Active"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {row.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default FranchisePerformance;

import React, { useState } from "react";
import {
  FiMapPin,
  FiTrendingUp,
  FiDollarSign,
  FiFilter,
  FiMoreHorizontal,
} from "react-icons/fi";

const franchiseData = [
  {
    id: 1,
    franchise: "Mumbai Central",
    type: "City Franchise",
    region: "Mumbai",
    sales: "₹12.5L",
    commission: "₹3.75L",
    status: "Active",
    growth: 12.5,
    performance: 85,
    manager: "Rajesh Kumar",
  },
  {
    id: 2,
    franchise: "Delhi NCR",
    type: "State Franchise",
    region: "Delhi",
    sales: "₹18.2L",
    commission: "₹5.46L",
    status: "Active",
    growth: 18.2,
    performance: 92,
    manager: "Anita Sharma",
  },
  {
    id: 3,
    franchise: "Bangalore South",
    type: "District Franchise",
    region: "Bangalore",
    sales: "₹9.8L",
    commission: "₹2.94L",
    status: "Active",
    growth: 9.8,
    performance: 78,
    manager: "Vikram Singh",
  },
  {
    id: 4,
    franchise: "Pune West",
    type: "Area Franchise",
    region: "Pune",
    sales: "₹6.4L",
    commission: "₹1.92L",
    status: "Active",
    growth: 6.4,
    performance: 65,
    manager: "Priya Nair",
  },
  {
    id: 5,
    franchise: "Hyderabad East",
    type: "Area Franchise",
    region: "Hyderabad",
    sales: "₹5.2L",
    commission: "₹1.56L",
    status: "Pending",
    growth: 5.2,
    performance: 45,
    manager: "Amit Reddy",
  },
];

function FranchisePerformance() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("performance");

  const filteredData = franchiseData
    .filter(
      (franchise) => filterStatus === "All" || franchise.status === filterStatus
    )
    .sort((a, b) => {
      if (sortBy === "performance") return b.performance - a.performance;
      if (sortBy === "sales")
        return (
          parseFloat(b.sales.replace(/[₹L]/g, "")) -
          parseFloat(a.sales.replace(/[₹L]/g, ""))
        );
      if (sortBy === "growth") return b.growth - a.growth;
      return 0;
    });

  const getPerformanceColor = (performance) => {
    if (performance >= 80) return "bg-green-500";
    if (performance >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusConfig = (status) => {
    return (
      {
        Active: {
          bg: "bg-green-100",
          text: "text-green-700",
          border: "border-green-200",
          icon: (
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
          ),
        },
        Pending: {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          border: "border-yellow-200",
          icon: (
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1.5"></div>
          ),
        },
        Inactive: {
          bg: "bg-gray-100",
          text: "text-gray-700",
          border: "border-gray-200",
          icon: <div className="w-2 h-2 bg-gray-500 rounded-full mr-1.5"></div>,
        },
      }[status] || {
        bg: "bg-gray-100",
        text: "text-gray-700",
        border: "border-gray-200",
        icon: <div className="w-2 h-2 bg-gray-500 rounded-full mr-1.5"></div>,
      }
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FiMapPin className="text-blue-600 mr-2 text-xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Franchise Performance
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Track and manage franchise performance
              </p>
            </div>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            View All Franchises
          </button>
        </div>
      </div>

      {/* Filters and Sort Options */}
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500" />
          <select
            className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="performance">Performance</option>
            <option value="sales">Sales</option>
            <option value="growth">Growth</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Franchise
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Manager
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commission
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((franchise) => {
              const statusConfig = getStatusConfig(franchise.status);

              return (
                <tr
                  key={franchise.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {franchise.franchise}
                      </div>
                      <div className="text-sm text-gray-500">
                        {franchise.region}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {franchise.type}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {franchise.manager}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-900">
                      {franchise.sales}
                    </div>
                    <div className="text-xs text-green-600 flex items-center">
                      <FiTrendingUp className="mr-1" />
                      {franchise.growth}%
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-gray-900">
                    {franchise.commission}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${getPerformanceColor(
                            franchise.performance
                          )}`}
                          style={{ width: `${franchise.performance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {franchise.performance}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                    >
                      {statusConfig.icon}
                      {franchise.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <FiMoreHorizontal />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">{filteredData.length}</span> of{" "}
          <span className="font-medium">{franchiseData.length}</span> franchises
        </div>
        <div className="flex gap-1">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">
            1
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default FranchisePerformance;
