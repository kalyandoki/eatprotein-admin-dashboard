// src/modules/products/CategoryListPage.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategories } from "../categorySlice";
import { FiShoppingBag } from "react-icons/fi";

export default function CategoryListPage() {
  const dispatch = useAppDispatch();
  const { categories, status } = useAppSelector(
    (state) => state.productCategory
  );
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") dispatch(fetchCategories());
  }, [status, dispatch]);

  const handleCategoryClick = (categoryName: string) => {
    navigate(
      `/stores/store-products/${storeId}/category-list/${categoryName.toLowerCase()}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Product Categories
          </h1>
          <p className="text-emerald-100 text-lg">
            Select a category to manage products
          </p>
        </div>

        {status === "loading" ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Loading categories...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-200 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
