// src/modules/masterStore/components/EditProductModal.tsx
import React, { useState, useRef } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { editProduct } from "../productsSlice";
import { Product } from "../productsSlice";
import { FiX, FiUpload, FiImage } from "react-icons/fi";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function EditProductModal({
  product,
  onClose,
}: EditProductModalProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name,
    price: product.price,
    stocks: product.stocks,
    calories: product.calories,
    fat: product.fat,
    carb: product.carb,
    protein: product.protein,
    section: product.section,
    category: product.category,
    subCategory: product.subCategory,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    product.image
  );
  const [nxImagePreview, setNxImagePreview] = useState<string | null>(
    product.nxImage
  );
  const [imageChanged, setImageChanged] = useState(false);
  const [nxImageChanged, setNxImageChanged] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const nxImageInputRef = useRef<HTMLInputElement>(null);

  const sections = ["Food", "Beverages", "Dairy", "Snacks", "Frozen"];

  const categories = {
    Food: ["Vegetables", "Fruits", "Grains", "Meat", "Seafood"],
    Beverages: ["Juices", "Sodas", "Tea", "Coffee", "Water"],
    Dairy: ["Milk", "Cheese", "Yogurt", "Butter", "Cream"],
    Snacks: ["Chips", "Cookies", "Nuts", "Candy", "Crackers"],
    Frozen: ["Meals", "FrozenVegetables", "FrozenFruits", "Desserts", "Pizza"],
  };

  const subCategories = {
    Vegetables: [
      "Leafy Greens",
      "Root Vegetables",
      "Cruciferous",
      "Allium",
      "Podded",
    ],
    Fruits: ["Citrus", "Berries", "Tropical", "Stone Fruits", "Pomes"],
    Grains: ["Wheat", "Rice", "Corn", "Barley", "Oats"],
    Meat: ["Beef", "Pork", "Chicken", "Lamb", "Turkey"],
    Seafood: ["Fish", "Shellfish", "Crustaceans", "Mollusks", "Echinoderms"],
    Juices: [
      "Fruit Juice",
      "Vegetable Juice",
      "Smoothies",
      "Concentrates",
      "Fresh",
    ],
    Sodas: ["Cola", "Lemon-Lime", "Orange", "Ginger Ale", "Root Beer"],
    Tea: ["Black", "Green", "Herbal", "Oolong", "White"],
    Coffee: ["Espresso", "Cappuccino", "Latte", "Americano", "Cold Brew"],
    Water: ["Mineral", "Spring", "Sparkling", "Distilled", "Flavored"],
    Milk: ["Whole", "Skim", "Low-Fat", "Lactose-Free", "Organic"],
    Cheese: ["Cheddar", "Mozzarella", "Swiss", "Blue", "Feta"],
    Yogurt: ["Greek", "Regular", "Flavored", "Frozen", "Drinkable"],
    Butter: ["Salted", "Unsalted", "Whipped", "Clarified", "Plant-Based"],
    Cream: ["Heavy", "Light", "Whipping", "Sour", "Half-and-Half"],
    Chips: ["Potato", "Tortilla", "Veggie", "Kale", "Pita"],
    Cookies: [
      "Chocolate Chip",
      "Oatmeal",
      "Sugar",
      "Peanut Butter",
      "Shortbread",
    ],
    Nuts: ["Almonds", "Walnuts", "Cashews", "Peanuts", "Pistachios"],
    Candy: ["Chocolate", "Gummies", "Hard Candy", "Chewy", "Sour"],
    Crackers: ["Cheese", "Whole Wheat", "Rice", "Water", "Animal"],
    Meals: ["Dinners", "Lunches", "Breakfast", "Appetizers", "Side Dishes"],
    FrozenVegetables: ["Mixed", "Single", "Steamed", "Seasoned", "Plain"],
    FrozenFruits: [
      "Mixed Berries",
      "Tropical",
      "Melon",
      "Citrus",
      "Stone Fruits",
    ],
    Desserts: ["Ice Cream", "Pies", "Cakes", "Pastries", "Pudding"],
    Pizza: ["Cheese", "Pepperoni", "Veggie", "Meat Lovers", "Supreme"],
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "stocks" ||
        name === "calories" ||
        name === "fat" ||
        name === "carb" ||
        name === "protein"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const section = e.target.value;
    const category = categories[section][0];
    const subCategory = subCategories[category][0];

    setFormData((prev) => ({
      ...prev,
      section,
      category,
      subCategory,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    const subCategory = subCategories[category][0];

    setFormData((prev) => ({
      ...prev,
      category,
      subCategory,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNxImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNxImagePreview(reader.result as string);
        setNxImageChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Only update images if they were changed
    const updatedProduct = {
      ...formData,
      image: imageChanged ? imagePreview || product.image : product.image,
      nxImage: nxImageChanged
        ? nxImagePreview || product.nxImage
        : product.nxImage,
    };

    dispatch(editProduct(updatedProduct));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 my-8">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Edit Product</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
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
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="stocks"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="stocks"
                    name="stocks"
                    value={formData.stocks}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="section"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Section
                  </label>
                  <select
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleSectionChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  >
                    {sections.map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  >
                    {categories[formData.section].map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subCategory"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Sub Category
                  </label>
                  <select
                    id="subCategory"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  >
                    {subCategories[formData.category].map((subCategory) => (
                      <option key={subCategory} value={subCategory}>
                        {subCategory}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label
                    htmlFor="calories"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Calories
                  </label>
                  <input
                    type="number"
                    id="calories"
                    name="calories"
                    value={formData.calories}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="fat"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Fat (g)
                  </label>
                  <input
                    type="number"
                    id="fat"
                    name="fat"
                    value={formData.fat}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="carb"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    id="carb"
                    name="carb"
                    value={formData.carb}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="protein"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    id="protein"
                    name="protein"
                    value={formData.protein}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-emerald-500 transition-colors duration-200">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="mx-auto h-32 w-32 object-cover rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(product.image);
                            setImageChanged(false);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
                      >
                        <span>Upload a file</span>
                        <input
                          ref={imageInputRef}
                          id="image-upload"
                          name="image-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NX Product Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-emerald-500 transition-colors duration-200">
                  <div className="space-y-1 text-center">
                    {nxImagePreview ? (
                      <div className="relative">
                        <img
                          src={nxImagePreview}
                          alt="NX Product preview"
                          className="mx-auto h-32 w-32 object-cover rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setNxImagePreview(product.nxImage);
                            setNxImageChanged(false);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="nx-image-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
                      >
                        <span>Upload a file</span>
                        <input
                          ref={nxImageInputRef}
                          id="nx-image-upload"
                          name="nx-image-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleNxImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-lg hover:from-emerald-700 hover:to-teal-800 transition-all duration-200 shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
