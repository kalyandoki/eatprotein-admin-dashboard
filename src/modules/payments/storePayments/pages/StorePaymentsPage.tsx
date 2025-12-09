// src/modules/payments/storePayments/pages/StorePaymentsPage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchStorePayments } from "../storePaymentsSlice";
import StorePaymentFilters from "../components/StorePaymentFilters";
import StorePaymentsTable from "../components/StorePaymentsTable";
import DownloadExcelButton from "../components/DownloadExcelButton";
import { FiRefreshCw, FiFilter } from "react-icons/fi";

export default function StorePaymentsPage() {
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector((state) => state.storePayments);

  // Filter states
  const [filters, setFilters] = useState({
    location: "",
    fo: "",
    category: "",
    store: "",
    search: "",
  });

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const locations = Array.from(new Set(list.map((item) => "Hyderabad"))); // Mock data for demo
    const fos = Array.from(new Set(list.map((item) => "John Doe"))); // Mock data for demo
    const categories = Array.from(
      new Set(list.map((item) => "Meat & Poultry"))
    ); // Mock data for demo
    const stores = Array.from(new Set(list.map((item) => item.storeName)));

    return { locations, fos, categories, stores };
  }, [list]);

  // Filtered data based on filters
  const filteredData = useMemo(() => {
    let filtered = [...list];

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((item) =>
        item.storeName.includes(filters.location)
      );
    }

    // Filter by FO
    if (filters.fo) {
      filtered = filtered.filter((item) =>
        item.transactionId.includes(filters.fo)
      );
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((item) =>
        item.storeName.includes(filters.category)
      );
    }

    // Filter by store
    if (filters.store) {
      filtered = filtered.filter((item) => item.storeName === filters.store);
    }

    // Filter by search term
    if (filters.search) {
      filtered = filtered.filter((item) =>
        item.storeName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    return filtered;
  }, [list, filters]);

  // Calculate totals
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, item) => {
        acc.totalOrders += item.totalOrders;
        acc.storeAmount += item.storeAmount;
        acc.taxAmount += item.taxAmount;
        acc.totalAmount += item.totalAmount;
        return acc;
      },
      {
        totalOrders: 0,
        storeAmount: 0,
        taxAmount: 0,
        totalAmount: 0,
      }
    );
  }, [filteredData]);

  useEffect(() => {
    if (status === "idle") dispatch(fetchStorePayments());
  }, [status, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchStorePayments());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Store Payments
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage and track store payment transactions
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
                <p className="text-gray-500 text-sm font-medium">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {totals.totalOrders}
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
                  Store Amount
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ₹{totals.storeAmount.toFixed(2)}
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
                <p className="text-gray-500 text-sm font-medium">Tax Amount</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ₹{totals.taxAmount.toFixed(2)}
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
                  Total Amount
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ₹{totals.totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FiFilter className="text-orange-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <StorePaymentFilters
          filters={filters}
          setFilters={setFilters}
          options={filterOptions}
        />

        {/* Store Payments Table */}
        <StorePaymentsTable
          data={filteredData}
          totals={totals}
          isLoading={status === "loading"}
        />
      </div>
    </div>
  );
}
