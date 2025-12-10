// src/modules/users/customers/components/EditCustomerModal.tsx
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { editCustomer, Customer } from "../customersSlice";
import { FiX, FiSave } from "react-icons/fi";

export default function EditCustomerModal({
  customer,
  onClose,
}: {
  customer: Customer;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ ...customer });
  const [errors, setErrors] = useState({ name: "", phone: "" });

  useEffect(() => {
    setForm({ ...customer });
    setErrors({ name: "", phone: "" });
  }, [customer]);

  const validateForm = () => {
    const newErrors = { name: "", phone: "" };
    let isValid = true;
    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "A valid 10-digit phone number is required.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    dispatch(editCustomer(form));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Customer</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FiX className="text-xl" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
              }
              maxLength={10}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as "Direct" | "Referral",
                  })
                }
              >
                <option value="Direct">Direct</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Device
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                value={form.device}
                onChange={(e) =>
                  setForm({
                    ...form,
                    device: e.target.value as "WEB" | "ANDROID" | "IOS",
                  })
                }
              >
                <option value="WEB">Web</option>
                <option value="ANDROID">Android</option>
                <option value="IOS">iOS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as "Active" | "Inactive",
                  })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
          >
            <FiSave className="text-sm" />
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
