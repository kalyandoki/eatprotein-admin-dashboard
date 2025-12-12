// src/modules/payments/storePaymentDetails/pages/StorePaymentDetailsPage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchStorePaymentDetails } from "../storePaymentDetailsSlice";
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiPackage,
  FiFilter,
} from "react-icons/fi";
import Pagination from "../../../../components/common/Pagination";

export default function StorePaymentDetailsPage() {
  const { storeName } = useParams<{ storeName: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    list,
    status,
    storeName: currentStoreName,
  } = useAppSelector((state) => state.storePaymentDetails);

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
        acc.orderAmount += item.orderAmount;
        acc.storeAmount += item.storeAmount;
        acc.taxAmount += item.taxAmount;
        acc.appShare += item.appShare;
        acc.deliveryCharges += item.deliveryCharges;
        acc.packageCharges += item.packageCharges;
        acc.platformFee += item.platformFee;
        acc.couponCost += item.couponCost;
        acc.balancedAppAmount += item.balancedAppAmount;
        acc.foAmount += item.foAmount;
        return acc;
      },
      {
        orderAmount: 0,
        storeAmount: 0,
        taxAmount: 0,
        appShare: 0,
        deliveryCharges: 0,
        packageCharges: 0,
        platformFee: 0,
        couponCost: 0,
        balancedAppAmount: 0,
        foAmount: 0,
      }
    );
  }, [list]);

  useEffect(() => {
    if (storeName && (status === "idle" || currentStoreName !== storeName)) {
      dispatch(fetchStorePaymentDetails(storeName));
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

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center py-20 bg-gray-50 min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
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
                {/* <button
                  onClick={() => navigate("/payments/store-payments")}
                  className="mr-4 p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-200"
                >
                  <FiArrowLeft className="text-lg" />
                </button> */}

                <h1 className="text-3xl md:text-4xl font-bold">
                  {currentStoreName || "Store"} Payment Details
                </h1>
              </div>
              <p className="text-emerald-100 text-lg mb-4">
                Detailed payment transactions for this store
              </p>
              <div className="flex">
                <button
                  onClick={() => navigate("/payments/store-payments")}
                  className="flex gap-2 items-center mb-2 mr-4 p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-200"
                >
                  Back to Store Payments
                </button>

                <button
                  onClick={() => navigate("/payments/payments-overview")}
                  className="flex gap-2 items-center mb-2 mr-4 p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-200"
                >
                  Back to Payments Overview
                </button>
              </div>
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
                  Store Amount
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ₹{totals.storeAmount.toFixed(2)}
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
                <p className="text-gray-500 text-sm font-medium">App Share</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ₹{totals.appShare.toFixed(2)}
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
                <p className="text-gray-500 text-sm font-medium">
                  Total Amount
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ₹{totals.orderAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FiDollarSign className="text-orange-600 text-xl" />
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
                Payment Records ({list.length})
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
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Store Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    App Share
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Charges
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package Charges
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform Fee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coupon Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bal. App Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    FO Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {list.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                          <FiFilter className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">
                          No payment details found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                          There are no payment details available for this store
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((row, index) => (
                    <tr
                      key={`${row.orderId}-${index}`}
                      className={`hover:bg-gray-50 transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                          {row.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {row.orderId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <FiDollarSign className="mr-1 h-4 w-4 text-gray-400" />
                          {row.orderAmount.toFixed(2)}
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
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <FiDollarSign className="mr-1 h-4 w-4 text-gray-400" />
                          {row.appShare.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <FiDollarSign className="mr-1 h-4 w-4 text-gray-400" />
                          {row.deliveryCharges.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <FiDollarSign className="mr-1 h-4 w-4 text-gray-400" />
                          {row.packageCharges.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <FiDollarSign className="mr-1 h-4 w-4 text-gray-400" />
                          {row.platformFee.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <FiDollarSign className="mr-1 h-4 w-4 text-gray-400" />
                          {row.couponCost.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <FiDollarSign className="mr-1 h-4 w-4 text-gray-400" />
                          {row.balancedAppAmount.toFixed(2)}
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <FiDollarSign className="mr-1 h-4 w-4 text-gray-400" />
                          {row.foAmount.toFixed(2)}
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
                    ₹{totals.orderAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{totals.storeAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{totals.taxAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{totals.appShare.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{totals.deliveryCharges.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{totals.packageCharges.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{totals.platformFee.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{totals.couponCost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{totals.balancedAppAmount.toFixed(2)}
                  </td>
                  <td
                    colSpan={2}
                    className="px-6 py-4 font-semibold text-gray-900"
                  >
                    ₹{totals.foAmount.toFixed(2)}
                  </td>
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
      </div>
    </div>
  );
}
