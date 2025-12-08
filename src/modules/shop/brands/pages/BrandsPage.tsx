// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// import { fetchBrands } from "../brandsSlice";
// import BrandsTable from "../components/BrandsTable";
// import AddBrandModal from "../components/AddBrandModal";
// import EditBrandModal from "../components/EditBrandModal";
// import DeleteBrandModal from "../components/DeleteBrandModal";

// export default function BrandsPage() {
//   const dispatch = useAppDispatch();
//   const { brands, status } = useAppSelector((s) => s.brands);

//   const [search, setSearch] = useState("");
//   const [openAdd, setOpenAdd] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [selected, setSelected] = useState<any>(null);

//   useEffect(() => {
//     dispatch(fetchBrands());
//   }, [dispatch]);

//   const filtered = brands.filter((b) =>
//     b.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-bold">Brands</h1>
//           <p className="text-sm text-gray-500">Manage brands for shop module</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search brands..."
//             className="border p-2 rounded"
//           />
//           <button
//             onClick={() => setOpenAdd(true)}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             + Add Brand
//           </button>
//         </div>
//       </div>

//       {status === "loading" ? (
//         <p>Loading...</p>
//       ) : (
//         <BrandsTable
//           brands={filtered}
//           onEdit={(b) => {
//             setSelected(b);
//             setOpenEdit(true);
//           }}
//           onDelete={(id) => {
//             setSelected(id);
//             setOpenDelete(true);
//           }}
//         />
//       )}

//       <AddBrandModal open={openAdd} onClose={() => setOpenAdd(false)} />
//       <EditBrandModal
//         open={openEdit}
//         onClose={() => setOpenEdit(false)}
//         data={selected}
//       />
//       <DeleteBrandModal
//         open={openDelete}
//         onClose={() => setOpenDelete(false)}
//         id={selected}
//       />
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// import { fetchBrands } from "../brandsSlice";
// import BrandsTable from "../components/BrandsTable";
// import AddBrandModal from "../components/AddBrandModal";
// import EditBrandModal from "../components/EditBrandModal";
// import DeleteBrandModal from "../components/DeleteBrandModal";
// import { FiPlus, FiSearch, FiRefreshCw } from "react-icons/fi";

// export default function BrandsPage() {
//   const dispatch = useAppDispatch();
//   const { brands, status } = useAppSelector((s) => s.brands);

//   const [search, setSearch] = useState("");
//   const [openAdd, setOpenAdd] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [selected, setSelected] = useState<any>(null);

//   useEffect(() => {
//     dispatch(fetchBrands());
//   }, [dispatch]);

//   const handleRefresh = () => {
//     dispatch(fetchBrands());
//   };

//   const filtered = brands.filter(
//     (b) =>
//       b.name.toLowerCase().includes(search.toLowerCase()) ||
//       b.category.toLowerCase().includes(search.toLowerCase()) ||
//       b.subCategory.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Brands</h1>
//             <p className="text-gray-600 mt-1">Manage brands for shop module</p>
//           </div>
//           <div className="flex gap-3 mt-4 md:mt-0">
//             <button
//               onClick={handleRefresh}
//               className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
//               title="Refresh"
//             >
//               <FiRefreshCw className="text-lg" />
//               <span className="hidden sm:inline">Refresh</span>
//             </button>
//             <button
//               onClick={() => setOpenAdd(true)}
//               className="px-4 py-2 bg-[#258440] text-white font-medium rounded-lg hover:bg-[#1E803A] transition-colors duration-200 shadow-md flex items-center gap-2"
//             >
//               <FiPlus className="text-lg" />
//               <span>Add Brand</span>
//             </button>
//           </div>
//         </div>

//         {/* Search and Stats */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="relative flex-1 max-w-md">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search brands..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-4">
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-[#258440]">
//                   {brands.length}
//                 </p>
//                 <p className="text-sm text-gray-500">Total</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-[#258440]">
//                   {brands.filter((b) => b.status === "Active").length}
//                 </p>
//                 <p className="text-sm text-gray-500">Active</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-[#D7201A]">
//                   {brands.filter((b) => b.status === "Inactive").length}
//                 </p>
//                 <p className="text-sm text-gray-500">Inactive</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {status === "loading" ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#258440]"></div>
//           </div>
//         ) : (
//           <BrandsTable
//             brands={filtered}
//             onEdit={(b) => {
//               setSelected(b);
//               setOpenEdit(true);
//             }}
//             onDelete={(id) => {
//               setSelected(id);
//               setOpenDelete(true);
//             }}
//           />
//         )}

//         <AddBrandModal open={openAdd} onClose={() => setOpenAdd(false)} />
//         <EditBrandModal
//           open={openEdit}
//           onClose={() => setOpenEdit(false)}
//           data={selected}
//         />
//         <DeleteBrandModal
//           open={openDelete}
//           onClose={() => setOpenDelete(false)}
//           id={selected}
//         />
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchBrands, Brand } from "../brandsSlice";
import BrandsTable from "../components/BrandsTable";
import AddBrandModal from "../components/AddBrandModal";
import EditBrandModal from "../components/EditBrandModal";
import DeleteBrandModal from "../components/DeleteBrandModal";
import Pagination from "../../../../components/common/Pagination";
import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiFilter,
  FiDownload,
  FiPackage,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

export default function BrandsPage() {
  const dispatch = useAppDispatch();
  const { brands, status } = useAppSelector((s) => s.brands);

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState<Brand | string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleEdit = useCallback((brand: Brand) => {
    setSelected(brand);
    setOpenEdit(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setSelected(id);
    setOpenDelete(true);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleExport = useCallback(() => {
    // Export functionality implementation
    console.log("Exporting brands data...");
  }, []);

  // Memoize filtered brands to prevent unnecessary recalculations
  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(search.toLowerCase()) ||
        brand.category.toLowerCase().includes(search.toLowerCase()) ||
        brand.subCategory.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && brand.status === "Active") ||
        (statusFilter === "inactive" && brand.status === "Inactive");

      const matchesCategory =
        categoryFilter === "" || brand.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [brands, search, statusFilter, categoryFilter]);

  // Calculate pagination values
  const totalItems = filteredBrands.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBrands = filteredBrands.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, categoryFilter]);

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(brands.map((brand) => brand.category))
    );
    return uniqueCategories;
  }, [brands]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Brands Management
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage brands for your shop module
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
                onClick={handleExport}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
                title="Export"
              >
                <FiDownload className="text-lg" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={() => setOpenAdd(true)}
                className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <FiPlus className="text-lg" />
                <span>Add Brand</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Brands
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {brands.length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiPackage className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {brands.filter((b) => b.status === "Active").length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiCheckCircle className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Inactive</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {brands.filter((b) => b.status === "Inactive").length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiXCircle className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {categories.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiFilter className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <FiFilter className="text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search brands..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setCategoryFilter("");
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table */}
        {status === "loading" ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Loading brands...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Brands ({filteredBrands.length})
              </h2>
            </div>
            <BrandsTable
              brands={currentBrands}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalItems}
                  perPage={itemsPerPage}
                />
              </div>
            )}
          </div>
        )}

        {/* Modals */}
        <AddBrandModal open={openAdd} onClose={() => setOpenAdd(false)} />
        <EditBrandModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          data={selected as Brand}
        />
        <DeleteBrandModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          id={selected as string}
        />
      </div>
    </div>
  );
}
