// src/modules/products/ProductsListPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProducts, updateProductPricing } from "../productSlice";
import { fetchSubCategories } from "../subCategorySlice";
import { fetchCategories } from "../categorySlice";
import { FiArrowLeft, FiDollarSign, FiPlus } from "react-icons/fi";
import PricingModal from "../components/PricingModal";

export default function ProductsListPage() {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector((state) => state.products);
  const { subCategories } = useAppSelector(
    (state) => state.productSubCategories
  );
  const { categories } = useAppSelector((state) => state.productCategory);
  const { storeId, categoryName, subCategoryName } = useParams<{
    storeId: string;
    categoryName: string;
    subCategoryName: string;
  }>();
  const navigate = useNavigate();
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

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

  useEffect(() => {
    if (subCategories.length > 0) {
      const subCategory = subCategories.find(
        (sc) => sc.name.toLowerCase() === subCategoryName
      );
      if (subCategory) {
        dispatch(fetchProducts(subCategory.id));
      }
    }
  }, [subCategories, subCategoryName, dispatch]);

  const handleBack = () => {
    navigate(`/stores/store-products/${storeId}/category-list/${categoryName}`);
  };

  const handlePricingClick = (product: any) => {
    setSelectedProduct(product);
    setShowPricingModal(true);
  };

  const handlePricingSubmit = (pricing: any) => {
    if (selectedProduct) {
      dispatch(
        updateProductPricing({
          productId: selectedProduct.id,
          pricing,
        })
      );
      setShowPricingModal(false);
      setSelectedProduct(null);
    }
  };

  const getCategoryName = () => {
    const category = categories.find(
      (c) => c.name.toLowerCase() === categoryName
    );
    return category ? category.name : categoryName;
  };

  const getSubCategoryName = () => {
    const subCategory = subCategories.find(
      (sc) => sc.name.toLowerCase() === subCategoryName
    );
    return subCategory ? subCategory.name : subCategoryName;
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
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {getSubCategoryName()} Products
              </h1>
              <p className="text-emerald-100 text-lg">
                Category: {getCategoryName()}
              </p>
            </div>
          </div>
        </div>

        {status === "loading" ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Products ({products.length})
              </h2>
              {/* <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2">
                <FiPlus className="text-lg" />
                <span>Add Product</span>
              </button> */}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pricing
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <h3 className="mt-2 text-lg font-medium text-gray-900">
                            No products found
                          </h3>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            {/* {product.nameInTelugu && (
                              <div className="text-sm text-gray-500">
                                {product.nameInTelugu}
                              </div>
                            )} */}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.pricing ? (
                            <div className="text-sm text-gray-900">
                              ₹{product.pricing.price} / {product.pricing.uom}
                            </div>
                          ) : (
                            <button
                              onClick={() => handlePricingClick(product)}
                              className="text-emerald-600 hover:text-emerald-900 flex items-center gap-1"
                            >
                              <FiDollarSign className="text-lg" />
                              <span>Add Pricing</span>
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handlePricingClick(product)}
                            className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150"
                          >
                            {product.pricing ? "Edit Pricing" : "Add Pricing"}
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

        {showPricingModal && selectedProduct && (
          <PricingModal
            product={selectedProduct}
            onClose={() => {
              setShowPricingModal(false);
              setSelectedProduct(null);
            }}
            onSubmit={handlePricingSubmit}
          />
        )}
      </div>
    </div>
  );
}
