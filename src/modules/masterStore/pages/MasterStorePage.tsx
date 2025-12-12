// src/modules/masterStore/pages/MasterStorePage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchProducts,
  Product,
  editProduct,
  deleteProduct,
  updateStock,
} from "../productsSlice";
import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiPackage,
  FiFilter,
  FiActivity,
  FiTrendingUp,
  FiDollarSign,
  FiBox,
} from "react-icons/fi";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import DeleteProductModal from "../components/DeleteProductModal";

export default function MasterStorePage() {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector((state) => state.products);
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>("all");

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  // Get unique sections and categories for filters
  const sections = Array.from(new Set(products.map((p) => p.section)));
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Get unique sub-categories based on the selected category
  const subCategories =
    categoryFilter === "all"
      ? Array.from(new Set(products.map((p) => p.subCategory)))
      : Array.from(
          new Set(
            products
              .filter((p) => p.category === categoryFilter)
              .map((p) => p.subCategory)
          )
        );

  // Reset sub-category filter when category changes
  useEffect(() => {
    setSubCategoryFilter("all");
  }, [categoryFilter]);

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchProduct.toLowerCase());
    const matchesSection =
      sectionFilter === "all" || product.section === sectionFilter;
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesSubCategory =
      subCategoryFilter === "all" || product.subCategory === subCategoryFilter;

    return (
      matchesSearch && matchesSection && matchesCategory && matchesSubCategory
    );
  });

  // Calculate statistics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stocks, 0);
  const lowStockProducts = products.filter((p) => p.stocks < 20).length;
  const highCalorieProducts = products.filter((p) => p.calories > 200).length;

  const handleRefresh = () => {
    dispatch(fetchProducts());
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleUpdateStock = (product: Product, stocks: number) => {
    dispatch(updateStock({ id: product.id, stocks }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                <FiPackage className="mr-3" />
                Master Store Products
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage store products and inventory
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
                title="Refresh"
              >
                <FiRefreshCw className="text-lg" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <FiPlus className="text-lg" />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Products
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {totalProducts}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiPackage className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Value</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ${totalValue.toFixed(2)}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiDollarSign className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Low Stock</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {lowStockProducts}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FiBox className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  High Calorie
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {highCalorieProducts}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiActivity className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search Product"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={sectionFilter}
                  onChange={(e) => setSectionFilter(e.target.value)}
                >
                  <option value="all">--Select Section--</option>
                  {sections.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">--Select Category--</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={subCategoryFilter}
                  onChange={(e) => setSubCategoryFilter(e.target.value)}
                  disabled={categoryFilter === "all"}
                >
                  <option value="all">--Select Sub Category--</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <ProductTable
          data={filteredProducts}
          isLoading={status === "loading"}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUpdateStock={handleUpdateStock}
        />

        {/* Modals */}
        {showAddModal && (
          <AddProductModal onClose={() => setShowAddModal(false)} />
        )}
        {showEditModal && selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            onClose={() => {
              setSelectedProduct(null);
              setShowEditModal(false);
            }}
          />
        )}
        {showDeleteModal && selectedProduct && (
          <DeleteProductModal
            product={selectedProduct}
            onClose={() => {
              setSelectedProduct(null);
              setShowDeleteModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
