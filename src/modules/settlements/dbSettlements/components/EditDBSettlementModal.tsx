// src/modules/settlements/dbSettlements/components/EditDBSettlementModal.tsx
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { editDBSettlement, DBSettlement } from "../dbSettlementsSlice";
import { FiX, FiSave, FiCalendar, FiDollarSign } from "react-icons/fi";

export default function EditDBSettlementModal({
  settlement,
  onClose,
}: {
  settlement: DBSettlement;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    id: settlement.id,
    sno: settlement.sno,
    date: settlement.date,
    dbId: settlement.dbId,
    dbName: settlement.dbName,
    totalOrders: settlement.totalOrders,
    totalAmount: settlement.totalAmount,
    dbAmount: settlement.dbAmount,
    settlementDate: settlement.settlementDate,
    settlementId: settlement.settlementId,
    status: settlement.status,
  });

  const [errors, setErrors] = useState({
    dbId: "",
    dbName: "",
    totalOrders: "",
    totalAmount: "",
    dbAmount: "",
    settlementDate: "",
    settlementId: "",
  });

  useEffect(() => {
    setForm({
      id: settlement.id,
      sno: settlement.sno,
      date: settlement.date,
      dbId: settlement.dbId,
      dbName: settlement.dbName,
      totalOrders: settlement.totalOrders,
      totalAmount: settlement.totalAmount,
      dbAmount: settlement.dbAmount,
      settlementDate: settlement.settlementDate,
      settlementId: settlement.settlementId,
      status: settlement.status,
    });
    setErrors({
      dbId: "",
      dbName: "",
      totalOrders: "",
      totalAmount: "",
      dbAmount: "",
      settlementDate: "",
      settlementId: "",
    });
  }, [settlement]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      dbId: "",
      dbName: "",
      totalOrders: "",
      totalAmount: "",
      dbAmount: "",
      settlementDate: "",
      settlementId: "",
    };

    if (!form.dbId.trim()) {
      newErrors.dbId = "DB ID is required";
      isValid = false;
    }

    if (!form.dbName.trim()) {
      newErrors.dbName = "DB Name is required";
      isValid = false;
    }

    if (form.totalOrders <= 0) {
      newErrors.totalOrders = "Total Orders must be greater than 0";
      isValid = false;
    }

    if (form.totalAmount <= 0) {
      newErrors.totalAmount = "Total Amount must be greater than 0";
      isValid = false;
    }

    if (form.dbAmount <= 0) {
      newErrors.dbAmount = "DB Amount must be greater than 0";
      isValid = false;
    }

    if (!form.settlementDate) {
      newErrors.settlementDate = "Settlement Date is required";
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

    dispatch(editDBSettlement(form));
    onClose();
  };

  const handleClose = () => {
    setForm({
      id: settlement.id,
      sno: settlement.sno,
      date: settlement.date,
      dbId: settlement.dbId,
      dbName: settlement.dbName,
      totalOrders: settlement.totalOrders,
      totalAmount: settlement.totalAmount,
      dbAmount: settlement.dbAmount,
      settlementDate: settlement.settlementDate,
      settlementId: settlement.settlementId,
      status: settlement.status,
    });
    setErrors({
      dbId: "",
      dbName: "",
      totalOrders: "",
      totalAmount: "",
      dbAmount: "",
      settlementDate: "",
      settlementId: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Settlement</h2>
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
                  DB ID
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.dbId ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.dbId}
                  onChange={(e) => setForm({ ...form, dbId: e.target.value })}
                  placeholder="Enter DB ID"
                />
                {errors.dbId && (
                  <p className="mt-1 text-sm text-red-600">{errors.dbId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DB Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.dbName ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.dbName}
                  onChange={(e) => setForm({ ...form, dbName: e.target.value })}
                  placeholder="Enter DB Name"
                />
                {errors.dbName && (
                  <p className="mt-1 text-sm text-red-600">{errors.dbName}</p>
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
                  Total Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.totalAmount ? "border-red-500" : "border-gray-300"
                    }`}
                    value={form.totalAmount}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        totalAmount: parseFloat(e.target.value) || 0,
                      })
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
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DB Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.dbAmount ? "border-red-500" : "border-gray-300"
                    }`}
                    value={form.dbAmount}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        dbAmount: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="Enter DB amount"
                  />
                </div>
                {errors.dbAmount && (
                  <p className="mt-1 text-sm text-red-600">{errors.dbAmount}</p>
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
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.settlementDate
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={form.settlementDate}
                    onChange={(e) =>
                      setForm({ ...form, settlementDate: e.target.value })
                    }
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                {errors.settlementDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.settlementDate}
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
              Update Settlement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
