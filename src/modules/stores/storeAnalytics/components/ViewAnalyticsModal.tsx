// src/modules/stores/storeAnalytics/components/ViewAnalyticsModal.tsx
import React, { useState } from "react";
import {
  FiX,
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiStar,
  FiTruck,
  FiBarChart2,
  FiCalendar,
} from "react-icons/fi";
import { AnalyticsData } from "../storeAnalyticsSlice";

interface ViewAnalyticsModalProps {
  analytics: AnalyticsData;
  onClose: () => void;
}

export default function ViewAnalyticsModal({
  analytics,
  onClose,
}: ViewAnalyticsModalProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "customers" | "performance"
  >("overview");

  // Calculate percentage changes (mock data for demonstration)
  const revenueChange = Math.floor(Math.random() * 40) - 10; // -10 to 30%
  const ordersChange = Math.floor(Math.random() * 30) - 5; // -5 to 25%
  const customersChange = Math.floor(Math.random() * 20) - 5; // -5 to 15%

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-red-600";
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <FiTrendingUp className="inline mr-1" />
    ) : (
      <FiTrendingDown className="inline mr-1" />
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-700 font-medium">Total Revenue</span>
            <FiDollarSign className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${analytics.totalRevenue.toLocaleString()}
          </div>
          <div className={`text-sm mt-1 ${getChangeColor(revenueChange)}`}>
            {getChangeIcon(revenueChange)}
            {revenueChange >= 0 ? "+" : ""}
            {revenueChange}% from last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-700 font-medium">Total Orders</span>
            <FiShoppingCart className="text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.totalOrders.toLocaleString()}
          </div>
          <div className={`text-sm mt-1 ${getChangeColor(ordersChange)}`}>
            {getChangeIcon(ordersChange)}
            {ordersChange >= 0 ? "+" : ""}
            {ordersChange}% from last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-700 font-medium">Avg Order Value</span>
            <FiBarChart2 className="text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${analytics.averageOrderValue.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500 mt-1">Per order average</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-yellow-700 font-medium">Total Customers</span>
            <FiUsers className="text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.customerMetrics.totalCustomers.toLocaleString()}
          </div>
          <div className={`text-sm mt-1 ${getChangeColor(customersChange)}`}>
            {getChangeIcon(customersChange)}
            {customersChange >= 0 ? "+" : ""}
            {customersChange}% from last month
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 font-medium">
                Customer Satisfaction
              </span>
              <FiStar className="text-yellow-500" />
            </div>
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900 mr-2">
                {analytics.performanceMetrics.customerSatisfaction}%
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`text-sm ${
                      i <
                      Math.floor(
                        analytics.performanceMetrics.customerSatisfaction / 20
                      )
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 font-medium">
                On-Time Delivery
              </span>
              <FiTruck className="text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {analytics.performanceMetrics.onTimeDelivery}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${analytics.performanceMetrics.onTimeDelivery}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 font-medium">
                Order Completion
              </span>
              <FiShoppingCart className="text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {analytics.performanceMetrics.orderCompletionRate}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{
                  width: `${analytics.performanceMetrics.orderCompletionRate}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Top Selling Products
      </h3>
      <div className="space-y-3">
        {analytics.topProducts.map((product, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-500">
                  Quantity: {product.quantity}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">
                  ${product.revenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Revenue</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-700 font-medium">New Customers</span>
            <FiUsers className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.customerMetrics.newCustomers.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {Math.round(
              (analytics.customerMetrics.newCustomers /
                analytics.customerMetrics.totalCustomers) *
                100
            )}
            % of total
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-700 font-medium">
              Returning Customers
            </span>
            <FiUsers className="text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.customerMetrics.returningCustomers.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {Math.round(
              (analytics.customerMetrics.returningCustomers /
                analytics.customerMetrics.totalCustomers) *
                100
            )}
            % of total
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-700 font-medium">Total Customers</span>
            <FiUsers className="text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.customerMetrics.totalCustomers.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 mt-1">All time customers</div>
        </div>
      </div>

      {/* Customer Retention Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Customer Retention</h4>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">New</div>
          <div className="text-sm text-gray-500">Returning</div>
        </div>
        <div className="flex items-center h-8 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full flex items-center justify-center text-white text-xs font-medium"
            style={{
              width: `${
                (analytics.customerMetrics.newCustomers /
                  analytics.customerMetrics.totalCustomers) *
                100
              }%`,
            }}
          >
            {Math.round(
              (analytics.customerMetrics.newCustomers /
                analytics.customerMetrics.totalCustomers) *
                100
            )}
            %
          </div>
          <div
            className="bg-green-500 h-full flex items-center justify-center text-white text-xs font-medium"
            style={{
              width: `${
                (analytics.customerMetrics.returningCustomers /
                  analytics.customerMetrics.totalCustomers) *
                100
              }%`,
            }}
          >
            {Math.round(
              (analytics.customerMetrics.returningCustomers /
                analytics.customerMetrics.totalCustomers) *
                100
            )}
            %
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      {/* Performance Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">
            Delivery Performance
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>On-Time Delivery</span>
                <span className="font-medium">
                  {analytics.performanceMetrics.onTimeDelivery}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${analytics.performanceMetrics.onTimeDelivery}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Early Delivery</span>
                <span className="font-medium">
                  {Math.floor(
                    analytics.performanceMetrics.onTimeDelivery * 0.8
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${
                      analytics.performanceMetrics.onTimeDelivery * 0.8
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Order Quality</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Completion Rate</span>
                <span className="font-medium">
                  {analytics.performanceMetrics.orderCompletionRate}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${analytics.performanceMetrics.orderCompletionRate}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Return Rate</span>
                <span className="font-medium">
                  {Math.floor(
                    (100 - analytics.performanceMetrics.orderCompletionRate) *
                      0.3
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (100 - analytics.performanceMetrics.orderCompletionRate) *
                      0.3
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Satisfaction Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">
          Customer Satisfaction Breakdown
        </h4>
        <div className="space-y-2">
          {[
            { label: "Excellent", value: 30, color: "bg-green-500" },
            { label: "Good", value: 40, color: "bg-blue-500" },
            { label: "Average", value: 20, color: "bg-yellow-500" },
            { label: "Poor", value: 10, color: "bg-red-500" },
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-sm text-gray-600 w-20">{item.label}</span>
              <div className="flex-1 mx-3 bg-gray-200 rounded-full h-4 relative">
                <div
                  className={`${item.color} h-4 rounded-full`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-10 text-right">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FiBarChart2 className="text-xl" />
            {analytics.storeName} Analytics
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          {/* Store Info Header */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {analytics.storeName}
                </h3>
                <p className="text-sm text-gray-500">
                  Store ID: {analytics.storeId}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {[
                { id: "overview", label: "Overview" },
                { id: "products", label: "Top Products" },
                { id: "customers", label: "Customers" },
                { id: "performance", label: "Performance" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "overview" && renderOverview()}
            {activeTab === "products" && renderProducts()}
            {activeTab === "customers" && renderCustomers()}
            {activeTab === "performance" && renderPerformance()}
          </div>
        </div>
      </div>
    </div>
  );
}
