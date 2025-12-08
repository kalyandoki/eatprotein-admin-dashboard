// import React from "react";
// import {
//   FaShoppingCart,
//   FaHeartbeat,
//   FaUserFriends,
//   FaPizzaSlice,
//   FaStoreAlt,
//   FaNetworkWired,
//   FaRupeeSign,
//   FaClock,
// } from "react-icons/fa";

// const kpis = [
//   {
//     id: "k1",
//     growth: "+12.5%",
//     title: "Total Orders",
//     value: "2,847",
//     module: "Shop Module",
//     icon: <FaShoppingCart className="text-3xl text-blue-600" />,
//   },
//   {
//     id: "k2",
//     growth: "+8.2%",
//     title: "Active Diet Plans",
//     value: "1,234",
//     module: "Diet Module",
//     icon: <FaHeartbeat className="text-3xl text-green-600" />,
//   },
//   {
//     id: "k3",
//     growth: "+15.3%",
//     title: "FitPass Users",
//     value: "3,456",
//     module: "Fitness Module",
//     icon: <FaUserFriends className="text-3xl text-purple-600" />,
//   },
//   {
//     id: "k4",
//     growth: "+6.7%",
//     title: "Recipe Creators",
//     value: "567",
//     module: "Recipes Module",
//     icon: <FaPizzaSlice className="text-3xl text-orange-600" />,
//   },
//   {
//     id: "k5",
//     growth: "+4.1%",
//     title: "Total Stores",
//     value: "89",
//     module: "Store Management",
//     icon: <FaStoreAlt className="text-3xl text-blue-500" />,
//   },
//   {
//     id: "k6",
//     growth: "+9.8%",
//     title: "Franchise Points",
//     value: "34",
//     module: "Franchise Network",
//     icon: <FaNetworkWired className="text-3xl text-indigo-600" />,
//   },
//   {
//     id: "k7",
//     growth: "+18.4%",
//     title: "Total Revenue",
//     value: "₹45.8L",
//     module: "This Month",
//     icon: <FaRupeeSign className="text-3xl text-green-700" />,
//   },
//   {
//     id: "k8",
//     growth: "Pending",
//     title: "Pending Payouts",
//     value: "₹12.3L",
//     module: "Across All Modules",
//     icon: <FaClock className="text-3xl text-yellow-500" />,
//   },
// ];

// function KPI() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//       {kpis.map((kpi) => (
//         <div
//           key={kpi.id}
//           className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
//         >
//           <div className="flex justify-center mb-3">{kpi.icon}</div>
//           <div
//             className={`text-sm font-semibold mb-1 ${
//               kpi.growth.includes("+")
//                 ? "text-green-600"
//                 : kpi.growth === "Pending"
//                 ? "text-orange-500"
//                 : "text-red-600"
//             }`}
//           >
//             {kpi.growth}
//           </div>
//           <div className="text-gray-600 text-sm mb-1">{kpi.title}</div>
//           <div className="text-2xl font-bold mb-1">{kpi.value}</div>
//           <div className="text-xs text-gray-500">{kpi.module}</div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default KPI;

import React from "react";
import {
  FaShoppingCart,
  FaHeartbeat,
  FaUserFriends,
  FaPizzaSlice,
  FaStoreAlt,
  FaNetworkWired,
  FaRupeeSign,
  FaClock,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const kpis = [
  {
    id: "k1",
    growth: "+12.5%",
    title: "Total Orders",
    value: "2,847",
    module: "Shop Module",
    icon: <FaShoppingCart />,
    color: "blue",
  },
  {
    id: "k2",
    growth: "+8.2%",
    title: "Active Diet Plans",
    value: "1,234",
    module: "Diet Module",
    icon: <FaHeartbeat />,
    color: "green",
  },
  {
    id: "k3",
    growth: "+15.3%",
    title: "FitPass Users",
    value: "3,456",
    module: "Fitness Module",
    icon: <FaUserFriends />,
    color: "purple",
  },
  {
    id: "k4",
    growth: "+6.7%",
    title: "Recipe Creators",
    value: "567",
    module: "Recipes Module",
    icon: <FaPizzaSlice />,
    color: "orange",
  },
  {
    id: "k5",
    growth: "+4.1%",
    title: "Total Stores",
    value: "89",
    module: "Store Management",
    icon: <FaStoreAlt />,
    color: "indigo",
  },
  {
    id: "k6",
    growth: "+9.8%",
    title: "Franchise Points",
    value: "34",
    module: "Franchise Network",
    icon: <FaNetworkWired />,
    color: "teal",
  },
  {
    id: "k7",
    growth: "+18.4%",
    title: "Total Revenue",
    value: "₹45.8L",
    module: "This Month",
    icon: <FaRupeeSign />,
    color: "emerald",
  },
  {
    id: "k8",
    growth: "Pending",
    title: "Pending Payouts",
    value: "₹12.3L",
    module: "Across All Modules",
    icon: <FaClock />,
    color: "amber",
  },
];

function KPI() {
  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        iconBg: "bg-blue-100",
        iconText: "text-blue-600",
        border: "border-blue-100",
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        iconBg: "bg-green-100",
        iconText: "text-green-600",
        border: "border-green-100",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        iconBg: "bg-purple-100",
        iconText: "text-purple-600",
        border: "border-purple-100",
      },
      orange: {
        bg: "bg-orange-50",
        text: "text-orange-600",
        iconBg: "bg-orange-100",
        iconText: "text-orange-600",
        border: "border-orange-100",
      },
      indigo: {
        bg: "bg-indigo-50",
        text: "text-indigo-600",
        iconBg: "bg-indigo-100",
        iconText: "text-indigo-600",
        border: "border-indigo-100",
      },
      teal: {
        bg: "bg-teal-50",
        text: "text-teal-600",
        iconBg: "bg-teal-100",
        iconText: "text-teal-600",
        border: "border-teal-100",
      },
      emerald: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        iconBg: "bg-emerald-100",
        iconText: "text-emerald-600",
        border: "border-emerald-100",
      },
      amber: {
        bg: "bg-amber-50",
        text: "text-amber-600",
        iconBg: "bg-amber-100",
        iconText: "text-amber-600",
        border: "border-amber-100",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi) => {
        const colors = getColorClasses(kpi.color);
        const isPositive = kpi.growth.includes("+");
        const isPending = kpi.growth === "Pending";

        return (
          <div
            key={kpi.id}
            className={`${colors.bg} rounded-xl shadow-sm ${colors.border} border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`${colors.iconBg} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <div className={`text-2xl ${colors.iconText}`}>{kpi.icon}</div>
              </div>
              <div className="flex items-center">
                {isPositive && <FaArrowUp className="text-green-500 mr-1" />}
                {!isPositive && !isPending && (
                  <FaArrowDown className="text-red-500 mr-1" />
                )}
                <span
                  className={`text-sm font-semibold ${
                    isPositive
                      ? "text-green-600"
                      : isPending
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {kpi.growth}
                </span>
              </div>
            </div>
            <div className="text-gray-700 text-sm font-medium mb-1">
              {kpi.title}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {kpi.value}
            </div>
            <div className="text-xs text-gray-500">{kpi.module}</div>
          </div>
        );
      })}
    </div>
  );
}

export default KPI;
