// src/modules/orders/components/AddOrderModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { addOrder, Order } from "../orderSlice";
import { FiX } from "react-icons/fi";

export default function AddOrderModal({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<Partial<Order>>({
    orderId: "",
    branch: "",
    dateTime: new Date().toISOString().slice(0, 16),
    orderAmount: 0,
    customerName: "",
    deliveryAddress: "",
    coupon: "",
    status: "Pending",
    paymentMode: "COD",
    paymentStatus: "Pending",
    storeRating: 0,
    deliveryBoyRating: 0,
    items: 1,
  });

  const [errors, setErrors] = useState({
    orderId: "",
    branch: "",
    customerName: "",
    deliveryAddress: "",
    orderAmount: "",
  });

  const branches = [
    "Madhina Chicken & Mutton Center",
    "Downtown Store",
    "Mall Branch",
    "Airport Terminal",
  ];

  const paymentModes = ["COD", "Credit Card", "PayPal", "UPI"];

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      orderId: "",
      branch: "",
      customerName: "",
      deliveryAddress: "",
      orderAmount: "",
    };

    if (!form.orderId?.trim()) {
      newErrors.orderId = "Order ID is required";
      isValid = false;
    }

    if (!form.branch?.trim()) {
      newErrors.branch = "Branch is required";
      isValid = false;
    }

    if (!form.customerName?.trim()) {
      newErrors.customerName = "Customer name is required";
      isValid = false;
    }

    if (!form.deliveryAddress?.trim()) {
      newErrors.deliveryAddress = "Delivery address is required";
      isValid = false;
    }

    if (!form.orderAmount || form.orderAmount <= 0) {
      newErrors.orderAmount = "Order amount must be greater than 0";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    dispatch(addOrder(form as Order));
    onClose();
    // Reset form
    setForm({
      orderId: "",
      branch: "",
      dateTime: new Date().toISOString().slice(0, 16),
      orderAmount: 0,
      customerName: "",
      deliveryAddress: "",
      coupon: "",
      status: "Pending",
      paymentMode: "COD",
      paymentStatus: "Pending",
      storeRating: 0,
      deliveryBoyRating: 0,
      items: 1,
    });
    setErrors({
      orderId: "",
      branch: "",
      customerName: "",
      deliveryAddress: "",
      orderAmount: "",
    });
  };

  const handleClose = () => {
    setForm({
      orderId: "",
      branch: "",
      dateTime: new Date().toISOString().slice(0, 16),
      orderAmount: 0,
      customerName: "",
      deliveryAddress: "",
      coupon: "",
      status: "Pending",
      paymentMode: "COD",
      paymentStatus: "Pending",
      storeRating: 0,
      deliveryBoyRating: 0,
      items: 1,
    });
    setErrors({
      orderId: "",
      branch: "",
      customerName: "",
      deliveryAddress: "",
      orderAmount: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl transform transition-all max-h-[90vh] overflow-y-auto">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Order</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order ID
              </label>
              <input
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                  errors.orderId ? "border-[#D7201A]" : "border-gray-300"
                }`}
                placeholder="Enter order ID"
                value={form.orderId}
                onChange={(e) => setForm({ ...form, orderId: e.target.value })}
              />
              {errors.orderId && (
                <p className="mt-1 text-sm text-[#D7201A]">{errors.orderId}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branch
              </label>
              <select
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                  errors.branch ? "border-[#D7201A]" : "border-gray-300"
                }`}
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
              {errors.branch && (
                <p className="mt-1 text-sm text-[#D7201A]">{errors.branch}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
                value={form.dateTime}
                onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Amount
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                  errors.orderAmount ? "border-[#D7201A]" : "border-gray-300"
                }`}
                placeholder="Enter order amount"
                value={form.orderAmount}
                onChange={(e) =>
                  setForm({ ...form, orderAmount: parseFloat(e.target.value) })
                }
              />
              {errors.orderAmount && (
                <p className="mt-1 text-sm text-[#D7201A]">
                  {errors.orderAmount}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name
              </label>
              <input
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                  errors.customerName ? "border-[#D7201A]" : "border-gray-300"
                }`}
                placeholder="Enter customer name"
                value={form.customerName}
                onChange={(e) =>
                  setForm({ ...form, customerName: e.target.value })
                }
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-[#D7201A]">
                  {errors.customerName}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address
              </label>
              <input
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                  errors.deliveryAddress
                    ? "border-[#D7201A]"
                    : "border-gray-300"
                }`}
                placeholder="Enter delivery address"
                value={form.deliveryAddress}
                onChange={(e) =>
                  setForm({ ...form, deliveryAddress: e.target.value })
                }
              />
              {errors.deliveryAddress && (
                <p className="mt-1 text-sm text-[#D7201A]">
                  {errors.deliveryAddress}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coupon
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
                placeholder="Enter coupon code"
                value={form.coupon}
                onChange={(e) => setForm({ ...form, coupon: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Mode
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
                value={form.paymentMode}
                onChange={(e) =>
                  setForm({ ...form, paymentMode: e.target.value })
                }
              >
                {paymentModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as Order["status"],
                  })
                }
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Picked Up">Picked Up</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Status
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
                value={form.paymentStatus}
                onChange={(e) =>
                  setForm({
                    ...form,
                    paymentStatus: e.target.value as
                      | "Paid"
                      | "Pending"
                      | "Failed",
                  })
                }
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Items
              </label>
              <input
                type="number"
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
                value={form.items}
                onChange={(e) =>
                  setForm({ ...form, items: parseInt(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
            >
              Add Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
