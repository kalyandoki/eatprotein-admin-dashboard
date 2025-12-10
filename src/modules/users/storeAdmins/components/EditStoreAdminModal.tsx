// src/modules/users/storeAdmins/components/EditStoreAdminModal.tsx
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { editStoreAdmin, StoreAdmin } from "../storeAdminsSlice";
import { FiX, FiSave } from "react-icons/fi";

export default function EditStoreAdminModal({
  admin,
  onClose,
}: {
  admin: StoreAdmin;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    id: admin.id,
    sno: admin.sno,
    name: admin.name,
    contactNo: admin.contactNo,
    storeName: admin.storeName,
    city: admin.city,
    status: admin.status as "Active" | "Inactive",
  });

  const [errors, setErrors] = useState({
    name: "",
    contactNo: "",
    storeName: "",
    city: "",
  });

  useEffect(() => {
    setForm({
      id: admin.id,
      sno: admin.sno,
      name: admin.name,
      contactNo: admin.contactNo,
      storeName: admin.storeName,
      city: admin.city,
      status: admin.status,
    });
    setErrors({
      name: "",
      contactNo: "",
      storeName: "",
      city: "",
    });
  }, [admin]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      contactNo: "",
      storeName: "",
      city: "",
    };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!form.contactNo.trim()) {
      newErrors.contactNo = "Contact number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(form.contactNo)) {
      newErrors.contactNo = "Please enter a valid 10-digit contact number";
      isValid = false;
    }

    if (!form.storeName.trim()) {
      newErrors.storeName = "Store name is required";
      isValid = false;
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    dispatch(editStoreAdmin(form));
    onClose();
  };

  const handleClose = () => {
    setForm({
      id: admin.id,
      sno: admin.sno,
      name: admin.name,
      contactNo: admin.contactNo,
      storeName: admin.storeName,
      city: admin.city,
      status: admin.status,
    });
    setErrors({
      name: "",
      contactNo: "",
      storeName: "",
      city: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Store Admin</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                  errors.contactNo ? "border-red-500" : "border-gray-300"
                }`}
                value={form.contactNo}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contactNo: e.target.value.replace(/\D/g, ""),
                  })
                }
                placeholder="Enter 10-digit contact number"
                maxLength={10}
              />
              {errors.contactNo && (
                <p className="mt-1 text-sm text-red-600">{errors.contactNo}</p>
              )}
            </div>

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
                <p className="mt-1 text-sm text-red-600">{errors.storeName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Enter city"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
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
                    value="Active"
                    checked={form.status === "Active"}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as "Active" | "Inactive",
                      })
                    }
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={form.status === "Inactive"}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as "Active" | "Inactive",
                      })
                    }
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Inactive</span>
                </label>
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
              Update Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
