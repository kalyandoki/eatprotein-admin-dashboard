// src/modules/coupons/storeCoupons/components/AddStoreCouponModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addStoreCoupon, StoreCoupon } from "../storeCouponsSlice";
import { FiX, FiSave, FiUpload } from "react-icons/fi";

export default function AddStoreCouponModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    couponCode: "",
    couponPercentage: 0,
    couponImage: "",
    validity: "",
    status: "Active" as "Active" | "Inactive" | "In Progress" | "Expired",
    totalOrders: 0, // Added Total Orders field
  });

  const [errors, setErrors] = useState({
    couponCode: "",
    couponPercentage: "",
    couponImage: "",
    validity: "",
    totalOrders: "", // Added Total Orders error field
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      couponCode: "",
      couponPercentage: "",
      couponImage: "",
      validity: "",
      totalOrders: "", // Added Total Orders error field
    };

    if (!form.couponCode.trim()) {
      newErrors.couponCode = "Coupon code is required";
      isValid = false;
    }

    if (form.couponPercentage <= 0 || form.couponPercentage > 100) {
      newErrors.couponPercentage =
        "Coupon percentage must be between 1 and 100";
      isValid = false;
    }

    if (!form.validity) {
      newErrors.validity = "Validity date is required";
      isValid = false;
    }

    if (!form.couponImage) {
      newErrors.couponImage = "Coupon image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const couponData = {
      ...form,
      couponName: form.couponCode, // Use coupon code as name for display
    };

    dispatch(addStoreCoupon(couponData));
    onClose();
  };

  const handleClose = () => {
    setForm({
      couponCode: "",
      couponPercentage: 0,
      couponImage: "",
      validity: "",
      status: "Active",
      totalOrders: 0,
    });
    setErrors({
      couponCode: "",
      couponPercentage: "",
      couponImage: "",
      validity: "",
      totalOrders: "", // Added Total Orders error field
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
        setForm({ ...form, couponImage: result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Store Coupon</h2>
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
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.couponCode ? "border-red-500" : "border-gray-300"
                    }`}
                    value={form.couponCode}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        couponCode: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="Enter coupon code"
                    maxLength={10}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, couponCode: generateCouponCode() })
                    }
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
                  >
                    Generate
                  </button>
                </div>
                {errors.couponCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.couponCode}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Percentage (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.couponPercentage
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  value={form.couponPercentage}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      couponPercentage: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter percentage"
                />
                {errors.couponPercentage && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.couponPercentage}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Orders
                </label>
                <input
                  type="number"
                  min="0"
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
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Validity Date
                </label>
                <input
                  type="date"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.validity ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.validity}
                  onChange={(e) =>
                    setForm({ ...form, validity: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.validity && (
                  <p className="mt-1 text-sm text-red-600">{errors.validity}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Image
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
                            alt="Coupon preview"
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
                {errors.couponImage && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.couponImage}
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
                          status: e.target.value as
                            | "Active"
                            | "Inactive"
                            | "In Progress"
                            | "Expired",
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
                          status: e.target.value as
                            | "Active"
                            | "Inactive"
                            | "In Progress"
                            | "Expired",
                        })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Inactive</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="In Progress"
                      checked={form.status === "In Progress"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: e.target.value as
                            | "Active"
                            | "Inactive"
                            | "In Progress"
                            | "Expired",
                        })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      In Progress
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Expired"
                      checked={form.status === "Expired"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: e.target.value as
                            | "Active"
                            | "Inactive"
                            | "In Progress"
                            | "Expired",
                        })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Expired</span>
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
              Add Coupon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
