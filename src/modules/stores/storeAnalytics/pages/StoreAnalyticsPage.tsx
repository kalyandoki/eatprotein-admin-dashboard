// src/modules/shop/storeAnalytics/pages/StoreAnalyticsPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchStoreAnalytics, AnalyticsData } from "../storeAnalyticsSlice";
import {
  FiSearch,
  FiRefreshCw,
  FiTrendingUp,
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiBarChart2,
  FiStar,
  FiTruck,
  FiFilter,
  FiDownload,
  FiEye,
} from "react-icons/fi";
import ViewAnalyticsModal from "../components/ViewAnalyticsModal";
import Pagination from "../../../../components/common/Pagination";

export default function StoreAnalyticsPage() {
  const dispatch = useAppDispatch();
  const { analytics, status } = useAppSelector((state) => state.storeAnalytics);
  const [search, setSearch] = useState("");
  const [selectedAnalytics, setSelectedAnalytics] =
    useState<AnalyticsData | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [performanceFilter, setPerformanceFilter] = useState<string>("all");
  const [revenueFilter, setRevenueFilter] = useState<string>("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    if (status === "idle") dispatch(fetchStoreAnalytics());
  }, [status, dispatch]);

  // Filter analytics based on search and filters
  const filteredAnalytics = analytics.filter((data) => {
    const matchesSearch =
      data.storeName.toLowerCase().includes(search.toLowerCase()) ||
      data.storeId.includes(search);

    let matchesPerformance = true;
    if (performanceFilter === "excellent") {
      matchesPerformance = data.performanceMetrics.customerSatisfaction >= 90;
    } else if (performanceFilter === "good") {
      matchesPerformance =
        data.performanceMetrics.customerSatisfaction >= 80 &&
        data.performanceMetrics.customerSatisfaction < 90;
    } else if (performanceFilter === "average") {
      matchesPerformance = data.performanceMetrics.customerSatisfaction < 80;
    }

    let matchesRevenue = true;
    if (revenueFilter === "high") {
      matchesRevenue = data.totalRevenue > 50000;
    } else if (revenueFilter === "medium") {
      matchesRevenue = data.totalRevenue >= 20000 && data.totalRevenue <= 50000;
    } else if (revenueFilter === "low") {
      matchesRevenue = data.totalRevenue < 20000;
    }

    return matchesSearch && matchesPerformance && matchesRevenue;
  });

  // Calculate pagination values
  const totalItems = filteredAnalytics.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAnalytics = filteredAnalytics.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, performanceFilter, revenueFilter]);

  const handleRefresh = () => {
    dispatch(fetchStoreAnalytics());
  };

  const handleView = (data: AnalyticsData) => {
    setSelectedAnalytics(data);
    setShowViewModal(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 90) return "text-green-600";
    if (rating >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceBgColor = (rating: number) => {
    if (rating >= 90) return "bg-green-100";
    if (rating >= 80) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getRevenueColor = (revenue: number) => {
    if (revenue > 50000) return "text-green-600";
    if (revenue >= 20000) return "text-yellow-600";
    return "text-red-600";
  };

  // Calculate totals
  const totalRevenue = analytics.reduce(
    (sum, data) => sum + data.totalRevenue,
    0
  );
  const totalOrders = analytics.reduce(
    (sum, data) => sum + data.totalOrders,
    0
  );
  const totalCustomers = analytics.reduce(
    (sum, data) => sum + data.customerMetrics.totalCustomers,
    0
  );
  const averageSatisfaction =
    analytics.reduce(
      (sum, data) => sum + data.performanceMetrics.customerSatisfaction,
      0
    ) / analytics.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Store Analytics
              </h1>
              <p className="text-emerald-100 text-lg">
                Performance insights for all stores
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
                title="Refresh"
              >
                <FiRefreshCw className="text-lg" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2">
                <FiDownload className="text-lg" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ${totalRevenue.toFixed(0)}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiDollarSign className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {totalOrders.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiShoppingCart className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Customers
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {totalCustomers.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiUsers className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Avg Satisfaction
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {averageSatisfaction.toFixed(1)}%
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FiStar className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by Store Name or ID..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={performanceFilter}
                  onChange={(e) => setPerformanceFilter(e.target.value)}
                >
                  <option value="all">All Performance</option>
                  <option value="excellent">Excellent (90%+)</option>
                  <option value="good">Good (80-90%)</option>
                  <option value="average">Average (80%)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={revenueFilter}
                  onChange={(e) => setRevenueFilter(e.target.value)}
                >
                  <option value="all">All Revenue</option>
                  <option value="high">High ($50k+)</option>
                  <option value="medium">Medium ($20k-$50k)</option>
                  <option value="low">Low ($20k)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Table */}
        {status === "loading" ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Loading analytics...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Store Analytics ({filteredAnalytics.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Store
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customers
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Satisfaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentAnalytics.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <FiBarChart2 className="h-12 w-12 text-gray-400" />
                          </div>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">
                            {filteredAnalytics.length === 0
                              ? "No analytics found"
                              : "No analytics on this page"}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                            {search
                              ? "Try adjusting your search to find what you're looking for"
                              : filteredAnalytics.length === 0
                              ? "No analytics data available"
                              : "Try a different page"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentAnalytics.map((data) => (
                      <tr
                        key={data.storeId}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {data.storeName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {data.storeId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {data.totalOrders.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-lg font-bold ${getRevenueColor(
                              data.totalRevenue
                            )}`}
                          >
                            ${data.totalRevenue.toFixed(0)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${data.averageOrderValue.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {data.customerMetrics.totalCustomers}
                          </div>
                          <div className="text-xs text-gray-500">
                            {data.customerMetrics.newCustomers} new
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceBgColor(
                                data.performanceMetrics.customerSatisfaction
                              )}`}
                            >
                              {data.performanceMetrics.customerSatisfaction}%
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <FiTruck className="text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {data.performanceMetrics.onTimeDelivery}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleView(data)}
                            className="text-emerald-600 hover:text-emerald-900 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                            title="View Details"
                          >
                            <FiEye className="text-lg" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalItems}
                  perPage={itemsPerPage}
                />
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {showViewModal && selectedAnalytics && (
          <ViewAnalyticsModal
            analytics={selectedAnalytics}
            onClose={() => {
              setSelectedAnalytics(null);
              setShowViewModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
