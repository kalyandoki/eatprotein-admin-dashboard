// import React, { useState } from "react";
// import { useAppSelector } from "../../../../store/hooks";
// import StatusBadge from "../../../../components/common/StatusBadge";
// import AddSubCategoryModal from "../components/AddSubCategoryModal";
// import EditSubCategoryModal from "../components/EditSubCategoryModal";
// import DeleteSubCategoryModal from "../components/DeleteSubCategoryModal";

// export default function SubCategoriesPage() {
//   const { subCategories } = useAppSelector((state) => state.subCategories);

//   const [search, setSearch] = useState("");
//   const [openAdd, setOpenAdd] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [selected, setSelected] = useState<any>(null);

//   const filtered = subCategories.filter((c) =>
//     c.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-5">
//         <h1 className="text-2xl font-bold">Sub Categories</h1>

//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//           onClick={() => setOpenAdd(true)}
//         >
//           + Add Sub Category
//         </button>
//       </div>

//       <input
//         className="border p-2 rounded w-full mb-4"
//         placeholder="Search product categories..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="p-3">Category Name</th>
//             <th className="p-3">Main Category</th>
//             <th className="p-3">Description</th>
//             <th className="p-3">Status</th>
//             <th className="p-3">Items</th>
//             <th className="p-3">Order</th>
//             <th className="p-3">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.map((cat) => (
//             <tr key={cat.id} className="border-b hover:bg-gray-50">
//               <td className="p-3">{cat.name}</td>
//               <td className="p-3">{cat.mainCategory}</td>
//               <td className="p-3">{cat.description}</td>
//               <td className="p-3">
//                 <StatusBadge status={cat.status} />
//               </td>
//               <td className="p-3">{cat.items}</td>
//               <td className="p-3">{cat.order}</td>

//               <td className="p-3 flex gap-3">
//                 <button
//                   className="text-blue-600"
//                   onClick={() => {
//                     setSelected(cat);
//                     setOpenEdit(true);
//                   }}
//                 >
//                   Edit
//                 </button>

//                 <button
//                   className="text-red-600"
//                   onClick={() => {
//                     setSelected(cat.id);
//                     setOpenDelete(true);
//                   }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* MODALS */}
//       <AddSubCategoryModal open={openAdd} onClose={() => setOpenAdd(false)} />

//       <EditSubCategoryModal
//         open={openEdit}
//         onClose={() => setOpenEdit(false)}
//         data={selected}
//       />

//       <DeleteSubCategoryModal
//         open={openDelete}
//         onClose={() => setOpenDelete(false)}
//         id={selected}
//       />
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useAppSelector } from "../../../../store/hooks";
// import { FiPlus, FiSearch, FiFilter } from "react-icons/fi";
// import AddSubCategoryModal from "../components/AddSubCategoryModal";
// import EditSubCategoryModal from "../components/EditSubCategoryModal";
// import DeleteSubCategoryModal from "../components/DeleteSubCategoryModal";
// import SubCategoryTable from "../components/SubCategoryTable";

// export default function SubCategoriesPage() {
//   const { subCategories } = useAppSelector((state) => state.subCategories);

//   const [search, setSearch] = useState("");
//   const [openAdd, setOpenAdd] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [selected, setSelected] = useState<any>(null);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Sub Categories</h1>
//             <p className="text-gray-600 mt-1">
//               Manage your product subcategories
//             </p>
//           </div>
//           <button
//             onClick={() => setOpenAdd(true)}
//             className="mt-4 md:mt-0 px-6 py-3 bg-[#258440] text-white font-medium rounded-lg hover:bg-[#1E803A] transition-colors duration-200 shadow-md flex items-center gap-2"
//           >
//             <FiPlus className="text-lg" />
//             Add Sub Category
//           </button>
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
//                 placeholder="Search subcategories..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-4">
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-[#258440]">
//                   {subCategories.length}
//                 </p>
//                 <p className="text-sm text-gray-500">Total</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-[#258440]">
//                   {subCategories.filter((c) => c.status === "Active").length}
//                 </p>
//                 <p className="text-sm text-gray-500">Active</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-[#D7201A]">
//                   {subCategories.filter((c) => c.status === "Inactive").length}
//                 </p>
//                 <p className="text-sm text-gray-500">Inactive</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-gray-700">
//                   {subCategories.reduce((sum, cat) => sum + cat.items, 0)}
//                 </p>
//                 <p className="text-sm text-gray-500">Total Items</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <SubCategoryTable
//           search={search}
//           onEdit={(cat) => {
//             setSelected(cat);
//             setOpenEdit(true);
//           }}
//           onDelete={(id) => {
//             setSelected(id);
//             setOpenDelete(true);
//           }}
//         />
//       </div>

//       {/* MODALS */}
//       <AddSubCategoryModal open={openAdd} onClose={() => setOpenAdd(false)} />

//       <EditSubCategoryModal
//         open={openEdit}
//         onClose={() => setOpenEdit(false)}
//         data={selected}
//       />

//       <DeleteSubCategoryModal
//         open={openDelete}
//         onClose={() => setOpenDelete(false)}
//         id={selected}
//       />
//     </div>
//   );
// }

import React, { useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiPackage,
  FiCheckCircle,
  FiXCircle,
  FiBox,
} from "react-icons/fi";
import AddSubCategoryModal from "../components/AddSubCategoryModal";
import EditSubCategoryModal from "../components/EditSubCategoryModal";
import DeleteSubCategoryModal from "../components/DeleteSubCategoryModal";
import SubCategoryTable from "../components/SubCategoryTable";

export default function SubCategoriesPage() {
  const { subCategories } = useAppSelector((state) => state.subCategories);

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleRefresh = () => {
    // Add refresh logic here
    console.log("Refreshing subcategories...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Sub Categories Management
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage your product subcategories efficiently
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
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 ${
                  showFilters ? "bg-white/30" : "bg-white/20"
                } backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2`}
                title="Filters"
              >
                <FiFilter className="text-lg" />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <button
                onClick={() => setOpenAdd(true)}
                className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <FiPlus className="text-lg" />
                <span>Add Sub Category</span>
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
                  Total Subcategories
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {subCategories.length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiPackage className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {subCategories.filter((c) => c.status === "Active").length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiCheckCircle className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Inactive</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {subCategories.filter((c) => c.status === "Inactive").length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiXCircle className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Items</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {subCategories.reduce((sum, cat) => sum + cat.items, 0)}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiBox className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-all duration-300 ease-in-out animate-fadeIn">
            <div className="flex items-center mb-4">
              <FiFilter className="text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200">
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200">
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="food">Food</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Items Range
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200">
                  <option value="">All</option>
                  <option value="0-10">0-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-100">51-100</option>
                  <option value="100+">100+</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                Reset
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Search and Table Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search subcategories..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <SubCategoryTable
            search={search}
            onEdit={(cat) => {
              setSelected(cat);
              setOpenEdit(true);
            }}
            onDelete={(id) => {
              setSelected(id);
              setOpenDelete(true);
            }}
          />
        </div>
      </div>

      {/* MODALS */}
      <AddSubCategoryModal open={openAdd} onClose={() => setOpenAdd(false)} />

      <EditSubCategoryModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        data={selected}
      />

      <DeleteSubCategoryModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        id={selected}
      />
    </div>
  );
}
