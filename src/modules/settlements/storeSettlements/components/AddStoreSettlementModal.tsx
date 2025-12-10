// src/modules/settlements/storeSettlements/components/AddStoreSettlementModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addStoreSettlement, StoreSettlement } from "../storeSettlementsSlice";
import { FiX, FiSave, FiCalendar } from "react-icons/fi";

export default function AddStoreSettlementModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    storeName: "",
    totalOrders: 0,
    storeAmount: 0,
    tax: 0,
    totalAmount: 0,
    settlementDate: new Date().toISOString().split("T")[0],
    settlementId: "",
    paymentType: "COD" as "COD" | "ONLINE",
    status: "Pending" as "Pending" | "Completed" | "Failed",
  });

  const [errors, setErrors] = useState({
    storeName: "",
    totalOrders: "",
    storeAmount: "",
    settlementDate: "",
    settlementId: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      storeName: "",
      totalOrders: "",
      storeAmount: "",
      settlementDate: "",
      settlementId: "",
    };

    if (!form.storeName.trim()) {
      newErrors.storeName = "Store name is required";
      isValid = false;
    }

    if (form.totalOrders <= 0) {
      newErrors.totalOrders = "Total orders must be greater than 0";
      isValid = false;
    }

    if (form.storeAmount <= 0) {
      newErrors.storeAmount = "Store amount must be greater than 0";
      isValid = false;
    }

    if (!form.settlementDate) {
      newErrors.settlementDate = "Settlement date is required";
      isValid = false;
    }

    if (!form.settlementId.trim()) {
      newErrors.settlementId = "Settlement ID is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Calculate total amount if not provided
    const totalAmount = form.totalAmount || form.storeAmount + form.tax;

    dispatch(
      addStoreSettlement({
        ...form,
        totalAmount,
      })
    );
    onClose();
  };

  const handleClose = () => {
    setForm({
      storeName: "",
      totalOrders: 0,
      storeAmount: 0,
      tax: 0,
      totalAmount: 0,
      settlementDate: new Date().toISOString().split("T")[0],
      settlementId: "",
      paymentType: "COD",
      status: "Pending",
    });
    setErrors({
      storeName: "",
      totalOrders: "",
      storeAmount: "",
      settlementDate: "",
      settlementId: "",
    });
    onClose();
  };

  // Calculate tax and total amount when store amount changes
  const handleStoreAmountChange = (value: number) => {
    const taxPercentage = 10; // Default tax percentage
    const tax = Math.floor(value * (taxPercentage / 100));
    const totalAmount = value + tax;

    setForm({
      ...form,
      storeAmount: value,
      tax,
      totalAmount,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Settlement</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.storeName ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.storeName}
                  onChange={(e) =>
                    setForm({ ...form, storeName: e.target.value })
                  }
                  placeholder="Enter store name"
                />
                {errors.storeName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.storeName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Orders
                </label>
                <input
                  type="number"
                  min="1"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.totalOrders ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.totalOrders}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      totalOrders: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter total orders"
                />
                {errors.totalOrders && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.totalOrders}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Amount
                </label>
                <input
                  type="number"
                  min="1"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.storeAmount ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.storeAmount}
                  onChange={(e) =>
                    handleStoreAmountChange(parseInt(e.target.value) || 0)
                  }
                  placeholder="Enter store amount"
                />
                {errors.storeAmount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.storeAmount}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax (10%)
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  value={form.tax}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Amount
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  value={form.totalAmount}
                  readOnly
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Settlement Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.settlementDate
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={form.settlementDate}
                    onChange={(e) =>
                      setForm({ ...form, settlementDate: e.target.value })
                    }
                  />
                  {errors.settlementDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.settlementDate}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Settlement ID
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.settlementId ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.settlementId}
                  onChange={(e) =>
                    setForm({ ...form, settlementId: e.target.value })
                  }
                  placeholder="Enter settlement ID"
                />
                {errors.settlementId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.settlementId}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentType"
                      value="COD"
                      checked={form.paymentType === "COD"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          paymentType: e.target.value as "COD" | "ONLINE",
                        })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">COD</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentType"
                      value="ONLINE"
                      checked={form.paymentType === "ONLINE"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          paymentType: e.target.value as "COD" | "ONLINE",
                        })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">ONLINE</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Pending"
                      checked={form.status === "Pending"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: e.target.value as
                            | "Pending"
                            | "Completed"
                            | "Failed",
                        })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Pending</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Completed"
                      checked={form.status === "Completed"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: e.target.value as
                            | "Pending"
                            | "Completed"
                            | "Failed",
                        })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Completed
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Failed"
                      checked={form.status === "Failed"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: e.target.value as
                            | "Pending"
                            | "Completed"
                            | "Failed",
                        })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Failed</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2"
            >
              <FiSave className="text-sm" />
              Add Settlement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
