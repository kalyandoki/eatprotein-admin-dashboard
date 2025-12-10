// src/modules/payments/deliveryBoys/pages/DeliveryBoysPage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchDeliveryBoys } from "../deliveryBoysSlice";
import DeliveryBoyFilters from "../components/DeliveryBoyFilters";
import DeliveryBoysTable from "../components/DeliveryBoysTable";
import DownloadExcelButton from "../components/DownloadExcelButton";
import { FiRefreshCw, FiFilter } from "react-icons/fi";

export default function DeliveryBoysPage() {
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector(
    (state) => state.deliveryBoysPayments
  );

  // Filter states
  const [filters, setFilters] = useState({
    dateYear: "",
    location: "",
    fo: "",
    db: "",
    search: "",
  });

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const locations = Array.from(new Set(list.map((item) => item.location)));
    const franchiseOwners = Array.from(
      new Set(list.map((item) => item.franchiseOwner))
    );
    const fos = Array.from(new Set(list.map((item) => item.fo)));
    const dbs = Array.from(new Set(list.map((item) => item.db)));

    return { locations, franchiseOwners, fos, dbs };
  }, [list]);

  // Filtered data based on filters
  const filteredData = useMemo(() => {
    let filtered = [...list];

    // Filter by date/year
    if (filters.dateYear) {
      filtered = filtered.filter((item) => {
        // For demo purposes, we'll just check if the year is included in the sno
        const filterYear = parseInt(filters.dateYear.split("-")[2]);
        return filterYear === 2020 + item.sno;
      });
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((item) =>
        item.location.includes(filters.location)
      );
    }

    // Filter by FO
    if (filters.fo) {
      filtered = filtered.filter((item) => item.fo.includes(filters.fo));
    }

    // Filter by DB
    if (filters.db) {
      filtered = filtered.filter((item) => item.db.includes(filters.db));
    }

    // Filter by search term
    if (filters.search) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.location.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.franchiseOwner
            .toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    return filtered;
  }, [list, filters]);

  useEffect(() => {
    if (status === "idle") dispatch(fetchDeliveryBoys());
  }, [status, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchDeliveryBoys());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Delivery Boy
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage and track delivery boy information
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
              <DownloadExcelButton data={filteredData} />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Delivery Boys
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {filteredData.length}
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
                <p className="text-gray-500 text-sm font-medium">Locations</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {filterOptions.locations.length}
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
                  Franchise Owners
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {filterOptions.franchiseOwners.length}
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
                  Field Officers
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {filterOptions.fos.length}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FiFilter className="text-orange-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <DeliveryBoyFilters
          filters={filters}
          setFilters={setFilters}
          options={filterOptions}
        />

        {/* Delivery Boys Table */}
        <DeliveryBoysTable
          data={filteredData}
          isLoading={status === "loading"}
        />
      </div>
    </div>
  );
}
