// src/modules/settlements/foSettlements/components/AddFOSettlementModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addFOSettlement, FOSettlement } from "../foSettlementsSlice";
import { FiX, FiSave, FiCalendar, FiDollarSign } from "react-icons/fi";

export default function AddFOSettlementModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    foName: "",
    totalStores: 0,
    totalAmount: 0,
    totalBalAppAmount: 0,
    totalFoAmount: 0,
    settlementDate: new Date().toISOString().split("T")[0],
    settlementId: "",
    status: "COD" as "COD" | "ONLINE",
  });

  const [errors, setErrors] = useState({
    foName: "",
    totalStores: "",
    totalAmount: "",
    settlementId: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      foName: "",
      totalStores: "",
      totalAmount: "",
      settlementId: "",
    };

    if (!form.foName.trim()) {
      newErrors.foName = "FO name is required";
      isValid = false;
    }

    if (form.totalStores <= 0) {
      newErrors.totalStores = "Total stores must be greater than 0";
      isValid = false;
    }

    if (form.totalAmount <= 0) {
      newErrors.totalAmount = "Total amount must be greater than 0";
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

    // Calculate FO amount if not provided
    const totalFoAmount =
      form.totalFoAmount || form.totalAmount - form.totalBalAppAmount;

    dispatch(
      addFOSettlement({
        ...form,
        totalFoAmount,
        date: new Date().toISOString().split("T")[0],
      })
    );
    onClose();
  };

  const handleClose = () => {
    setForm({
      foName: "",
      totalStores: 0,
      totalAmount: 0,
      totalBalAppAmount: 0,
      totalFoAmount: 0,
      settlementDate: new Date().toISOString().split("T")[0],
      settlementId: "",
      status: "COD",
    });
    setErrors({
      foName: "",
      totalStores: "",
      totalAmount: "",
      settlementId: "",
    });
    onClose();
  };

  const handleAmountChange = (value: number) => {
    setForm({
      ...form,
      totalAmount: value,
      totalFoAmount: value - form.totalBalAppAmount,
    });
  };

  const handleBalAppAmountChange = (value: number) => {
    setForm({
      ...form,
      totalBalAppAmount: value,
      totalFoAmount: form.totalAmount - value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New FO Settlement</h2>
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
                  FO Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.foName ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.foName}
                  onChange={(e) => setForm({ ...form, foName: e.target.value })}
                  placeholder="Enter FO name"
                />
                {errors.foName && (
                  <p className="mt-1 text-sm text-red-600">{errors.foName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Stores
                </label>
                <input
                  type="number"
                  min="1"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.totalStores ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.totalStores}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      totalStores: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter total stores"
                />
                {errors.totalStores && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.totalStores}
                  </p>
                )}
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
                  Settlement Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    value={form.settlementDate}
                    onChange={(e) =>
                      setForm({ ...form, settlementDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Amount (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.totalAmount ? "border-red-500" : "border-gray-300"
                    }`}
                    value={form.totalAmount}
                    onChange={(e) =>
                      handleAmountChange(parseInt(e.target.value) || 0)
                    }
                    placeholder="Enter total amount"
                  />
                </div>
                {errors.totalAmount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.totalAmount}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Bal App Amount (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    value={form.totalBalAppAmount}
                    onChange={(e) =>
                      handleBalAppAmountChange(parseInt(e.target.value) || 0)
                    }
                    placeholder="Enter total Bal App amount"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Total FO Amount: ₹{form.totalAmount - form.totalBalAppAmount}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total FO Amount (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    value={form.totalFoAmount}
                    readOnly
                    placeholder="Auto-calculated"
                  />
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
                      value="COD"
                      checked={form.status === "COD"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: e.target.value as "COD" | "ONLINE",
                        })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">COD</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="ONLINE"
                      checked={form.status === "ONLINE"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: e.target.value as "COD" | "ONLINE",
                        })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">ONLINE</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 mt-6">
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
