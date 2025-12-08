// src/modules/shop/storeWallet/components/AddTransactionModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addTransaction, StoreWallet } from "../storeWalletSlice";
import { FiX, FiDollarSign, FiCalendar } from "react-icons/fi";

export default function AddTransactionModal({
  wallets,
  onClose,
}: {
  wallets: StoreWallet[];
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    walletId: "",
    type: "Credit" as "Credit" | "Debit",
    amount: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [errors, setErrors] = useState({
    walletId: "",
    amount: "",
    description: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { walletId: "", amount: "", description: "" };

    if (!form.walletId) {
      newErrors.walletId = "Please select a store";
      isValid = false;
    }

    if (!form.amount || parseFloat(form.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
      isValid = false;
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const wallet = wallets.find((w) => w.id === form.walletId);
    if (wallet) {
      const currentBalance = wallet.currentBalance;
      const newBalance =
        form.type === "Credit"
          ? currentBalance + parseFloat(form.amount)
          : currentBalance - parseFloat(form.amount);

      dispatch(
        addTransaction({
          walletId: form.walletId,
          transaction: {
            id: `tx-${Date.now()}`,
            storeId: wallet.storeId,
            storeName: wallet.storeName,
            type: form.type,
            amount: parseFloat(form.amount),
            description: form.description,
            date: form.date,
            balance: newBalance,
          },
        })
      );
    }

    onClose();
    // Reset form
    setForm({
      walletId: "",
      type: "Credit",
      amount: "",
      description: "",
      date: new Date().toISOString().slice(0, 10),
    });
    setErrors({ walletId: "", amount: "", description: "" });
  };

  const handleClose = () => {
    setForm({
      walletId: "",
      type: "Credit",
      amount: "",
      description: "",
      date: new Date().toISOString().slice(0, 10),
    });
    setErrors({ walletId: "", amount: "", description: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Transaction</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Store
            </label>
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.walletId ? "border-[#D7201A]" : "border-gray-300"
              }`}
              value={form.walletId}
              onChange={(e) => setForm({ ...form, walletId: e.target.value })}
            >
              <option value="">Select a store</option>
              {wallets.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.storeName} (Current Balance: $
                  {wallet.currentBalance.toFixed(2)})
                </option>
              ))}
            </select>
            {errors.walletId && (
              <p className="mt-1 text-sm text-[#D7201A]">{errors.walletId}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Credit"
                  checked={form.type === "Credit"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value as "Credit" | "Debit",
                    })
                  }
                  className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Credit</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Debit"
                  checked={form.type === "Debit"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value as "Credit" | "Debit",
                    })
                  }
                  className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Debit</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount ($)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                step="0.01"
                min="0.01"
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
              Description
            </label>
            <textarea
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.description ? "border-[#D7201A]" : "border-gray-300"
              }`}
              rows={3}
              placeholder="Enter transaction description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            {errors.description && (
              <p className="mt-1 text-sm text-[#D7201A]">
                {errors.description}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
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
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
