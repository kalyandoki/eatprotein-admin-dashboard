// import { Server, Database, Activity, HardDrive } from "lucide-react";

// export default function SystemHealth() {
//   const checks = [
//     {
//       label: "Server Status",
//       value: "Operational",
//       icon: Server,
//       color: "text-green-600",
//     },
//     {
//       label: "Database",
//       value: "Healthy",
//       icon: Database,
//       color: "text-blue-600",
//     },
//     {
//       label: "API Response",
//       value: "Fast",
//       icon: Activity,
//       color: "text-yellow-600",
//     },
//     {
//       label: "Storage",
//       value: "Used",
//       icon: HardDrive,
//       color: "text-purple-600",
//     },
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
//       {/* Header */}
//       <h2 className="text-xl font-semibold text-gray-900 mb-5">
//         System Health
//       </h2>

//       {/* Items */}
//       <div className="space-y-4">
//         {checks.map((item) => {
//           const Icon = item.icon;
//           return (
//             <div
//               key={item.label}
//               className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-xl hover:bg-gray-100 transition"
//             >
//               {/* Left Side */}
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-white border rounded-lg shadow-sm">
//                   <Icon className={`h-5 w-5 ${item.color}`} />
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">
//                   {item.label}
//                 </span>
//               </div>

//               {/* Right Side */}
//               <span className="text-sm font-semibold text-gray-900">
//                 {item.value}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Server,
  Database,
  Activity,
  HardDrive,
  Wifi,
  Cloud,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Clock,
  Zap,
  Thermometer,
} from "lucide-react";

export default function SystemHealth() {
  const [lastChecked, setLastChecked] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [checks, setChecks] = useState([
    {
      id: "server",
      label: "Server Status",
      value: "Operational",
      icon: Server,
      status: "healthy",
      percentage: 98,
      uptime: "99.9%",
      responseTime: "120ms",
      lastUpdate: "2 mins ago",
    },
    {
      id: "database",
      label: "Database",
      value: "Healthy",
      icon: Database,
      status: "healthy",
      percentage: 75,
      connections: "124/500",
      queryTime: "45ms",
      lastUpdate: "Just now",
    },
    {
      id: "api",
      label: "API Response",
      value: "Optimal",
      icon: Activity,
      status: "warning",
      percentage: 85,
      responseTime: "250ms",
      requests: "1.2k/min",
      lastUpdate: "1 min ago",
    },
    {
      id: "storage",
      label: "Storage",
      value: "Used",
      icon: HardDrive,
      status: "warning",
      percentage: 78,
      used: "780GB / 1TB",
      growth: "+2.3% this week",
      lastUpdate: "5 mins ago",
    },
    {
      id: "network",
      label: "Network",
      value: "Stable",
      icon: Wifi,
      status: "healthy",
      percentage: 92,
      bandwidth: "450Mbps / 500Mbps",
      latency: "12ms",
      lastUpdate: "Just now",
    },
    {
      id: "security",
      label: "Security",
      value: "Protected",
      icon: Shield,
      status: "healthy",
      percentage: 100,
      threats: "0 active threats",
      lastScan: "Completed 2 hours ago",
      lastUpdate: "2 hours ago",
    },
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);

    // Simulate API call to refresh data
    setTimeout(() => {
      setLastChecked(new Date());

      // Update some values to simulate real-time changes
      setChecks((prevChecks) =>
        prevChecks.map((check) => ({
          ...check,
          percentage: Math.min(
            100,
            Math.max(0, check.percentage + (Math.random() * 6 - 3))
          ),
          lastUpdate: "Just now",
        }))
      );

      setIsRefreshing(false);
    }, 1500);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "healthy":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-700",
          iconColor: "text-green-600",
          icon: <CheckCircle className="h-4 w-4" />,
          progressColor: "bg-green-500",
        };
      case "warning":
        return {
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-700",
          iconColor: "text-yellow-600",
          icon: <AlertTriangle className="h-4 w-4" />,
          progressColor: "bg-yellow-500",
        };
      case "error":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-700",
          iconColor: "text-red-600",
          icon: <XCircle className="h-4 w-4" />,
          progressColor: "bg-red-500",
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          iconColor: "text-gray-600",
          icon: <Clock className="h-4 w-4" />,
          progressColor: "bg-gray-500",
        };
    }
  };

  const getOverallHealth = () => {
    const healthyCount = checks.filter(
      (check) => check.status === "healthy"
    ).length;
    const totalCount = checks.length;
    const percentage = Math.round((healthyCount / totalCount) * 100);

    if (percentage >= 90)
      return { status: "Excellent", color: "text-green-600", percentage };
    if (percentage >= 70)
      return { status: "Good", color: "text-blue-600", percentage };
    if (percentage >= 50)
      return { status: "Fair", color: "text-yellow-600", percentage };
    return { status: "Poor", color: "text-red-600", percentage };
  };

  const overallHealth = getOverallHealth();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              System Health
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Real-time monitoring of system components
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`p-2 rounded-lg transition-colors ${
              isRefreshing
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100 text-gray-600"
            }`}
            title="Refresh"
          >
            <RefreshCw
              className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        {/* Overall Health Status */}
        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Overall Health
              </p>
              <p className="text-xs text-gray-500">
                Last checked: {lastChecked.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${overallHealth.color}`}>
              {overallHealth.status}
            </p>
            <p className="text-sm text-gray-600">
              {overallHealth.percentage}% operational
            </p>
          </div>
        </div>
      </div>

      {/* System Checks */}
      <div className="p-6 space-y-4">
        {checks.map((check) => {
          const Icon = check.icon;
          const statusConfig = getStatusConfig(check.status);

          return (
            <div
              key={check.id}
              className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
                    <Icon className={`h-5 w-5 ${statusConfig.iconColor}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-800">
                        {check.label}
                      </p>
                      <div
                        className={`flex items-center space-x-1 px-2 py-0.5 rounded-full ${statusConfig.bgColor}`}
                      >
                        {statusConfig.icon}
                        <span
                          className={`text-xs font-medium ${statusConfig.textColor}`}
                        >
                          {check.value}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {check.lastUpdate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>
                    {check.used ||
                      check.connections ||
                      check.bandwidth ||
                      check.requests}
                  </span>
                  <span>{check.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${statusConfig.progressColor} transition-all duration-500`}
                    style={{ width: `${check.percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  {check.responseTime ||
                    check.queryTime ||
                    check.latency ||
                    check.threats ||
                    check.growth}
                </span>
                <span>{check.uptime || check.queryTime || check.lastScan}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View Detailed Logs
        </button>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Zap className="h-3 w-3" />
          <span>System optimized</span>
        </div>
      </div>
    </div>
  );
}
