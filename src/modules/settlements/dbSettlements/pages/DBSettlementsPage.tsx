// src/modules/settlements/dbSettlements/pages/DBSettlementsPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  fetchDBSettlements,
  DBSettlement,
  editDBSettlement,
} from "../dbSettlementsSlice";
import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiDollarSign,
  FiCalendar,
  FiDownload,
} from "react-icons/fi";
import AddDBSettlementModal from "../components/AddDBSettlementModal";
import EditDBSettlementModal from "../components/EditDBSettlementModal";
import DeleteDBSettlementModal from "../components/DeleteDBSettlementModal";
import Pagination from "../../../../components/common/Pagination";

export default function DBSettlementsPage() {
  const dispatch = useAppDispatch();
  const { settlements, status } = useAppSelector(
    (state) => state.dbSettlements
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [selectedSettlement, setSelectedSettlement] =
    useState<DBSettlement | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === "idle") dispatch(fetchDBSettlements());
  }, [status, dispatch]);

  // Filter settlements based on search and filters
  const filteredSettlements = settlements.filter((settlement) => {
    const matchesSearch =
      settlement.dbName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.dbId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.settlementId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || settlement.status === statusFilter;

    const matchesDate = !dateFilter || settlement.date.includes(dateFilter);

    return matchesSearch && matchesStatus && matchesDate;
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
  }, [searchTerm, statusFilter, dateFilter]);

  const handleRefresh = () => {
    dispatch(fetchDBSettlements());
  };

  const handleEdit = (settlement: DBSettlement) => {
    setSelectedSettlement(settlement);
    setShowEditModal(true);
  };

  const handleDelete = (settlement: DBSettlement) => {
    setSelectedSettlement(settlement);
    setShowDeleteModal(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleExport = () => {
    // Export functionality would go here
    console.log("Exporting settlements...");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COD":
        return "bg-green-100 text-green-800";
      case "ONLINE":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                DB Settlements
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage and track delivery boy settlements
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
                <p className="text-gray-500 text-sm font-medium">COD</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {settlements.filter((s) => s.status === "COD").length}
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
                <p className="text-gray-500 text-sm font-medium">ONLINE</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {settlements.filter((s) => s.status === "ONLINE").length}
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
                <p className="text-gray-500 text-sm font-medium">
                  Total Amount
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {formatCurrency(
                    settlements.reduce((sum, s) => sum + s.totalAmount, 0)
                  )}
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
                  placeholder="Search by DB Name, ID, or Settlement ID"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  <option value="all">All Types</option>
                  <option value="COD">COD</option>
                  <option value="ONLINE">ONLINE</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <div className="relative">
                <input
                  type="date"
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiCalendar className="h-4 w-4" />
                </div>
              </div>
              <button
                onClick={handleExport}
                className="px-3 py-2 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-1"
              >
                <FiDownload className="text-sm" />
                Export
              </button>
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
                DB Settlements ({filteredSettlements.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sno
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DB Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DB Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Settlement Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Settlement Id
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
                            {searchTerm || statusFilter !== "all" || dateFilter
                              ? "Try adjusting your search to find what you're looking for"
                              : filteredSettlements.length === 0
                              ? "Get started by adding a new settlement"
                              : "Try a different page"}
                          </p>
                          {!searchTerm &&
                            statusFilter === "all" &&
                            !dateFilter &&
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
                            {settlement.sno}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(settlement.date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {settlement.dbName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {settlement.totalOrders}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatCurrency(settlement.totalAmount)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatCurrency(settlement.dbAmount)}
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
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              settlement.status
                            )}`}
                          >
                            {settlement.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(settlement)}
                            className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
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
          <AddDBSettlementModal onClose={() => setShowAddModal(false)} />
        )}
        {showEditModal && selectedSettlement && (
          <EditDBSettlementModal
            settlement={selectedSettlement}
            onClose={() => {
              setSelectedSettlement(null);
              setShowEditModal(false);
            }}
          />
        )}
        {showDeleteModal && selectedSettlement && (
          <DeleteDBSettlementModal
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
