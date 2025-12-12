// src/modules/settlements/storeSettlementDetails/pages/StoreSettlementDetailsPage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchStoreSettlementDetails } from "../storeSettlementDetailsSlice";
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiPackage,
  FiFilter,
} from "react-icons/fi";
import Pagination from "../../../../components/common/Pagination";

export default function StoreSettlementDetailsPage() {
  const { storeName } = useParams<{ storeName: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    list,
    status,
    storeName: currentStoreName,
    storeLocation,
  } = useAppSelector((state) => state.storeSettlementDetails);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination values
  const totalItems = list.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate totals
  const totals = useMemo(() => {
    return list.reduce(
      (acc, item) => {
        acc.totalOrders += item.totalOrders;
        acc.totalAmount += item.totalAmount;
        return acc;
      },
      {
        totalOrders: 0,
        totalAmount: 0,
      }
    );
  }, [list]);

  useEffect(() => {
    if (storeName && (status === "idle" || currentStoreName !== storeName)) {
      dispatch(fetchStoreSettlementDetails(storeName));
    }
  }, [storeName, status, currentStoreName, dispatch]);

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return "✓";
      case "Pending":
        return "⏳";
      case "Failed":
        return "✗";
      default:
        return "?";
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

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center py-20 bg-gray-50 min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-gray-600">Loading settlement details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-2">
                <button
                  onClick={() => navigate("/settlements/store-settlements")}
                  className="mr-4 p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-200"
                >
                  <FiArrowLeft className="text-lg" />
                </button>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {currentStoreName || "Store"} Settlement Details
                </h1>
              </div>
              <p className="text-emerald-100 text-lg ml-12">{storeLocation}</p>
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
                  {list.length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiPackage className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {totals.totalOrders}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiPackage className="text-blue-600 text-xl" />
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
                  ₹{totals.totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiDollarSign className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {
                    list.filter((item) => item.paymentStatus === "Completed")
                      .length
                  }
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FiFilter className="text-orange-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Settlement Records ({list.length})
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiPackage className="h-4 w-4" />
                <span>
                  Showing {indexOfFirstItem + 1}-
                  {Math.min(indexOfLastItem, totalItems)} of {totalItems}
                </span>
              </div>
            </div>
          </div>

          {/* Table */}
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
                    Total Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {list.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                          <FiFilter className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">
                          No settlement details found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                          There are no settlement details available for this
                          store
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((row, index) => (
                    <tr
                      key={`${row.transactionId}-${index}`}
                      className={`hover:bg-gray-50 transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {row.sno}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                          {formatDate(row.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {row.totalOrders}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <FiDollarSign className="mr-1 h-4 w-4 text-gray-400" />
                          {row.totalAmount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              row.paymentStatus
                            )}`}
                          >
                            <span className="mr-1">
                              {getStatusIcon(row.paymentStatus)}
                            </span>
                            {row.paymentStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                          {formatDate(row.transactionDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-mono">
                          {row.transactionId}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <td
                    colSpan={2}
                    className="px-6 py-4 font-semibold text-gray-900"
                  >
                    Total
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {totals.totalOrders}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{totals.totalAmount.toLocaleString()}
                  </td>
                  <td colSpan={3} className="px-6 py-4"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              perPage={itemsPerPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
