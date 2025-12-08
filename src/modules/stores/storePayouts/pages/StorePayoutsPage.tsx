// src/modules/shop/storePayouts/pages/StorePayoutsPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchPayouts, Payout, updatePayoutStatus } from "../storePayoutsSlice";
import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiDollarSign,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiFilter,
  FiDownload,
  FiEye,
  FiEdit,
} from "react-icons/fi";
import AddPayoutModal from "../components/AddPayoutModal";
import ViewPayoutModal from "../components/ViewPayoutModal";
import Pagination from "../../../../components/common/Pagination";

export default function StorePayoutsPage() {
  const dispatch = useAppDispatch();
  const { payouts, status } = useAppSelector((state) => state.storePayouts);
  const [search, setSearch] = useState("");
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    if (status === "idle") dispatch(fetchPayouts());
  }, [status, dispatch]);

  // Get unique values for filters
  const stores = [...new Set(payouts.map((payout) => payout.storeName))];
  const paymentMethods = [
    ...new Set(payouts.map((payout) => payout.paymentMethod)),
  ];

  // Filter payouts based on search and filters
  const filteredPayouts = payouts.filter((payout) => {
    const matchesSearch =
      payout.storeName.toLowerCase().includes(search.toLowerCase()) ||
      payout.storeId.includes(search) ||
      payout.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
      payout.amount.toString().includes(search);

    const matchesStatus =
      statusFilter === "all" || payout.status === statusFilter;

    let matchesDate = true;
    const today = new Date();
    const requestDate = new Date(payout.requestDate);

    if (dateFilter === "today") {
      matchesDate = requestDate.toDateString() === today.toDateString();
    } else if (dateFilter === "week") {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = requestDate >= weekAgo;
    } else if (dateFilter === "month") {
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      matchesDate = requestDate >= monthAgo;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Calculate pagination values
  const totalItems = filteredPayouts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayouts = filteredPayouts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, dateFilter]);

  const handleRefresh = () => {
    dispatch(fetchPayouts());
  };

  const handleView = (payout: Payout) => {
    setSelectedPayout(payout);
    setShowViewModal(true);
  };

  const handleStatusUpdate = (payout: Payout, newStatus: Payout["status"]) => {
    const processedDate =
      newStatus === "Completed" || newStatus === "Failed"
        ? new Date().toISOString().slice(0, 10)
        : undefined;

    const transactionId =
      newStatus === "Completed"
        ? `TXN${Math.floor(Math.random() * 1000000)}`
        : payout.transactionId;

    const notes = newStatus === "Failed" ? "Processing failed" : undefined;

    dispatch(
      updatePayoutStatus({
        id: payout.id,
        status: newStatus,
        processedDate,
        transactionId,
        notes,
      })
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <FiCheckCircle className="text-green-600" />;
      case "Processing":
        return <FiClock className="text-blue-600" />;
      case "Pending":
        return <FiClock className="text-yellow-600" />;
      case "Failed":
        return <FiXCircle className="text-red-600" />;
      default:
        return <FiClock className="text-gray-600" />;
    }
  };

  // Calculate totals
  const totalAmount = payouts.reduce((sum, payout) => sum + payout.amount, 0);
  const pendingAmount = payouts
    .filter((p) => p.status === "Pending")
    .reduce((sum, payout) => sum + payout.amount, 0);
  const completedAmount = payouts
    .filter((p) => p.status === "Completed")
    .reduce((sum, payout) => sum + payout.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Store Payouts
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage payout requests from stores
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
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <FiPlus className="text-lg" />
                <span>Add Payout</span>
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
                  Total Payouts
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ${totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiDollarSign className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ${pendingAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FiClock className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Processing</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {payouts.filter((p) => p.status === "Processing").length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiClock className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ${completedAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiCheckCircle className="text-green-600 text-xl" />
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
                  placeholder="Search by Store, Amount, or Transaction ID..."
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
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiCalendar className="h-4 w-4" />
                </div>
              </div>
              <button className="px-3 py-2 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-1">
                <FiDownload className="text-sm" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        {status === "loading" ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Loading payouts...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Payouts ({filteredPayouts.length})
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
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Processed Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPayouts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <FiDollarSign className="h-12 w-12 text-gray-400" />
                          </div>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">
                            {filteredPayouts.length === 0
                              ? "No payouts found"
                              : "No payouts on this page"}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                            {search
                              ? "Try adjusting your search to find what you're looking for"
                              : filteredPayouts.length === 0
                              ? "No payout requests available"
                              : "Try a different page"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentPayouts.map((payout) => (
                      <tr
                        key={payout.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {payout.storeName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {payout.storeId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-gray-900">
                            ${payout.amount.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(payout.status)}
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                payout.status
                              )}`}
                            >
                              {payout.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {payout.requestDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {payout.processedDate || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {payout.paymentMethod}
                          </div>
                          {payout.transactionId && (
                            <div className="text-xs text-gray-500">
                              {payout.transactionId}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleView(payout)}
                            className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                            title="View Details"
                          >
                            <FiEye className="text-lg" />
                          </button>
                          {payout.status === "Pending" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(payout, "Processing")
                              }
                              className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-blue-50"
                              title="Process"
                            >
                              <FiEdit className="text-lg" />
                            </button>
                          )}
                          {payout.status === "Processing" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(payout, "Completed")
                                }
                                className="text-green-600 hover:text-green-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-green-50"
                                title="Complete"
                              >
                                <FiCheckCircle className="text-lg" />
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(payout, "Failed")
                                }
                                className="text-red-600 hover:text-red-900 transition-colors duration-150 p-1 rounded-full hover:bg-red-50"
                                title="Fail"
                              >
                                <FiXCircle className="text-lg" />
                              </button>
                            </>
                          )}
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

        {/* Modals */}
        {showAddModal && (
          <AddPayoutModal
            stores={stores}
            onClose={() => setShowAddModal(false)}
          />
        )}
        {showViewModal && selectedPayout && (
          <ViewPayoutModal
            payout={selectedPayout}
            onClose={() => {
              setSelectedPayout(null);
              setShowViewModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
