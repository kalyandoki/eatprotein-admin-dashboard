// // src/modules/orders/pages/OrderDetailsPage.tsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks";
// import { fetchOrders, Order } from "../orderSlice";
// import {
//   FiArrowLeft,
//   FiPackage,
//   FiUser,
//   FiTruck,
//   FiCreditCard,
//   FiMapPin,
//   FiCalendar,
//   FiClock,
//   FiEdit2,
//   FiCheckCircle,
//   FiXCircle,
// } from "react-icons/fi";
// import EditOrderModal from "../components/EditOrderModal";

// export default function OrderDetailsPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { orders, status } = useAppSelector((state) => state.orders);
//   const [order, setOrder] = useState<Order | null>(null);
//   const [showEditModal, setShowEditModal] = useState(false);

//   useEffect(() => {
//     if (status === "idle") dispatch(fetchOrders());
//   }, [status, dispatch]);

//   useEffect(() => {
//     if (orders.length > 0) {
//       const foundOrder = orders.find((o) => o.orderId === `#${id}`);
//       if (foundOrder) {
//         setOrder(foundOrder);
//       }
//     }
//   }, [orders, id]);

//   const handleEdit = () => {
//     if (order) {
//       setShowEditModal(true);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Delivered":
//         return "bg-green-100 text-green-800";
//       case "Processing":
//         return "bg-blue-100 text-blue-800";
//       case "Pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "Picked Up":
//         return "bg-indigo-100 text-indigo-800";
//       case "Cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getPaymentStatusColor = (status: string) => {
//     switch (status) {
//       case "Paid":
//         return "bg-green-100 text-green-800";
//       case "Pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "Failed":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   if (!order) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading order details...</p>
//         </div>
//       </div>
//     );
//   }

