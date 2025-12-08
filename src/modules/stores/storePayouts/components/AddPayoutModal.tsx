// src/modules/shop/storePayouts/components/AddPayoutModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addPayout } from "../storePayoutsSlice";
import { FiX, FiDollarSign, FiCalendar, FiCreditCard } from "react-icons/fi";

export default function AddPayoutModal({
  stores,
  onClose,
}: {
  stores: string[];
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    storeId: "",
    amount: "",
    paymentMethod: "Bank Transfer",
    notes: "",
  });
  const [errors, setErrors] = useState({
    storeId: "",
    amount: "",
    paymentMethod: "",
  });

  const paymentMethods = ["Bank Transfer", "UPI", "PayPal", "Check"];

  const validateForm = () => {
    let isValid = true;
    const newErrors = { storeId: "", amount: "", paymentMethod: "" };

    if (!form.storeId) {
      newErrors.storeId = "Store is required";
      isValid = false;
    }

    if (!form.amount || parseFloat(form.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
      isValid = false;
    }

    if (!form.paymentMethod) {
      newErrors.paymentMethod = "Payment method is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newPayout = {
      id: `payout-${Date.now()}`,
      storeId: form.storeId,
      storeName: `Store ${form.storeId}`,
      amount: parseFloat(form.amount),
      status: "Pending" as const,
      requestDate: new Date().toISOString().slice(0, 10),
      paymentMethod: form.paymentMethod,
      notes: form.notes,
    };

    dispatch(addPayout(newPayout));
    onClose();

    // Reset form
    setForm({
      storeId: "",
      amount: "",
      paymentMethod: "Bank Transfer",
      notes: "",
    });
    setErrors({ storeId: "", amount: "", paymentMethod: "" });
  };

  const handleClose = () => {
    setForm({
      storeId: "",
      amount: "",
      paymentMethod: "Bank Transfer",
      notes: "",
    });
    setErrors({ storeId: "", amount: "", paymentMethod: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Payout</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Store
            </label>
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.storeId ? "border-[#D7201A]" : "border-gray-300"
              }`}
              value={form.storeId}
              onChange={(e) => setForm({ ...form, storeId: e.target.value })}
            >
              <option value="">Select a store</option>
              {stores.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
            {errors.storeId && (
              <p className="mt-1 text-sm text-[#D7201A]">{errors.storeId}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                  errors.amount ? "border-[#D7201A]" : "border-gray-300"
                }`}
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-[#D7201A]">{errors.amount}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.paymentMethod ? "border-[#D7201A]" : "border-gray-300"
              }`}
              value={form.paymentMethod}
              onChange={(e) =>
                setForm({ ...form, paymentMethod: e.target.value })
              }
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
            {errors.paymentMethod && (
              <p className="mt-1 text-sm text-[#D7201A]">
                {errors.paymentMethod}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
              rows={3}
              placeholder="Add any additional notes..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <FiCalendar className="mr-2" />
              Request Date: {new Date().toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FiCreditCard className="mr-2" />
              Status:{" "}
              <span className="ml-1 font-medium text-yellow-600">Pending</span>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
            >
              Add Payout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
