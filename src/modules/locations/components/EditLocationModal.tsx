// src/modules/shop/locations/components/EditLocationModal.tsx
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { editLocation, Location } from "../locationsSlice";
import { FiX, FiSave } from "react-icons/fi";

export default function EditLocationModal({
  location,
  onClose,
}: {
  location: Location;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    city: location.city,
    areaName: location.areaName,
    status: location.status as "Active" | "Inactive",
  });

  const [errors, setErrors] = useState({
    city: "",
    areaName: "",
  });

  useEffect(() => {
    setForm({
      city: location.city,
      areaName: location.areaName,
      status: location.status,
    });
    setErrors({
      city: "",
      areaName: "",
    });
  }, [location]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      city: "",
      areaName: "",
    };

    if (!form.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!form.areaName.trim()) {
      newErrors.areaName = "Area name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    dispatch(
      editLocation({
        ...location,
        ...form,
      })
    );
    onClose();
  };

  const handleClose = () => {
    setForm({
      city: location.city,
      areaName: location.areaName,
      status: location.status,
    });
    setErrors({
      city: "",
      areaName: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Location</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
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
                placeholder="Enter city name"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area Name
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                  errors.areaName ? "border-red-500" : "border-gray-300"
                }`}
                value={form.areaName}
                onChange={(e) => setForm({ ...form, areaName: e.target.value })}
                placeholder="Enter area name"
              />
              {errors.areaName && (
                <p className="mt-1 text-sm text-red-600">{errors.areaName}</p>
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

          <div className="flex justify-end gap-3 mt-6">
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
              Update Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
