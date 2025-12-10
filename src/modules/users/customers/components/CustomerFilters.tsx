// src/modules/users/customers/components/CustomerFilters.tsx
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  setPhoneSearch,
  setAreaSearch,
  setNameSearch,
  setTypeSearch,
  setDeviceSearch,
  setStatusSearch,
} from "../customersSlice";
import {
  FiSearch,
  FiMapPin,
  FiUser,
  FiMonitor,
  FiFilter,
  FiX,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

export default function CustomerFilters() {
  const dispatch = useAppDispatch();
  const {
    searchPhone,
    searchArea,
    searchName,
    searchType,
    searchDevice,
    searchStatus,
  } = useAppSelector((state) => state.customers);

  // Get cities and areas from the slice
  const cities = [
    "Hyderabad",
    "Bangalore",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Kolkata",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Visakhapatnam",
    "Vijayawada",
    "Coimbatore",
    "Madurai",
    "Tirupur",
    "Agra",
    "Varanasi",
    "Meerut",
    "Allahabad",
    "Nashik",
    "Aurangabad",
    "Ranchi",
    "Patna",
  ];

  const areas = [
    "Madhapur",
    "Hitech City",
    "Kukatpally",
    "Uppal",
    "Gachibowli",
    "Shadnagar",
    "Jangaon",
    "Karimnagar",
    "Amroha",
    "Mahoba",
    "Hamirpur",
    "Farrukhabad",
    "Kannauj",
    "Etawah",
    "Mainpuri",
    "Fatehpur",
    "Banda",
    "Chitrakoot",
    "Jhansi",
    "Lalitpur",
    "Jalaun",
    "Orai",
    "Maharajganj",
    "Balia",
    "Ghazipur",
    "Basti",
    "Siddharthnagar",
    "Bahraich",
    "Shravasti",
    "Balrampur",
    "Lakhimpur Kheri",
  ];

  const clearAllFilters = () => {
    dispatch(setPhoneSearch(""));
    dispatch(setAreaSearch(""));
    dispatch(setNameSearch(""));
    dispatch(setTypeSearch(""));
    dispatch(setDeviceSearch(""));
    dispatch(setStatusSearch(""));
  };

  const hasActiveFilters =
    searchPhone ||
    searchArea ||
    searchName ||
    searchType ||
    searchDevice ||
    searchStatus;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
      {/* Filter Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="bg-emerald-600 text-white p-1.5 rounded-md mr-2">
              <FiFilter className="h-4 w-4" />
            </span>
            Advanced Filters
          </h3>
          <button
            onClick={clearAllFilters}
            className="px-3 py-1.5 text-sm bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm border border-gray-200 flex items-center gap-1"
          >
            <FiX className="h-3.5 w-3.5" />
            Clear All
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Phone Search */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiSearch className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">
                Search Phone
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  searchPhone
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Enter Phone Number..."
                value={searchPhone}
                onChange={(e) => dispatch(setPhoneSearch(e.target.value))}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              {searchPhone && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => dispatch(setPhoneSearch(""))}
                >
                  <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Area Search */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiMapPin className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">
                Area Search
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  searchArea
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Enter Area..."
                value={searchArea}
                onChange={(e) => dispatch(setAreaSearch(e.target.value))}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="h-5 w-5 text-gray-400" />
              </div>
              {searchArea && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => dispatch(setAreaSearch(""))}
                >
                  <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Name Search */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiUser className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">
                Name Search
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  searchName
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Enter Customer Name..."
                value={searchName}
                onChange={(e) => dispatch(setNameSearch(e.target.value))}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              {searchName && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => dispatch(setNameSearch(""))}
                >
                  <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* City Filter */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FaBuilding className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">City</label>
            </div>
            <div className="relative">
              <select
                className={`w-full px-4 py-2.5 pr-8 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none bg-white ${
                  searchArea && cities.includes(searchArea)
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                value={searchArea}
                onChange={(e) => dispatch(setAreaSearch(e.target.value))}
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
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

          {/* Type Filter */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiFilter className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">Type</label>
            </div>
            <div className="relative">
              <select
                className={`w-full px-4 py-2.5 pr-8 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none bg-white ${
                  searchType
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                value={searchType}
                onChange={(e) => dispatch(setTypeSearch(e.target.value))}
              >
                <option value="">All Types</option>
                <option value="Direct">Direct</option>
                <option value="Referral">Referral</option>
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

          {/* Device Filter */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiMonitor className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">
                Device
              </label>
            </div>
            <div className="relative">
              <select
                className={`w-full px-4 py-2.5 pr-8 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none bg-white ${
                  searchDevice
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                value={searchDevice}
                onChange={(e) => dispatch(setDeviceSearch(e.target.value))}
              >
                <option value="">All Devices</option>
                <option value="WEB">Web</option>
                <option value="ANDROID">Android</option>
                <option value="IOS">iOS</option>
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

          {/* Status Filter */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiFilter className="h-4 w-4 text-emerald-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
            </div>
            <div className="relative">
              <select
                className={`w-full px-4 py-2.5 pr-8 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none bg-white ${
                  searchStatus
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                value={searchStatus}
                onChange={(e) => dispatch(setStatusSearch(e.target.value))}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
                  {searchPhone && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiSearch className="h-3 w-3 mr-1" />
                      Phone: {searchPhone}
                    </span>
                  )}
                  {searchArea && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiMapPin className="h-3 w-3 mr-1" />
                      Area: {searchArea}
                    </span>
                  )}
                  {searchName && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiUser className="h-3 w-3 mr-1" />
                      Name: {searchName}
                    </span>
                  )}
                  {searchType && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiFilter className="h-3 w-3 mr-1" />
                      Type: {searchType}
                    </span>
                  )}
                  {searchDevice && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiMonitor className="h-3 w-3 mr-1" />
                      Device: {searchDevice}
                    </span>
                  )}
                  {searchStatus && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <FiFilter className="h-3 w-3 mr-1" />
                      Status: {searchStatus}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={clearAllFilters}
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
