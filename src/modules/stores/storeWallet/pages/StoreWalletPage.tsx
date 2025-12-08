// src/modules/shop/storeWallet/pages/StoreWalletPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  fetchStoreWallets,
  StoreWallet,
  WalletTransaction,
} from "../storeWalletSlice";
import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiCalendar,
  FiEye,
  FiFilter,
  FiDownload,
} from "react-icons/fi";
import { FaWallet } from "react-icons/fa";

import AddTransactionModal from "../components/AddTransactionModal";
import ViewWalletModal from "../components/ViewWalletModal";
import Pagination from "../../../../components/common/Pagination";

export default function StoreWalletPage() {
  const dispatch = useAppDispatch();
  const { wallets, status } = useAppSelector((state) => state.storeWallet);
  const [search, setSearch] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<StoreWallet | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [balanceFilter, setBalanceFilter] = useState<string>("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    if (status === "idle") dispatch(fetchStoreWallets());
  }, [status, dispatch]);

  // Filter wallets based on search and balance filter
  const filteredWallets = wallets.filter((wallet) => {
    const matchesSearch =
      wallet.storeName.toLowerCase().includes(search.toLowerCase()) ||
      wallet.storeId.includes(search);

    let matchesBalance = true;
    if (balanceFilter === "high") {
      matchesBalance = wallet.currentBalance > 5000;
    } else if (balanceFilter === "medium") {
      matchesBalance =
        wallet.currentBalance >= 2000 && wallet.currentBalance <= 5000;
    } else if (balanceFilter === "low") {
      matchesBalance = wallet.currentBalance < 2000;
    }

    return matchesSearch && matchesBalance;
  });

  // Calculate pagination values
  const totalItems = filteredWallets.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWallets = filteredWallets.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, balanceFilter]);

  const handleRefresh = () => {
    dispatch(fetchStoreWallets());
  };

  const handleView = (wallet: StoreWallet) => {
    setSelectedWallet(wallet);
    setShowViewModal(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getBalanceColor = (balance: number) => {
    if (balance > 5000) return "text-green-600";
    if (balance >= 2000) return "text-yellow-600";
    return "text-red-600";
  };

  const getBalanceBgColor = (balance: number) => {
    if (balance > 5000) return "bg-green-100";
    if (balance >= 2000) return "bg-yellow-100";
    return "bg-red-100";
  };

  // Calculate totals
  const totalBalance = wallets.reduce(
    (sum, wallet) => sum + wallet.currentBalance,
    0
  );
  const totalEarnings = wallets.reduce(
    (sum, wallet) => sum + wallet.totalEarnings,
    0
  );
  const totalWithdrawals = wallets.reduce(
    (sum, wallet) => sum + wallet.totalWithdrawals,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Store Wallets
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage store wallets and transactions
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
                <span>Add Transaction</span>
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
                  Total Balance
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ${totalBalance.toFixed(2)}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FaWallet className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Earnings
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ${totalEarnings.toFixed(2)}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiTrendingUp className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Withdrawals
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ${totalWithdrawals.toFixed(2)}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiTrendingDown className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Wallets
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {wallets.length}
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
                  placeholder="Search by Store Name or ID..."
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
                  value={balanceFilter}
                  onChange={(e) => setBalanceFilter(e.target.value)}
                >
                  <option value="all">All Balances</option>
                  <option value="high">High ($5000+)</option>
                  <option value="medium">Medium ($2000-$5000)</option>
                  <option value="low">Low ($2000)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <button className="px-3 py-2 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-1">
                <FiDownload className="text-sm" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Wallets Table */}
        {status === "loading" ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Loading wallets...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Store Wallets ({filteredWallets.length})
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
                      Current Balance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Earnings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Withdrawals
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentWallets.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <FaWallet className="h-12 w-12 text-gray-400" />
                          </div>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">
                            {filteredWallets.length === 0
                              ? "No wallets found"
                              : "No wallets on this page"}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                            {search
                              ? "Try adjusting your search to find what you're looking for"
                              : filteredWallets.length === 0
                              ? "No wallets available"
                              : "Try a different page"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentWallets.map((wallet) => (
                      <tr
                        key={wallet.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {wallet.storeName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {wallet.storeId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-lg font-bold ${getBalanceColor(
                              wallet.currentBalance
                            )}`}
                          >
                            ${wallet.currentBalance.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${wallet.totalEarnings.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${wallet.totalWithdrawals.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 flex items-center">
                            <FiCalendar className="mr-1 h-3 w-3" />
                            {wallet.lastUpdated}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleView(wallet)}
                            className="text-emerald-600 hover:text-emerald-900 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                            title="View Details"
                          >
                            <FiEye className="text-lg" />
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
          <AddTransactionModal
            wallets={wallets}
            onClose={() => setShowAddModal(false)}
          />
        )}
        {showViewModal && selectedWallet && (
          <ViewWalletModal
            wallet={selectedWallet}
            onClose={() => {
              setSelectedWallet(null);
              setShowViewModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
