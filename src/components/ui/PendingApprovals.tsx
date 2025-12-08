// import {
//   Clock,
//   ClipboardCheck,
//   FileCheck2,
//   Dumbbell,
//   BookOpen,
// } from "lucide-react";

// export default function PendingApprovals() {
//   const items = [
//     {
//       title: "Nutritionists",
//       subtitle: "Pending verification",
//       count: 12,
//       icon: ClipboardCheck,
//       color: "text-blue-600",
//     },
//     {
//       title: "Recipes",
//       subtitle: "Awaiting approval",
//       count: 28,
//       icon: BookOpen,
//       color: "text-orange-600",
//     },
//     {
//       title: "Fitness Centres",
//       subtitle: "New applications",
//       count: 7,
//       icon: Dumbbell,
//       color: "text-green-600",
//     },
//     {
//       title: "Lab Reports",
//       subtitle: "Ready to upload",
//       count: 15,
//       icon: FileCheck2,
//       color: "text-purple-600",
//     },
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold text-gray-900">
//           Pending Approvals
//         </h2>
//         <Clock className="h-5 w-5 text-gray-500" />
//       </div>

//       {/* Items List */}
//       <div className="space-y-5">
//         {items.map((item) => {
//           const Icon = item.icon;
//           return (
//             <div
//               key={item.title}
//               className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition"
//             >
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 rounded-lg bg-white shadow-sm border">
//                   <Icon className={`h-5 w-5 ${item.color}`} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-800">
//                     {item.title}
//                   </p>
//                   <p className="text-xs text-gray-500">{item.subtitle}</p>
//                 </div>
//               </div>

//               <span className="text-xl font-bold text-gray-900">
//                 {item.count}
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer */}
//       <p className="text-xs text-gray-500 mt-5 text-right">
//         Last checked: 2 minutes ago
//       </p>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  Clock,
  ClipboardCheck,
  FileCheck2,
  Dumbbell,
  BookOpen,
  AlertCircle,
  ChevronRight,
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function PendingApprovals() {
  const [filter, setFilter] = useState("all");
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const items = [
    {
      id: "nutritionists",
      title: "Nutritionists",
      subtitle: "Pending verification",
      count: 12,
      icon: ClipboardCheck,
      color: "blue",
      urgency: "high",
      avgTime: "24 hours",
      trend: "up",
    },
    {
      id: "recipes",
      title: "Recipes",
      subtitle: "Awaiting approval",
      count: 28,
      icon: BookOpen,
      color: "orange",
      urgency: "medium",
      avgTime: "48 hours",
      trend: "up",
    },
    {
      id: "fitness",
      title: "Fitness Centres",
      subtitle: "New applications",
      count: 7,
      icon: Dumbbell,
      color: "green",
      urgency: "low",
      avgTime: "72 hours",
      trend: "down",
    },
    {
      id: "labs",
      title: "Lab Reports",
      subtitle: "Ready to upload",
      count: 15,
      icon: FileCheck2,
      color: "purple",
      urgency: "medium",
      avgTime: "12 hours",
      trend: "stable",
    },
  ];

  const handleRefresh = () => {
    setLastRefresh(new Date());
    // In a real app, this would trigger a data refresh
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        border: "border-blue-200",
        iconBg: "bg-blue-50",
      },
      orange: {
        bg: "bg-orange-100",
        text: "text-orange-600",
        border: "border-orange-200",
        iconBg: "bg-orange-50",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-600",
        border: "border-green-200",
        iconBg: "bg-green-50",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        border: "border-purple-200",
        iconBg: "bg-purple-50",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  const getUrgencyIndicator = (urgency) => {
    const urgencyMap = {
      high: { color: "text-red-500", bg: "bg-red-100", label: "High" },
      medium: {
        color: "text-yellow-500",
        bg: "bg-yellow-100",
        label: "Medium",
      },
      low: { color: "text-green-500", bg: "bg-green-100", label: "Low" },
    };
    return urgencyMap[urgency] || urgencyMap.medium;
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <span className="text-red-500 text-xs">↑</span>;
      case "down":
        return <span className="text-green-500 text-xs">↓</span>;
      case "stable":
        return <span className="text-gray-500 text-xs">→</span>;
      default:
        return null;
    }
  };

  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.urgency === filter);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Pending Approvals
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Items requiring your attention
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4 text-gray-500" />
            </button>
            <div className="relative">
              <Clock className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-gray-900">{totalCount}</div>
            <div className="text-sm text-gray-500">Total pending items</div>
          </div>
          <div className="text-xs text-gray-500">
            Last checked: {lastRefresh.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex space-x-1">
          <button
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              filter === "all"
                ? "bg-gray-100 text-gray-700 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setFilter("all")}
          >
            All ({totalCount})
          </button>
          <button
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              filter === "high"
                ? "bg-red-100 text-red-700 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setFilter("high")}
          >
            High Priority
          </button>
          <button
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              filter === "medium"
                ? "bg-yellow-100 text-yellow-700 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setFilter("medium")}
          >
            Medium Priority
          </button>
          <button
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              filter === "low"
                ? "bg-green-100 text-green-700 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setFilter("low")}
          >
            Low Priority
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="p-6 space-y-4">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const colors = getColorClasses(item.color);
          const urgency = getUrgencyIndicator(item.urgency);

          return (
            <div
              key={item.id}
              className="group p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-xl ${colors.iconBg} ${colors.border} border`}
                  >
                    <Icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-base font-medium text-gray-800">
                        {item.title}
                      </p>
                      {getTrendIcon(item.trend)}
                    </div>
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          Avg: {item.avgTime}
                        </span>
                      </div>
                      <div
                        className={`flex items-center space-x-1 px-2 py-0.5 rounded-full ${urgency.bg}`}
                      >
                        <AlertCircle className={`h-3 w-3 ${urgency.color}`} />
                        <span
                          className={`text-xs font-medium ${urgency.color}`}
                        >
                          {urgency.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {item.count}
                    </p>
                    <p className="text-xs text-gray-500">items</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All Approvals
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-700">
            Approval Settings
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-xs text-gray-500">Auto-approved: 24 today</span>
        </div>
      </div>
    </div>
  );
}
