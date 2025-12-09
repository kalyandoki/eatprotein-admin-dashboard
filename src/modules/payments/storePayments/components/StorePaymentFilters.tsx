// src/modules/payments/storePayments/components/StorePaymentFilters.tsx
import React from "react";
import {
  FiSearch,
  FiMapPin,
  FiUser,
  FiTag,
  FiShoppingBag,
  FiX,
  FiRefreshCw,
  FiFilter,
} from "react-icons/fi";

interface StorePaymentFiltersProps {
  filters: {
    location: string;
    fo: string;
    category: string;
    store: string;
    search: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      location: string;
      fo: string;
      category: string;
      store: string;
      search: string;
    }>
  >;
  options: {
    locations: string[];
    fos: string[];
    categories: string[];
    stores: string[];
  };
}

export default function StorePaymentFilters({
  filters,
  setFilters,
  options,
}: StorePaymentFiltersProps) {
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      fo: "",
      category: "",
      store: "",
      search: "",
    });
  };

  const hasActiveFilters =
    filters.location ||
    filters.fo ||
    filters.category ||
    filters.store ||
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
          {/* Location Filter */}
          <div className="relative">
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
                <option value="">Select location...</option>
                {options.locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
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
            {filters.location && (
              <div className="absolute top-0 right-0 -mt-1 -mr-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
            )}
          </div>

          {/* FO Filter */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiUser className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">
                Field Officer
              </label>
            </div>
            <div className="relative">
              <select
                className={`w-full px-4 py-2.5 pr-8 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none bg-white ${
                  filters.fo
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                value={filters.fo}
                onChange={(e) => handleFilterChange("fo", e.target.value)}
              >
                <option value="">Select officer...</option>
                {options.fos.map((fo) => (
                  <option key={fo} value={fo}>
                    {fo}
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
            {filters.fo && (
              <div className="absolute top-0 right-0 -mt-1 -mr-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiTag className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
            </div>
            <div className="relative">
              <select
                className={`w-full px-4 py-2.5 pr-8 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none bg-white ${
                  filters.category
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option value="">Select category...</option>
                {options.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
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
            {filters.category && (
              <div className="absolute top-0 right-0 -mt-1 -mr-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
            )}
          </div>

          {/* Store Filter */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiShoppingBag className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">Store</label>
            </div>
            <div className="relative">
              <select
                className={`w-full px-4 py-2.5 pr-8 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none bg-white ${
                  filters.store
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                value={filters.store}
                onChange={(e) => handleFilterChange("store", e.target.value)}
              >
                <option value="">Select store...</option>
                {options.stores.map((store) => (
                  <option key={store} value={store}>
                    {store}
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
            {filters.store && (
              <div className="absolute top-0 right-0 -mt-1 -mr-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
            )}
          </div>

          {/* Search Store */}
          <div className="relative md:col-span-2 lg:col-span-1">
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
                  {filters.location && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiMapPin className="h-3 w-3 mr-1" />
                      {filters.location}
                    </span>
                  )}
                  {filters.fo && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiUser className="h-3 w-3 mr-1" />
                      {filters.fo}
                    </span>
                  )}
                  {filters.category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiTag className="h-3 w-3 mr-1" />
                      {filters.category}
                    </span>
                  )}
                  {filters.store && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiShoppingBag className="h-3 w-3 mr-1" />
                      {filters.store}
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
