// src/modules/products/components/PricingModal.tsx
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

interface PricingModalProps {
  product: any;
  onClose: () => void;
  onSubmit: (pricing: any) => void;
}

export default function PricingModal({
  product,
  onClose,
  onSubmit,
}: PricingModalProps) {
  const [pricing, setPricing] = useState({
    quantity: product.pricing?.quantity || 1,
    uom: product.pricing?.uom || "kg",
    purchasePrice: product.pricing?.purchasePrice || 0,
    price: product.pricing?.price || 0,
    purchaseOffer: product.pricing?.purchaseOffer || 0,
    appSalePrice: product.pricing?.appSalePrice || 0,
    cgst: product.pricing?.cgst || 0,
    sgst: product.pricing?.sgst || 0,
    appPercentage: product.pricing?.appPercentage || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPricing({
      ...pricing,
      [name]:
        name.includes("Price") ||
        name.includes("Offer") ||
        name.includes("gst") ||
        name.includes("Percentage") ||
        name === "quantity"
          ? parseFloat(value) || 0
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pricing);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Product Pricing
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-150"
          >
            <FiX className="text-xl text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Product Details
            </h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-900">
                {product.name}
              </p>
              {product.nameInTelugu && (
                <p className="text-sm text-gray-500">{product.nameInTelugu}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={pricing.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              min="1"
              step="0.01"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="uom"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              UOM (Unit of Measure)
            </label>
            <select
              id="uom"
              name="uom"
              value={pricing.uom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            >
              <option value="">--select UOM--</option>
              <option value="kg">Kg</option>
              <option value="g">Grams</option>
              <option value="l">Liter</option>
              <option value="ml">Milliliter</option>
              <option value="pcs">Pieces</option>
              <option value="pack">Pack</option>
              <option value="box">Box</option>
              <option value="dozen">Dozen</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="purchasePrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Purchase Price
            </label>
            <input
              type="number"
              id="purchasePrice"
              name="purchasePrice"
              value={pricing.purchasePrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={pricing.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="purchaseOffer"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Purchase Offer (%)
            </label>
            <input
              type="number"
              id="purchaseOffer"
              name="purchaseOffer"
              value={pricing.purchaseOffer}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="appSalePrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              App Sale Price
            </label>
            <input
              type="number"
              id="appSalePrice"
              name="appSalePrice"
              value={pricing.appSalePrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              min="0"
              step="0.01"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cgst"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              CGST (%)
            </label>
            <input
              type="number"
              id="cgst"
              name="cgst"
              value={pricing.cgst}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="sgst"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              SGST (%)
            </label>
            <input
              type="number"
              id="sgst"
              name="sgst"
              value={pricing.sgst}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="appPercentage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              App (%)
            </label>
            <input
              type="number"
              id="appPercentage"
              name="appPercentage"
              value={pricing.appPercentage}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
