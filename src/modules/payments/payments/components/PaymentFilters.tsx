// src/modules/payments/components/PaymentFilters.tsx
import React from "react";
import {
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiX,
  FiRefreshCw,
  FiFilter,
} from "react-icons/fi";

interface PaymentFiltersProps {
  filters: {
    month: string;
    fromDate: string;
    toDate: string;
    location: string;
    search: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      month: string;
      fromDate: string;
      toDate: string;
      location: string;
      search: string;
    }>
  >;
}

export default function PaymentFilters({
  filters,
  setFilters,
}: PaymentFiltersProps) {
  // Get unique store names for location filter
  const storeNames = [
    "Madhina Chicken & Mutton Center",
    "Rajahamundry Homemade Foods",
    "Branded Store",
    "Yashu Mart",
    "Super Mart",
    "Fresh Foods",
    "Organic Store",
    "Quick Shop",
    "City Market",
  ];

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      month: "all",
      fromDate: "",
      toDate: "",
      location: "",
      search: "",
    });
  };

  const hasActiveFilters =
    filters.month !== "all" ||
    filters.fromDate ||
    filters.toDate ||
    filters.location ||
    filters.search;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
      {/* Filter Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="bg-emerald-600 text-white p-1.5 rounded-md mr-2">
              <FiFilter className="h-4 w-4" />
            </span>
            Filters
          </h3>
          <div className="flex gap-2">
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 text-sm bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm border border-gray-200 flex items-center gap-1"
            >
              <FiX className="h-3.5 w-3.5" />
              Clear All
            </button>
            <button className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-sm flex items-center gap-1">
              <FiRefreshCw className="h-3.5 w-3.5" />
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Filter Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Search Store */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiSearch className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">
                Search Store
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  filters.search
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Search by store name..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              {filters.search && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => handleFilterChange("search", "")}
                >
                  <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Month Filter */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiCalendar className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">Month</label>
            </div>
            <div className="relative">
              <select
                className={`w-full px-4 py-2.5 pr-8 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none bg-white ${
                  filters.month !== "all"
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                value={filters.month}
                onChange={(e) => handleFilterChange("month", e.target.value)}
              >
                <option value="all">All Months</option>
                <option value="JAN">January</option>
                <option value="FEB">February</option>
                <option value="MAR">March</option>
                <option value="APR">April</option>
                <option value="MAY">May</option>
                <option value="JUN">June</option>
                <option value="JUL">July</option>
                <option value="AUG">August</option>
                <option value="SEP">September</option>
                <option value="OCT">October</option>
                <option value="NOV">November</option>
                <option value="DEC">December</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* From Date Filter */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiCalendar className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">From</label>
            </div>
            <div className="relative">
              <input
                type="date"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  filters.fromDate
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                value={filters.fromDate}
                onChange={(e) => handleFilterChange("fromDate", e.target.value)}
              />
              {filters.fromDate && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => handleFilterChange("fromDate", "")}
                >
                  <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* To Date Filter */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiCalendar className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">To</label>
            </div>
            <div className="relative">
              <input
                type="date"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  filters.toDate
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                value={filters.toDate}
                onChange={(e) => handleFilterChange("toDate", e.target.value)}
              />
              {filters.toDate && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => handleFilterChange("toDate", "")}
                >
                  <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <div className="mt-6">
          <div className="flex items-center mb-2">
            <FiMapPin className="h-4 w-4 text-emerald-600 mr-2" />
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>
          </div>
          <div className="relative">
            <select
              className={`w-full px-4 py-2.5 pr-8 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none bg-white ${
                filters.location
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            >
              <option value="">-- select city --</option>
              {storeNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium text-emerald-800 mr-2">
                  Active Filters:
                </span>
                <div className="flex flex-wrap gap-2">
                  {filters.month !== "all" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiCalendar className="h-3 w-3 mr-1" />
                      {filters.month}
                    </span>
                  )}
                  {filters.fromDate && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiCalendar className="h-3 w-3 mr-1" />
                      From: {filters.fromDate}
                    </span>
                  )}
                  {filters.toDate && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiCalendar className="h-3 w-3 mr-1" />
                      To: {filters.toDate}
                    </span>
                  )}
                  {filters.location && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiMapPin className="h-3 w-3 mr-1" />
                      {filters.location}
                    </span>
                  )}
                  {filters.search && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiSearch className="h-3 w-3 mr-1" />
                      {filters.search}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
