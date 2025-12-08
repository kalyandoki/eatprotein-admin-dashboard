// import { Users } from "lucide-react";

// export default function ActiveUsersToday() {
//   const modules = [
//     { name: "Shop", count: 3245 },
//     { name: "Diet", count: 2134 },
//     { name: "Fitness", count: 1987 },
//     { name: "Recipes", count: 1090 },
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold text-gray-900">
//           Active Users Today
//         </h2>
//         <Users className="h-6 w-6 text-blue-600" />
//       </div>

//       {/* Total Count */}
//       <div className="text-4xl font-bold text-gray-900">8,456</div>
//       <p className="text-sm text-gray-500 mb-6">Across all modules</p>

//       {/* Module List */}
//       <div className="grid grid-cols-2 gap-4">
//         {modules.map((m) => (
//           <div
//             key={m.name}
//             className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition"
//           >
//             <h4 className="text-sm font-medium text-gray-700">{m.name}</h4>
//             <p className="text-lg font-bold text-gray-900">{m.count}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  Users,
  TrendingUp,
  Activity,
  BarChart3,
  Calendar,
  Filter,
} from "lucide-react";

export default function ActiveUsersToday() {
  const [timeframe, setTimeframe] = useState("today");
  const [selectedModule, setSelectedModule] = useState(null);

  const modules = [
    {
      name: "Shop",
      count: 3245,
      growth: 12.5,
      color: "blue",
      icon: <BarChart3 className="h-5 w-5" />,
      trend: "up",
    },
    {
      name: "Diet",
      count: 2134,
      growth: 8.3,
      color: "green",
      icon: <Activity className="h-5 w-5" />,
      trend: "up",
    },
    {
      name: "Fitness",
      count: 1987,
      growth: -2.1,
      color: "purple",
      icon: <TrendingUp className="h-5 w-5" />,
      trend: "down",
    },
    {
      name: "Recipes",
      count: 1090,
      growth: 5.7,
      color: "orange",
      icon: <Activity className="h-5 w-5" />,
      trend: "up",
    },
  ];

  const totalUsers = modules.reduce((sum, module) => sum + module.count, 0);
  const avgGrowth =
    modules.reduce((sum, module) => sum + module.growth, 0) / modules.length;

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        border: "border-blue-200",
        light: "bg-blue-50",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-600",
        border: "border-green-200",
        light: "bg-green-50",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        border: "border-purple-200",
        light: "bg-purple-50",
      },
      orange: {
        bg: "bg-orange-100",
        text: "text-orange-600",
        border: "border-orange-200",
        light: "bg-orange-50",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Active Users
            </h2>
            <p className="text-sm text-gray-500">
              Real-time user activity across modules
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                timeframe === "today"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setTimeframe("today")}
            >
              Today
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                timeframe === "week"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setTimeframe("week")}
            >
              Week
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                timeframe === "month"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setTimeframe("month")}
            >
              Month
            </button>
          </div>
        </div>

        {/* Total Count */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-4xl font-bold text-gray-900">
              {totalUsers.toLocaleString()}
            </div>
            <div className="flex items-center mt-1">
              <span
                className={`text-sm font-medium ${
                  avgGrowth > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {avgGrowth > 0 ? "+" : ""}
                {avgGrowth.toFixed(1)}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {timeframe === "today"
                ? "Today"
                : timeframe === "week"
                ? "This week"
                : "This month"}
            </span>
          </div>
        </div>
      </div>

      {/* Module List */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {modules.map((module) => {
            const colors = getColorClasses(module.color);
            const isSelected = selectedModule === module.name;

            return (
              <div
                key={module.name}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? `${colors.bg} ${colors.border} border-2`
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() =>
                  setSelectedModule(isSelected ? null : module.name)
                }
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg ${colors.light} ${colors.text}`}
                  >
                    {module.icon}
                  </div>
                  <div
                    className={`flex items-center text-xs font-medium ${
                      module.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {module.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                    )}
                    {Math.abs(module.growth)}%
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  {module.name}
                </h4>
                <p className="text-xl font-bold text-gray-900">
                  {module.count.toLocaleString()}
                </p>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Peak hours</span>
                      <span>2PM - 4PM</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Avg. session</span>
                      <span>12 min</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Chart Placeholder */}
        {/* <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">
              Activity Trend
            </h3>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              View Details
            </button>
          </div>
          <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-gray-400 text-sm">
              Activity chart would go here
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
