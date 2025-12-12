// src/modules/settlements/storeSettlements/pages/StoreSettlementsPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  fetchStoreSettlements,
  StoreSettlement,
  editStoreSettlement,
  updateSettlementStatus,
} from "../storeSettlementsSlice";
import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiDollarSign,
  FiCheck,
  FiX,
} from "react-icons/fi";
import AddStoreSettlementModal from "../components/AddStoreSettlementModal";
import EditStoreSettlementModal from "../components/EditStoreSettlementModal";
import DeleteStoreSettlementModal from "../components/DeleteStoreSettlementModal";
import Pagination from "../../../../components/common/Pagination";

export default function StoreSettlementsPage() {
  const dispatch = useAppDispatch();
  const { settlements, status } = useAppSelector(
    (state) => state.storeSettlements
  );
  const navigate = useNavigate();
  const [searchStore, setSearchStore] = useState("");
  const [selectedSettlement, setSelectedSettlement] =
    useState<StoreSettlement | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState<string>("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === "idle") dispatch(fetchStoreSettlements());
  }, [status, dispatch]);

  // Filter settlements based on search and filters
  const filteredSettlements = settlements.filter((settlement) => {
    const matchesStore = settlement.storeName
      .toLowerCase()
      .includes(searchStore.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || settlement.status === statusFilter;
    const matchesPaymentType =
      paymentTypeFilter === "all" ||
      settlement.paymentType === paymentTypeFilter;

    return matchesStore && matchesStatus && matchesPaymentType;
  });

  // Calculate pagination values
  const totalItems = filteredSettlements.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSettlements = filteredSettlements.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchStore, statusFilter, paymentTypeFilter]);

  const handleRefresh = () => {
    dispatch(fetchStoreSettlements());
  };

  const handleEdit = (settlement: StoreSettlement) => {
    setSelectedSettlement(settlement);
    setShowEditModal(true);
  };

  const handleDelete = (settlement: StoreSettlement) => {
    setSelectedSettlement(settlement);
    setShowDeleteModal(true);
  };

  const handleUpdateStatus = (
    settlement: StoreSettlement,
    newStatus: StoreSettlement["status"]
  ) => {
    dispatch(updateSettlementStatus({ id: settlement.id, status: newStatus }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case "COD":
        return "bg-blue-100 text-blue-800";
      case "ONLINE":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                <FiDollarSign className="mr-3" />
                Store Settlements
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage store settlements and payment records
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
                <span>Add Settlement</span>
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
                  Total Settlements
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {settlements.length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiDollarSign className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {settlements.filter((s) => s.status === "Completed").length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiCheck className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">COD</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {settlements.filter((s) => s.paymentType === "COD").length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiDollarSign className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Online</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {settlements.filter((s) => s.paymentType === "ONLINE").length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiDollarSign className="text-purple-600 text-xl" />
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
                  placeholder="Search by Store Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={searchStore}
                  onChange={(e) => setSearchStore(e.target.value)}
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
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={paymentTypeFilter}
                  onChange={(e) => setPaymentTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="COD">COD</option>
                  <option value="ONLINE">ONLINE</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settlements Table */}
        {status === "loading" ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Loading settlements...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Store Settlements ({filteredSettlements.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Store Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Store Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tax
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Settlement Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Settlement Id
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentSettlements.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <FiDollarSign className="h-12 w-12 text-gray-400" />
                          </div>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">
                            {filteredSettlements.length === 0
                              ? "No settlements found"
                              : "No settlements on this page"}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                            {searchStore ||
                            statusFilter !== "all" ||
                            paymentTypeFilter !== "all"
                              ? "Try adjusting your search to find what you're looking for"
                              : filteredSettlements.length === 0
                              ? "Get started by adding a new settlement"
                              : "Try a different page"}
                          </p>
                          {!searchStore &&
                            statusFilter === "all" &&
                            paymentTypeFilter === "all" &&
                            filteredSettlements.length === 0 && (
                              <button
                                onClick={() => setShowAddModal(true)}
                                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
                              >
                                <FiPlus className="text-lg" />
                                <span>Add Settlement</span>
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentSettlements.map((settlement) => (
                      <tr
                        key={settlement.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(settlement.date)}
                          </div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {settlement.storeName}
                          </div>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-800 cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/settlements/store-settlements/${encodeURIComponent(
                                  settlement.storeName
                                )}`
                              )
                            }
                            title="Click to view details"
                          >
                            {settlement.storeName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {settlement.totalOrders}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ₹{settlement.storeAmount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ₹{settlement.tax.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ₹{settlement.totalAmount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(settlement.settlementDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {settlement.settlementId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentTypeColor(
                              settlement.paymentType
                            )}`}
                          >
                            {settlement.paymentType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              settlement.status
                            )}`}
                          >
                            {settlement.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end">
                            {settlement.status === "Pending" && (
                              <button
                                onClick={() =>
                                  handleUpdateStatus(settlement, "Completed")
                                }
                                className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                                title="Mark as Completed"
                              >
                                <FiCheck className="text-lg" />
                              </button>
                            )}
                            <button
                              onClick={() => handleEdit(settlement)}
                              className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-blue-50"
                              title="Edit"
                            >
                              <FiEdit2 className="text-lg" />
                            </button>
                            <button
                              onClick={() => handleDelete(settlement)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-150 p-1 rounded-full hover:bg-red-50"
                              title="Delete"
                            >
                              <FiTrash2 className="text-lg" />
                            </button>
                          </div>
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
          <AddStoreSettlementModal onClose={() => setShowAddModal(false)} />
        )}
        {showEditModal && selectedSettlement && (
          <EditStoreSettlementModal
            settlement={selectedSettlement}
            onClose={() => {
              setSelectedSettlement(null);
              setShowEditModal(false);
            }}
          />
        )}
        {showDeleteModal && selectedSettlement && (
          <DeleteStoreSettlementModal
            settlement={selectedSettlement}
            onClose={() => {
              setSelectedSettlement(null);
              setShowDeleteModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
