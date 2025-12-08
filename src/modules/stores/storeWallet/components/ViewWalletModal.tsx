// src/modules/shop/storeWallet/components/ViewWalletModal.tsx
import React, { useState } from "react";
import { StoreWallet, WalletTransaction } from "../storeWalletSlice";
import {
  FiX,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiCalendar,
  FiSearch,
} from "react-icons/fi";

export default function ViewWalletModal({
  wallet,
  onClose,
}: {
  wallet: StoreWallet;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter transactions based on search
  const filteredTransactions = wallet.transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.type.toLowerCase().includes(search.toLowerCase()) ||
      transaction.amount.toString().includes(search)
  );

  // Calculate pagination values
  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getTransactionTypeColor = (type: string) => {
    return type === "Credit" ? "text-green-600" : "text-red-600";
  };

  const getTransactionTypeBgColor = (type: string) => {
    return type === "Credit" ? "bg-green-100" : "bg-red-100";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Wallet Details - {wallet.storeName}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          {/* Wallet Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Current Balance</p>
                  <p className="text-2xl font-bold">
                    ${wallet.currentBalance.toFixed(2)}
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-full">
                  <FiDollarSign className="text-emerald-100 text-xl" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Earnings</p>
                  <p className="text-2xl font-bold">
                    ${wallet.totalEarnings.toFixed(2)}
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-full">
                  <FiTrendingUp className="text-blue-100 text-xl" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Total Withdrawals</p>
                  <p className="text-2xl font-bold">
                    ${wallet.totalWithdrawals.toFixed(2)}
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-full">
                  <FiTrendingDown className="text-red-100 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-[#258440] transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Transaction History ({filteredTransactions.length})
            </h3>

            {currentTransactions.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-gray-200 p-4 rounded-full inline-flex mb-4">
                  <FiDollarSign className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500">
                  {search
                    ? "No transactions found"
                    : "No transactions available"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-full ${getTransactionTypeBgColor(
                            transaction.type
                          )}`}
                        >
                          {transaction.type === "Credit" ? (
                            <FiTrendingUp
                              className={`h-5 w-5 ${getTransactionTypeColor(
                                transaction.type
                              )}`}
                            />
                          ) : (
                            <FiTrendingDown
                              className={`h-5 w-5 ${getTransactionTypeColor(
                                transaction.type
                              )}`}
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${getTransactionTypeColor(
                            transaction.type
                          )}`}
                        >
                          {transaction.type === "Credit" ? "+" : "-"}$
                          {transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Balance: ${transaction.balance.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, totalItems)} of {totalItems}{" "}
                transactions
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
