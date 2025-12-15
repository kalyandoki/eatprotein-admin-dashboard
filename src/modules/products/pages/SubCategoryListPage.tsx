// src/modules/products/SubCategoryListPage.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSubCategories } from "../subCategorySlice";
import { fetchCategories } from "../categorySlice";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";

export default function SubCategoryListPage() {
  const dispatch = useAppDispatch();
  const { subCategories, status } = useAppSelector(
    (state) => state.productSubCategories
  );
  const { categories } = useAppSelector((state) => state.productCategory);
  const { storeId, categoryName } = useParams<{
    storeId: string;
    categoryName: string;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [categories.length, dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      const category = categories.find(
        (c) => c.name.toLowerCase() === categoryName
      );
      if (category) {
        dispatch(fetchSubCategories(category.id));
      }
    }
  }, [categories, categoryName, dispatch]);

  const handleSubCategoryClick = (subCategoryName: string) => {
    navigate(
      `/stores/store-products/${storeId}/category-list/${categoryName}/${subCategoryName.toLowerCase()}`
    );
  };

  const handleBack = () => {
    navigate(`/stores/store-products/${storeId}/category-list`);
  };

  const getCategoryName = () => {
    const category = categories.find(
      (c) => c.name.toLowerCase() === categoryName
    );
    return category ? category.name : categoryName;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            <button
              onClick={handleBack}
              className="mr-4 p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-200"
            >
              <FiArrowLeft className="text-xl" />
            </button>
            <h1 className="text-3xl md:text-4xl font-bold">
              {getCategoryName()} Sub-Categories
            </h1>
          </div>
          <p className="text-emerald-100 text-lg">
            Select a sub-category to manage products
          </p>
        </div>

        {status === "loading" ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Loading sub-categories...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Sub-Categories ({subCategories.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subCategories.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <FiShoppingBag className="h-12 w-12 text-gray-400" />
                          </div>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">
                            No sub-categories found
                          </h3>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    subCategories.map((subCategory) => (
                      <tr
                        key={subCategory.id}
                        className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        onClick={() => handleSubCategoryClick(subCategory.name)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-12 w-12 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={subCategory.image}
                              alt={subCategory.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {subCategory.name}
                            </div>
                            {subCategory.nameInTelugu && (
                              <div className="text-sm text-gray-500">
                                {subCategory.nameInTelugu}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              subCategory.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {subCategory.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-emerald-600 hover:text-emerald-900 transition-colors duration-150"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSubCategoryClick(subCategory.name);
                            }}
                          >
                            View Products
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
