// import React from "react";

// // Status badge classes

// const statusClasses = {
//   Delivered: "bg-green-100 text-green-700",
//   Processing: "bg-blue-100 text-blue-700",
//   Pending: "bg-yellow-100 text-yellow-700",
// };

// const recentOrders = [
//   {
//     id: "#ORD-2847",
//     customer: "Rahul Sharma",
//     amount: "₹2,499",
//     status: "Delivered",
//   },
//   {
//     id: "#ORD-2846",
//     customer: "Priya Patel",
//     amount: "₹1,899",
//     status: "Processing",
//   },
//   {
//     id: "#ORD-2845",
//     customer: "Amit Kumar",
//     amount: "₹3,299",
//     status: "Pending",
//   },
//   {
//     id: "#ORD-2844",
//     customer: "Sneha Singh",
//     amount: "₹1,599",
//     status: "Delivered",
//   },
//   {
//     id: "#ORD-2843",
//     customer: "Vikram Mehta",
//     amount: "₹4,199",
//     status: "Processing",
//   },
// ];

// function RecentOrders() {
//   return (
//     <div className="mt-10 bg-white shadow-sm border border-gray-200 rounded-xl p-5">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-semibold">Recent Orders</h2>
//         <button className="text-sm text-blue-600 hover:underline">
//           View All
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="text-left text-gray-600 border-b">
//               <th className="py-2">Order ID</th>
//               <th className="py-2">Customer</th>
//               <th className="py-2">Amount</th>
//               <th className="py-2">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {recentOrders.map((order) => (
//               <tr
//                 key={order.id}
//                 className="border-b hover:bg-gray-50 transition"
//               >
//                 <td className="py-3 font-medium">{order.id}</td>
//                 <td className="py-3">{order.customer}</td>
//                 <td className="py-3 font-medium">{order.amount}</td>
//                 <td className="py-3">
//                   <span
//                     className={`px-3 py-1 text-xs rounded-full font-medium ${
//                       statusClasses[order.status]
//                     }`}
//                   >
//                     {order.status}
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

// export default RecentOrders;

import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiRefreshCw,
} from "react-icons/fi";

// Status badge classes with icons
const statusConfig = {
  Delivered: {
    class: "bg-green-100 text-green-700 border-green-200",
    icon: <FiCheckCircle className="mr-1" />,
  },
  Processing: {
    class: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <FiRefreshCw className="mr-1" />,
  },
  Pending: {
    class: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: <FiClock className="mr-1" />,
  },
};

const recentOrders = [
  {
    id: "#ORD-2847",
    customer: "Rahul Sharma",
    amount: "₹2,499",
    status: "Delivered",
    date: "2023-10-15",
    items: 3,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "#ORD-2846",
    customer: "Priya Patel",
    amount: "₹1,899",
    status: "Processing",
    date: "2023-10-15",
    items: 2,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "#ORD-2845",
    customer: "Amit Kumar",
    amount: "₹3,299",
    status: "Pending",
    date: "2023-10-14",
    items: 5,
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: "#ORD-2844",
    customer: "Sneha Singh",
    amount: "₹1,599",
    status: "Delivered",
    date: "2023-10-14",
    items: 1,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "#ORD-2843",
    customer: "Vikram Mehta",
    amount: "₹4,199",
    status: "Processing",
    date: "2023-10-13",
    items: 4,
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

function RecentOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredOrders = recentOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <FiPackage className="text-blue-600 mr-2 text-xl" />
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Orders
            </h2>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            View All Orders
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              className="appearance-none block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Processing">Processing</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
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
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {order.id}
                      </div>
                      <div className="ml-2 text-xs text-gray-500">
                        {order.items} {order.items === 1 ? "item" : "items"}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={order.avatar}
                          alt={order.customer}
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(order.date)}
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {order.amount}
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                        statusConfig[order.status].class
                      }`}
                    >
                      {statusConfig[order.status].icon}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <FiMoreVertical />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-5 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No orders found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search or filter
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">{filteredOrders.length}</span> of{" "}
          <span className="font-medium">{recentOrders.length}</span> results
        </div>
        <div className="flex gap-1">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">
            1
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecentOrders;
