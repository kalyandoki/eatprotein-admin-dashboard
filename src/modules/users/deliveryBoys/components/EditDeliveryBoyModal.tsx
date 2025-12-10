// src/modules/users/deliveryBoys/components/EditDeliveryBoyModal.tsx
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { editDeliveryBoy, DeliveryBoy } from "../deliveryBoysSlice";
import { FiX, FiSave } from "react-icons/fi";

export default function EditDeliveryBoyModal({
  deliveryBoy,
  onClose,
}: {
  deliveryBoy: DeliveryBoy;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    id: deliveryBoy.id,
    sno: deliveryBoy.sno,
    userId: deliveryBoy.userId,
    name: deliveryBoy.name,
    contactNo: deliveryBoy.contactNo,
    franchiseOwner: deliveryBoy.franchiseOwner,
    location: deliveryBoy.location,
    available: deliveryBoy.available,
    accountStatus: deliveryBoy.accountStatus as "Active" | "Inactive",
  });

  const [errors, setErrors] = useState({
    name: "",
    contactNo: "",
    franchiseOwner: "",
    location: "",
  });

  useEffect(() => {
    setForm({
      id: deliveryBoy.id,
      sno: deliveryBoy.sno,
      userId: deliveryBoy.userId,
      name: deliveryBoy.name,
      contactNo: deliveryBoy.contactNo,
      franchiseOwner: deliveryBoy.franchiseOwner,
      location: deliveryBoy.location,
      available: deliveryBoy.available,
      accountStatus: deliveryBoy.accountStatus,
    });
    setErrors({
      name: "",
      contactNo: "",
      franchiseOwner: "",
      location: "",
    });
  }, [deliveryBoy]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      contactNo: "",
      franchiseOwner: "",
      location: "",
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

    if (!form.franchiseOwner.trim()) {
      newErrors.franchiseOwner = "Franchise owner is required";
      isValid = false;
    }

    if (!form.location.trim()) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    dispatch(editDeliveryBoy(form));
    onClose();
  };

  const handleClose = () => {
    setForm({
      id: deliveryBoy.id,
      sno: deliveryBoy.sno,
      userId: deliveryBoy.userId,
      name: deliveryBoy.name,
      contactNo: deliveryBoy.contactNo,
      franchiseOwner: deliveryBoy.franchiseOwner,
      location: deliveryBoy.location,
      available: deliveryBoy.available,
      accountStatus: deliveryBoy.accountStatus,
    });
    setErrors({
      name: "",
      contactNo: "",
      franchiseOwner: "",
      location: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Delivery Boy</h2>
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
                User ID
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
                disabled
              />
            </div>

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
                Franchise Owner
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                  errors.franchiseOwner ? "border-red-500" : "border-gray-300"
                }`}
                value={form.franchiseOwner}
                onChange={(e) =>
                  setForm({ ...form, franchiseOwner: e.target.value })
                }
                placeholder="Enter franchise owner name"
              />
              {errors.franchiseOwner && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.franchiseOwner}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Enter location"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="available"
                      value={true}
                      checked={form.available === true}
                      onChange={() => setForm({ ...form, available: true })}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Available
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="available"
                      value={false}
                      checked={form.available === false}
                      onChange={() => setForm({ ...form, available: false })}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Not Available
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Status
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="accountStatus"
                      value="Active"
                      checked={form.accountStatus === "Active"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          accountStatus: e.target.value as
                            | "Active"
                            | "Inactive",
                        })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="accountStatus"
                      value="Inactive"
                      checked={form.accountStatus === "Inactive"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          accountStatus: e.target.value as
                            | "Active"
                            | "Inactive",
                        })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Inactive</span>
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
              Update Delivery Boy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
