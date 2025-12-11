// src/modules/orders/pages/OrdersPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchOrders, Order, updateOrderStatus } from "../orderSlice";
import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";
import AddOrderModal from "../components/AddOrderModal";
import EditOrderModal from "../components/EditOrderModal";
import DeleteOrderModal from "../components/DeleteOrderModal";
import Pagination from "../../../components/common/Pagination";

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.orders);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewMode, setViewMode] = useState<"detailed" | "simple">("detailed");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [storeFilter, setStoreFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") dispatch(fetchOrders());
  }, [status, dispatch]);

  const filteredOrders = orders.filter(
    (order) =>
      (order.orderId.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.branch.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "" || order.status === statusFilter) &&
      (paymentFilter === "" || order.paymentStatus === paymentFilter) &&
      (locationFilter === "" ||
        order.deliveryAddress
          .toLowerCase()
          .includes(locationFilter.toLowerCase())) &&
      (storeFilter === "" || order.branch === storeFilter) &&
      (dateFilter === "" || order.dateTime.startsWith(dateFilter))
  );

  // Calculate pagination values
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    statusFilter,
    paymentFilter,
    dateFilter,
    locationFilter,
    storeFilter,
  ]);

  const handleRefresh = () => {
    dispatch(fetchOrders());
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  const handleDelete = (order: Order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleStatusUpdate = (id: string, status: Order["status"]) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Picked Up":
        return "bg-indigo-100 text-indigo-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
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
                Orders Management
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage customer orders and track delivery status
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setViewMode(viewMode === "detailed" ? "simple" : "detailed")
                }
                className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
              >
                <FiFilter className="text-lg" />
                <span>
                  {viewMode === "detailed" ? "Simple View" : "Detailed View"}
                </span>
              </button>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
                title="Refresh"
              >
                <FiRefreshCw className="text-lg" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              {/* <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <FiPlus className="text-lg" />
                <span>Add Order</span>
              </button> */}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {orders.length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiPackage className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Delivered</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {orders.filter((o) => o.status === "Delivered").length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiCheckCircle className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {orders.filter((o) => o.status === "Pending").length}
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <FiClock className="text-amber-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Cancelled</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {orders.filter((o) => o.status === "Cancelled").length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiXCircle className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters with improved design */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <FiFilter className="text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Order Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Picked Up">Picked Up</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="">Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>

            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />

            <input
              type="text"
              placeholder="Location"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
              value={storeFilter}
              onChange={(e) => setStoreFilter(e.target.value)}
            >
              <option value="">Stores</option>
              <option value="Madhina Chicken & Mutton Center">
                Madhina Chicken & Mutton Center
              </option>
              <option value="Downtown Store">Downtown Store</option>
              <option value="Mall Branch">Mall Branch</option>
              <option value="Airport Terminal">Airport Terminal</option>
            </select>
          </div>
        </div>

        {/* Table with enhanced design */}
        {status === "loading" ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Loading orders...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Orders ({filteredOrders.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {viewMode === "detailed" ? (
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Branch
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delivery Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Coupon
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Mode
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Store Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        D Boy Rating
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  ) : (
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  )}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={viewMode === "detailed" ? 13 : 8}
                        className="px-6 py-16 text-center"
                      >
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <FiPackage className="h-12 w-12 text-gray-400" />
                          </div>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">
                            No orders found
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                            {search ||
                            statusFilter ||
                            paymentFilter ||
                            dateFilter ||
                            locationFilter ||
                            storeFilter
                              ? "Try adjusting your search or filters to find what you're looking for"
                              : "Get started by adding a new order"}
                          </p>
                          {!search &&
                            !statusFilter &&
                            !paymentFilter &&
                            !dateFilter &&
                            !locationFilter &&
                            !storeFilter && (
                              <button
                                onClick={() => setShowAddModal(true)}
                                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
                              >
                                <FiPlus className="text-lg" />
                                <span>Add Order</span>
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        {viewMode === "detailed" ? (
                          <>
                            {/* <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {order.orderId}
                              </div>
                            </td> */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() =>
                                  navigate(
                                    `/orders/orderDetails/${order.orderId.replace(
                                      "#",
                                      ""
                                    )}`
                                  )
                                }
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                {order.orderId}
                              </button>
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {order.branch}
                              </div>
                            </td> */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() =>
                                  navigate(
                                    `/orders/store-orders/${encodeURIComponent(
                                      order.branch
                                    )}`
                                  )
                                }
                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                {order.branch}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {order.dateTime}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-gray-900">
                                ${order.orderAmount.toFixed(2)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {order.customerName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500 max-w-xs truncate">
                                {order.deliveryAddress}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {order.coupon || "-"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(
                                  order.status
                                )}`}
                                value={order.status}
                                onChange={(e) =>
                                  handleStatusUpdate(
                                    order.id,
                                    e.target.value as Order["status"]
                                  )
                                }
                              >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Picked Up">Picked Up</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {order.paymentMode}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {order.storeRating ? (
                                  <div className="flex items-center">
                                    <span>{order.storeRating}/5</span>
                                    <div className="ml-1 flex">
                                      {[...Array(5)].map((_, i) => (
                                        <svg
                                          key={i}
                                          className={`h-4 w-4 ${
                                            i < order.storeRating
                                              ? "text-amber-400"
                                              : "text-gray-300"
                                          }`}
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  "-"
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {order.deliveryBoyRating ? (
                                  <div className="flex items-center">
                                    <span>{order.deliveryBoyRating}/5</span>
                                    <div className="ml-1 flex">
                                      {[...Array(5)].map((_, i) => (
                                        <svg
                                          key={i}
                                          className={`h-4 w-4 ${
                                            i < order.deliveryBoyRating
                                              ? "text-amber-400"
                                              : "text-gray-300"
                                          }`}
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  "-"
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleEdit(order)}
                                className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                                title="Edit"
                              >
                                <FiEdit2 className="text-lg" />
                              </button>
                              <button
                                onClick={() => handleDelete(order)}
                                className="text-red-600 hover:text-red-900 transition-colors duration-150 p-1 rounded-full hover:bg-red-50"
                                title="Delete"
                              >
                                <FiTrash2 className="text-lg" />
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {/* <div className="text-sm font-medium text-gray-900">
                                {order.orderId}
                              </div> */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/orders/orderDetails/${order.orderId.replace(
                                        "#",
                                        ""
                                      )}`
                                    )
                                  }
                                  className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                  {order.orderId}
                                </button>
                              </td>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {order.customerName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {order.dateTime.split(" ")[0]}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-gray-900">
                                ${order.orderAmount.toFixed(2)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(
                                  order.paymentStatus
                                )}`}
                              >
                                {order.paymentStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {order.items}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleEdit(order)}
                                className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                                title="Edit"
                              >
                                <FiEdit2 className="text-lg" />
                              </button>
                              <button
                                onClick={() => handleDelete(order)}
                                className="text-red-600 hover:text-red-900 transition-colors duration-150 p-1 rounded-full hover:bg-red-50"
                                title="Delete"
                              >
                                <FiTrash2 className="text-lg" />
                              </button>
                            </td>
                          </>
                        )}
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
          <AddOrderModal onClose={() => setShowAddModal(false)} />
        )}
        {showEditModal && selectedOrder && (
          <EditOrderModal
            order={selectedOrder}
            onClose={() => {
              setSelectedOrder(null);
              setShowEditModal(false);
            }}
          />
        )}
        {showDeleteModal && selectedOrder && (
          <DeleteOrderModal
            order={selectedOrder}
            onClose={() => {
              setSelectedOrder(null);
              setShowDeleteModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