//   // Split date and time
//   const [datePart, timePart] = order.dateTime.split(" ");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header with back button */}
//         <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <button
//                 onClick={() => navigate("/orders")}
//                 className="mr-4 p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-200"
//               >
//                 <FiArrowLeft className="text-lg" />
//               </button>
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-bold mb-2">
//                   Order Details
//                 </h1>
//                 <p className="text-emerald-100 text-lg">
//                   {order.orderId} from {order.branch}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={handleEdit}
//               className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
//             >
//               <FiEdit2 className="text-lg" />
//               <span>Edit Order</span>
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Order Details */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Order Information Card */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               <div className="px-6 py-4 bg-emerald-600 text-white">
//                 <h2 className="text-xl font-semibold flex items-center">
//                   <FiPackage className="mr-2" />
//                   Order Information
//                 </h2>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Order ID</p>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {order.orderId}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Date</p>
//                     <p className="text-lg font-semibold text-gray-900 flex items-center">
//                       <FiCalendar className="mr-2 text-gray-400" />
//                       {datePart}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Time</p>
//                     <p className="text-lg font-semibold text-gray-900 flex items-center">
//                       <FiClock className="mr-2 text-gray-400" />
//                       {timePart}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Order Status</p>
//                     <span
//                       className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
//                         order.status
//                       )}`}
//                     >
//                       {order.status === "Delivered" && (
//                         <FiCheckCircle className="mr-1" />
//                       )}
//                       {order.status === "Cancelled" && (
//                         <FiXCircle className="mr-1" />
//                       )}
//                       {order.status}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Payment Mode</p>
//                     <p className="text-lg font-semibold text-gray-900 flex items-center">
//                       <FiCreditCard className="mr-2 text-gray-400" />
//                       {order.paymentMode}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Payment Status</p>
//                     <span
//                       className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPaymentStatusColor(
//                         order.paymentStatus
//                       )}`}
//                     >
//                       {order.paymentStatus}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Total Amount</p>
//                     <p className="text-xl font-bold text-emerald-600">
//                       ${order.orderAmount.toFixed(2)}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Items Count</p>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {order.items} items
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Customer Information Card */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               <div className="px-6 py-4 bg-emerald-600 text-white">
//                 <h2 className="text-xl font-semibold flex items-center">
//                   <FiUser className="mr-2" />
//                   Customer Information
//                 </h2>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Customer Name</p>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {order.customerName}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">
//                       Delivery Address
//                     </p>
//                     <p className="text-lg font-semibold text-gray-900 flex items-center">
//                       <FiMapPin className="mr-2 text-gray-400" />
//                       {order.deliveryAddress}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Store Information Card */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               <div className="px-6 py-4 bg-emerald-600 text-white">
//                 <h2 className="text-xl font-semibold flex items-center">
//                   <FiPackage className="mr-2" />
//                   Store Information
//                 </h2>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Store Name</p>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {order.branch}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Store Rating</p>
//                     <div className="flex items-center">
//                       {order.storeRating ? (
//                         <>
//                           <span className="text-lg font-semibold text-gray-900 mr-2">
//                             {order.storeRating}/5
//                           </span>
//                           <div className="flex">
//                             {[...Array(5)].map((_, i) => (
//                               <svg
//                                 key={i}
//                                 className={`h-5 w-5 ${
//                                   i < order.storeRating
//                                     ? "text-amber-400"
//                                     : "text-gray-300"
//                                 }`}
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                               </svg>
//                             ))}
//                           </div>
//                         </>
//                       ) : (
//                         <span className="text-gray-500">No rating</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Additional Information */}
//           <div className="space-y-6">
//             {/* Delivery Information Card */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               <div className="px-6 py-4 bg-emerald-600 text-white">
//                 <h2 className="text-xl font-semibold flex items-center">
//                   <FiTruck className="mr-2" />
//                   Delivery Information
//                 </h2>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">
//                       Delivery Boy Rating
//                     </p>
//                     <div className="flex items-center">
//                       {order.deliveryBoyRating ? (
//                         <>
//                           <span className="text-lg font-semibold text-gray-900 mr-2">
//                             {order.deliveryBoyRating}/5
//                           </span>
//                           <div className="flex">
//                             {[...Array(5)].map((_, i) => (
//                               <svg
//                                 key={i}
//                                 className={`h-5 w-5 ${
//                                   i < order.deliveryBoyRating
//                                     ? "text-amber-400"
//                                     : "text-gray-300"
//                                 }`}
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                               </svg>
//                             ))}
//                           </div>
//                         </>
//                       ) : (
//                         <span className="text-gray-500">No rating</span>
//                       )}
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Coupon Code</p>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {order.coupon || "No coupon applied"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Order Timeline Card */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               <div className="px-6 py-4 bg-emerald-600 text-white">
//                 <h2 className="text-xl font-semibold flex items-center">
//                   <FiClock className="mr-2" />
//                   Order Timeline
//                 </h2>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   <div className="flex items-start">
//                     <div className="flex-shrink-0 mr-3">
//                       <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
//                         <FiCheckCircle className="text-emerald-600" />
//                       </div>
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">Order Placed</p>
//                       <p className="text-sm text-gray-500">{order.dateTime}</p>
//                     </div>
//                   </div>
//                   {order.status !== "Pending" && (
//                     <div className="flex items-start">
//                       <div className="flex-shrink-0 mr-3">
//                         <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
//                           <FiCheckCircle className="text-emerald-600" />
//                         </div>
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           Order Confirmed
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           After order placement
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                   {order.status === "Processing" && (
//                     <div className="flex items-start">
//                       <div className="flex-shrink-0 mr-3">
//                         <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                           <FiClock className="text-blue-600" />
//                         </div>
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900">Processing</p>
//                         <p className="text-sm text-gray-500">In progress</p>
//                       </div>
//                     </div>
//                   )}
//                   {order.status === "Picked Up" && (
//                     <div className="flex items-start">
//                       <div className="flex-shrink-0 mr-3">
//                         <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
//                           <FiTruck className="text-indigo-600" />
//                         </div>
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           Out for Delivery
//                         </p>
//                         <p className="text-sm text-gray-500">On the way</p>
//                       </div>
//                     </div>
//                   )}
//                   {order.status === "Delivered" && (
//                     <div className="flex items-start">
//                       <div className="flex-shrink-0 mr-3">
//                         <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
//                           <FiCheckCircle className="text-emerald-600" />
//                         </div>
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900">Delivered</p>
//                         <p className="text-sm text-gray-500">
//                           Successfully delivered
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                   {order.status === "Cancelled" && (
//                     <div className="flex items-start">
//                       <div className="flex-shrink-0 mr-3">
//                         <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
//                           <FiXCircle className="text-red-600" />
//                         </div>
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900">Cancelled</p>
//                         <p className="text-sm text-gray-500">
//                           Order was cancelled
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Edit Modal */}
//         {showEditModal && (
//           <EditOrderModal
//             order={order}
//             onClose={() => setShowEditModal(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// src/modules/orders/pages/OrderDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchOrders, Order } from "../orderSlice";
import {
  FiArrowLeft,
  FiPackage,
  FiUser,
  FiTruck,
  FiCreditCard,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiEdit2,
  FiCheckCircle,
  FiXCircle,
  FiShoppingCart,
  FiDollarSign,
} from "react-icons/fi";
import EditOrderModal from "../components/EditOrderModal";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.orders);
  const [order, setOrder] = useState<Order | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (status === "idle") dispatch(fetchOrders());
  }, [status, dispatch]);

  useEffect(() => {
    if (orders.length > 0) {
      //   const foundOrder = orders.find((o) => o.orderId === `#${id}`);
      const foundOrder = orders.find(
        (o) => o.orderId === `#${id}` || o.orderId === id
      );
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [orders, id]);

  const handleEdit = () => {
    if (order) {
      setShowEditModal(true);
    }
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

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Split date and time
  const [datePart, timePart] = order.dateTime.split(" ");

  // Calculate subtotal from order items
  const itemsSubtotal = order.orderItems.reduce(
    (sum, item) => sum + item.price,
    0
  );
  const deliveryCharge = order.orderAmount - itemsSubtotal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/orders")}
                className="mr-4 p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-200"
              >
                <FiArrowLeft className="text-lg" />
              </button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Order Details
                </h1>
                <p className="text-emerald-100 text-lg">
                  {order.orderId} from {order.branch}
                </p>
              </div>
            </div>
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
            >
              <FiEdit2 className="text-lg" />
              <span>Edit Order</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Information Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-emerald-600 text-white">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiPackage className="mr-2" />
                  Order Information
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {order.orderId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="text-lg font-semibold text-gray-900 flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" />
                      {datePart}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Time</p>
                    <p className="text-lg font-semibold text-gray-900 flex items-center">
                      <FiClock className="mr-2 text-gray-400" />
                      {timePart}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order Status</p>
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status === "Delivered" && (
                        <FiCheckCircle className="mr-1" />
                      )}
                      {order.status === "Cancelled" && (
                        <FiXCircle className="mr-1" />
                      )}
                      {order.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Mode</p>
                    <p className="text-lg font-semibold text-gray-900 flex items-center">
                      <FiCreditCard className="mr-2 text-gray-400" />
                      {order.paymentMode}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPaymentStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                    <p className="text-xl font-bold text-emerald-600">
                      ${order.orderAmount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Items Count</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {order.items} items
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-emerald-600 text-white">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiShoppingCart className="mr-2" />
                  Order Items
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center flex-1">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex items-center justify-center">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <FiPackage className="text-gray-400 text-2xl" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.quantity} {item.unit}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Information Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-emerald-600 text-white">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiUser className="mr-2" />
                  Customer Information
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Customer Name</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {order.customerName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {order.customerPhone || "N/A"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">
                      Delivery Address
                    </p>
                    <p className="text-lg font-semibold text-gray-900 flex items-center">
                      <FiMapPin className="mr-2 text-gray-400" />
                      {order.deliveryAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Information Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-emerald-600 text-white">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiPackage className="mr-2" />
                  Store Information
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Store Name</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {order.branch}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Store Rating</p>
                    <div className="flex items-center">
                      {order.storeRating ? (
                        <>
                          <span className="text-lg font-semibold text-gray-900 mr-2">
                            {order.storeRating}/5
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-5 w-5 ${
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
                        </>
                      ) : (
                        <span className="text-gray-500">No rating</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-6">
            {/* Delivery Information Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-emerald-600 text-white">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiTruck className="mr-2" />
                  Delivery Information
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Delivery Boy</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {order.deliveryBoyName || "Not assigned"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Delivery Boy Phone
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {order.deliveryBoyPhone || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Delivery Boy Rating
                    </p>
                    <div className="flex items-center">
                      {order.deliveryBoyRating ? (
                        <>
                          <span className="text-lg font-semibold text-gray-900 mr-2">
                            {order.deliveryBoyRating}/5
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-5 w-5 ${
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
                        </>
                      ) : (
                        <span className="text-gray-500">No rating</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Coupon Code</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {order.coupon || "No coupon applied"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bill Details Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-emerald-600 text-white">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiDollarSign className="mr-2" />
                  Bill Details
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Items Cost</p>
                    <p className="font-medium text-gray-900">
                      ${itemsSubtotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Delivery Charges</p>
                    <p className="font-medium text-gray-900">
                      ${deliveryCharge.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Coupon Discount</p>
                    <p className="font-medium text-gray-900">
                      -${(0).toFixed(2)}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <p className="text-lg font-semibold text-gray-900">
                        Total
                      </p>
                      <p className="text-lg font-semibold text-emerald-600">
                        ${order.orderAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Timeline Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-emerald-600 text-white">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiClock className="mr-2" />
                  Order Timeline
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="text-emerald-600" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Order Placed</p>
                      <p className="text-sm text-gray-500">{order.dateTime}</p>
                    </div>
                  </div>
                  {order.status !== "Pending" && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <FiCheckCircle className="text-emerald-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Order Confirmed
                        </p>
                        <p className="text-sm text-gray-500">
                          After order placement
                        </p>
                      </div>
                    </div>
                  )}
                  {order.status === "Processing" && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiClock className="text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Processing</p>
                        <p className="text-sm text-gray-500">In progress</p>
                      </div>
                    </div>
                  )}
                  {order.status === "Picked Up" && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <FiTruck className="text-indigo-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Out for Delivery
                        </p>
                        <p className="text-sm text-gray-500">On the way</p>
                      </div>
                    </div>
                  )}
                  {order.status === "Delivered" && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <FiCheckCircle className="text-emerald-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Delivered</p>
                        <p className="text-sm text-gray-500">
                          Successfully delivered
                        </p>
                      </div>
                    </div>
                  )}
                  {order.status === "Cancelled" && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <FiXCircle className="text-red-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Cancelled</p>
                        <p className="text-sm text-gray-500">
                          Order was cancelled
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <EditOrderModal
            order={order}
            onClose={() => setShowEditModal(false)}
          />
        )}
      </div>
    </div>
  );
}
