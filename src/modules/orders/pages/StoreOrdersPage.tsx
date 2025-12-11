// src/modules/orders/pages/StoreOrdersPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchOrders, Order, updateOrderStatus } from "../orderSlice";
import {
  FiArrowLeft,
  FiSearch,
  FiRefreshCw,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiTruck,
} from "react-icons/fi";
import EditOrderModal from "../components/EditOrderModal";
import DeleteOrderModal from "../components/DeleteOrderModal";
import Pagination from "../../../components/common/Pagination";

export default function StoreOrdersPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.orders);

  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === "idle") dispatch(fetchOrders());
  }, [status, dispatch]);

  // Filter orders by store ID
  const storeOrders = orders.filter((order) => order.branch === storeId);

  // Apply additional filters
  const filteredOrders = storeOrders.filter(
    (order) =>
      (order.orderId.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "" || order.status === statusFilter) &&
      (fromDate === "" || order.dateTime >= fromDate) &&
      (toDate === "" || order.dateTime <= toDate)
  );

  // Calculate statistics
  const stats = {
    received: storeOrders.length,
    accepted: storeOrders.filter((o) => o.status === "Processing").length,
    shipped: storeOrders.filter((o) => o.status === "Picked Up").length,
    delivered: storeOrders.filter((o) => o.status === "Delivered").length,
    cancelled: storeOrders.filter((o) => o.status === "Cancelled").length,
  };

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
  }, [search, statusFilter, fromDate, toDate]);

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

  // Get location from first order (assuming all orders have same location for the same store)
  const location = storeOrders.length > 0 ? storeOrders[0].deliveryAddress : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate("/orders")}
              className="mr-4 p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-200"
            >
              <FiArrowLeft className="text-lg" />
            </button>
            <h1 className="text-3xl md:text-4xl font-bold">{storeId}</h1>
          </div>
          <p className="text-emerald-100 text-lg mb-4">{location}</p>
          <h2 className="text-xl font-semibold">Orders</h2>

          {/* Date Range Filters */}
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="fromDate">From:</label>
              <input
                type="date"
                id="fromDate"
                className="px-3 py-1 rounded border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="toDate">To:</label>
              <input
                type="date"
                id="toDate"
                className="px-3 py-1 rounded border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Orders Recieved
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.received}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiPackage className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Orders Accepted
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.accepted}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiCheckCircle className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Orders Shipped
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.shipped}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <FiTruck className="text-indigo-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Orders Delivered
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.delivered}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiCheckCircle className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Orders Cancelled
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.cancelled}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiXCircle className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by order id"
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
              <option value="">--Select Status--</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Picked Up">Picked Up</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 flex items-center gap-2"
            >
              <FiRefreshCw className="text-lg" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Table */}
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
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      D.Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coupon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      D Boy
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <FiPackage className="h-12 w-12 text-gray-400" />
                          </div>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">
                            No orders found
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                            {search || statusFilter || fromDate || toDate
                              ? "Try adjusting your search or filters to find what you're looking for"
                              : "There are no orders for this store"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentOrders.map((order, index) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {order.dateTime}
                          </div>
                        </td>
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            ₹{order.orderAmount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {order.customerName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            9030467469{" "}
                            {/* This would come from the order data in a real app */}
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
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {order.status === "Delivered" ? "Immanuel" : "-"}
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
