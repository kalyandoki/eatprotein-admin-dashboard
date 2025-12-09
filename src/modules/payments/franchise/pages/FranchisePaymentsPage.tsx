// src/modules/payments/franchise/pages/FranchisePaymentsPage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchFranchisePayments } from "../franchisePaymentsSlice";
import FranchisePaymentFilters from "../components/FranchisePaymentFilters";
import FranchisePaymentsTable from "../components/FranchisePaymentsTable";
import DownloadExcelButton from "../components/DownloadExcelButton";
import { FiRefreshCw, FiFilter } from "react-icons/fi";

export default function FranchisePaymentsPage() {
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector((state) => state.franchisePayments);

  // Filter states
  const [filters, setFilters] = useState({
    location: "",
    fo: "",
    monthYear: "",
  });

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const locations = Array.from(new Set(list.map((item) => item.area)));
    const fos = Array.from(new Set(list.map((item) => item.foName)));
    const months = Array.from(new Set(list.map((item) => item.month)));

    return { locations, fos, months };
  }, [list]);

  // Filtered data based on filters
  const filteredData = useMemo(() => {
    let filtered = [...list];

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((item) =>
        item.area.includes(filters.location)
      );
    }

    // Filter by FO
    if (filters.fo) {
      filtered = filtered.filter((item) => item.foName.includes(filters.fo));
    }

    // Filter by month/year
    if (filters.monthYear) {
      filtered = filtered.filter((item) =>
        item.month.includes(filters.monthYear)
      );
    }

    return filtered;
  }, [list, filters]);

  // Calculate totals
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, item) => {
        acc.foAmount += item.foAmount;
        acc.pendingAmount += item.pendingAmount;
        acc.settledAmount += item.settledAmount;
        return acc;
      },
      {
        foAmount: 0,
        pendingAmount: 0,
        settledAmount: 0,
      }
    );
  }, [filteredData]);

  useEffect(() => {
    if (status === "idle") dispatch(fetchFranchisePayments());
  }, [status, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchFranchisePayments());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Franchise Owner
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage and track franchise payment transactions
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
              <DownloadExcelButton data={filteredData} totals={totals} />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">FO Amount</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ₹{totals.foAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiFilter className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Pending Amount
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ₹{totals.pendingAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiFilter className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Settled Amount
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ₹{totals.settledAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiFilter className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Records
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {filteredData.length}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FiFilter className="text-orange-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <FranchisePaymentFilters
          filters={filters}
          setFilters={setFilters}
          options={filterOptions}
        />

        {/* Franchise Payments Table */}
        <FranchisePaymentsTable
          data={filteredData}
          totals={totals}
          isLoading={status === "loading"}
        />
      </div>
    </div>
  );
}
