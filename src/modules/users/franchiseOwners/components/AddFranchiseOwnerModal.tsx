// src/modules/users/franchiseOwners/components/AddFranchiseOwnerModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addFranchiseOwner, FranchiseOwner } from "../franchiseOwnersSlice";
import { FiX, FiSave, FiUpload } from "react-icons/fi";

export default function AddFranchiseOwnerModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    profileImage: "",
    userName: "",
    contactNo: "",
    location: "",
    radius: 0,
    percentage: 0,
    status: "Active" as "Active" | "Inactive",
  });

  const [errors, setErrors] = useState({
    profileImage: "",
    userName: "",
    contactNo: "",
    location: "",
    radius: "",
    percentage: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      profileImage: "",
      userName: "",
      contactNo: "",
      location: "",
      radius: "",
      percentage: "",
    };

    if (!form.profileImage) {
      newErrors.profileImage = "Profile image is required";
      isValid = false;
    }

    if (!form.userName.trim()) {
      newErrors.userName = "User name is required";
      isValid = false;
    }

    if (!form.contactNo.trim()) {
      newErrors.contactNo = "Contact number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(form.contactNo)) {
      newErrors.contactNo = "Please enter a valid 10-digit contact number";
      isValid = false;
    }

    if (!form.location.trim()) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    if (form.radius <= 0) {
      newErrors.radius = "Radius must be greater than 0";
      isValid = false;
    }

    if (form.percentage <= 0 || form.percentage > 100) {
      newErrors.percentage = "Percentage must be between 1 and 100";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    dispatch(addFranchiseOwner(form));
    onClose();
  };

  const handleClose = () => {
    setForm({
      profileImage: "",
      userName: "",
      contactNo: "",
      location: "",
      radius: 0,
      percentage: 0,
      status: "Active",
    });
    setErrors({
      profileImage: "",
      userName: "",
      contactNo: "",
      location: "",
      radius: "",
      percentage: "",
    });
    setImagePreview("");
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        setForm({ ...form, profileImage: result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Franchise Owner</h2>
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
                  User Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.userName ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.userName}
                  onChange={(e) =>
                    setForm({ ...form, userName: e.target.value })
                  }
                  placeholder="Enter user name"
                />
                {errors.userName && (
                  <p className="mt-1 text-sm text-red-600">{errors.userName}</p>
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
                  <p className="mt-1 text-sm text-red-600">
                    {errors.contactNo}
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
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="Enter location"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Radius (km)
                </label>
                <input
                  type="number"
                  min="1"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.radius ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.radius}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      radius: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter radius in km"
                />
                {errors.radius && (
                  <p className="mt-1 text-sm text-red-600">{errors.radius}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Percentage (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.percentage ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.percentage}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      percentage: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter percentage"
                />
                {errors.percentage && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.percentage}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <div className="text-center">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Profile preview"
                            className="h-full w-full object-cover rounded"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <FiUpload className="text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">
                              Click to upload image
                            </span>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
                {errors.profileImage && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.profileImage}
                  </p>
                )}
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
              Add Owner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
