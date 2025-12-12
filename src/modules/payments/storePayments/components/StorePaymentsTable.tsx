// src/modules/payments/storePayments/components/StorePaymentsTable.tsx
import React, { useState } from "react";
import { StorePayment } from "../storePaymentsSlice";
import {
  FiFilter,
  FiSearch,
  FiCalendar,
  FiDollarSign,
  FiPackage,
} from "react-icons/fi";
import Pagination from "../../../../components/common/Pagination";
import { useNavigate } from "react-router-dom";

interface StorePaymentsTableProps {
  data: StorePayment[];
  totals: {
    totalOrders: number;
    storeAmount: number;
    taxAmount: number;
    totalAmount: number;
  };
  isLoading: boolean;
}

export default function StorePaymentsTable({
  data,
  totals,
  isLoading,
}: StorePaymentsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Calculate pagination values
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Refunded":
        return "bg-gray-100 text-gray-800";
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
      case "Refunded":
        return "↩";
      default:
        return "?";
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Store Payment Records ({data.length})
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
                Store Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                      <FiFilter className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      No payments found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                      Try adjusting your filters to find what you're looking for
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              currentItems.map((row, index) => (
                <tr
                  key={row.sno}
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
                      {row.date}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                      {row.storeName}
                    </div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-800 cursor-pointer max-w-xs truncate"
                      onClick={() =>
                        navigate(
                          `/payments/store-payments/${encodeURIComponent(
                            row.storeName
                          )}`
                        )
                      }
                      title="Click to view details"
                    >
                      {row.storeName}
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
                      {row.storeAmount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <FiDollarSign className="mr-1 h-4 w-4 text-gray-400" />
                      {row.taxAmount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-medium text-emerald-600">
                      <FiDollarSign className="mr-1 h-4 w-4 text-emerald-500" />
                      {row.totalAmount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                      {row.transactionDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono">
                      {row.transactionId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          row.status
                        )}`}
                      >
                        <span className="mr-1">
                          {getStatusIcon(row.status)}
                        </span>
                        {row.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <td colSpan={3} className="px-6 py-4 font-semibold text-gray-900">
                Total
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900">
                {totals.totalOrders}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900">
                ₹{totals.storeAmount.toFixed(2)}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900">
                ₹{totals.taxAmount.toFixed(2)}
              </td>
              <td className="px-6 py-4 font-semibold text-emerald-600">
                ₹{totals.totalAmount.toFixed(2)}
              </td>
              <td colSpan={2} className="px-6 py-4"></td>
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
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
}
