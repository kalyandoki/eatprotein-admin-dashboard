// // src/modules/shop/uom/pages/UOMPage.tsx
// import React, { useState } from "react";
// import { useAppSelector } from "../../../../store/hooks";
// import AddUOMModal from "../components/AddUOMModal";
// import EditUOMModal from "../components/EditUOMModal";
// import DeleteUOMModal from "../components/DeleteUOMModal";
// import StatusBadge from "../../../../components/common/StatusBadge";

// export default function UOMPage() {
//   const { uoms } = useAppSelector((state) => state.uom);
//   const [search, setSearch] = useState("");
//   const [selectedUOM, setSelectedUOM] = useState<any>(null);
//   const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);

//   const filtered = uoms.filter((u) =>
//     u.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-semibold">Product Units of Measure</h1>
//         <button
//           onClick={() => setModal("add")}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Add Unit
//         </button>
//       </div>

//       <input
//         type="text"
//         placeholder="Search units..."
//         className="border p-2 rounded mb-4 w-64"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <table className="w-full border">
//         <thead className="bg-gray-100 text-sm">
//           <tr>
//             <th className="p-2 border">Unit Name</th>
//             <th className="p-2 border">Abbreviation</th>
//             <th className="p-2 border">Type</th>
//             <th className="p-2 border">Base Unit</th>
//             <th className="p-2 border">Conversion</th>
//             <th className="p-2 border">Status</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.map((u) => (
//             <tr key={u.id} className="text-sm border">
//               <td className="p-2 border">{u.name}</td>
//               <td className="p-2 border">{u.abbreviation}</td>
//               <td className="p-2 border">{u.type}</td>
//               <td className="p-2 border">{u.baseUnit ? "Yes" : "No"}</td>
//               <td className="p-2 border">{u.conversion}</td>
//               <td className="p-2 border">
//                 <StatusBadge status={u.status} />
//               </td>
//               <td className="p-2 flex gap-2">
//                 <button
//                   className="text-blue-600"
//                   onClick={() => {
//                     setSelectedUOM(u);
//                     setModal("edit");
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-red-600"
//                   onClick={() => {
//                     setSelectedUOM(u);
//                     setModal("delete");
//                   }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {modal === "add" && <AddUOMModal onClose={() => setModal(null)} />}
//       {modal === "edit" && (
//         <EditUOMModal uom={selectedUOM} onClose={() => setModal(null)} />
//       )}
//       {modal === "delete" && (
//         <DeleteUOMModal uom={selectedUOM} onClose={() => setModal(null)} />
//       )}
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useAppSelector } from "../../../../store/hooks";
// import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
// import AddUOMModal from "../components/AddUOMModal";
// import EditUOMModal from "../components/EditUOMModal";
// import DeleteUOMModal from "../components/DeleteUOMModal";
// import StatusBadge from "../../../../components/common/StatusBadge";

// export default function UOMPage() {
//   const { uoms } = useAppSelector((state) => state.uom);
//   const [search, setSearch] = useState("");
//   const [selectedUOM, setSelectedUOM] = useState<any>(null);
//   const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);

//   const filtered = uoms.filter(
//     (u) =>
//       u.name.toLowerCase().includes(search.toLowerCase()) ||
//       u.abbreviation.toLowerCase().includes(search.toLowerCase()) ||
//       u.type.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleEdit = (uom: any) => {
//     setSelectedUOM(uom);
//     setModal("edit");
//   };

//   const handleDelete = (uom: any) => {
//     setSelectedUOM(uom);
//     setModal("delete");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">
//               Units of Measure
//             </h1>
//             <p className="text-gray-600 mt-1">
//               Manage product measurement units
//             </p>
//           </div>
//           <button
//             onClick={() => setModal("add")}
//             className="mt-4 md:mt-0 px-6 py-3 bg-[#258440] text-white font-medium rounded-lg hover:bg-[#1E803A] transition-colors duration-200 shadow-md flex items-center gap-2"
//           >
//             <FiPlus className="text-lg" />
//             Add Unit
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
//                 placeholder="Search units..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-4">
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-[#258440]">
//                   {uoms.length}
//                 </p>
//                 <p className="text-sm text-gray-500">Total</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-[#258440]">
//                   {uoms.filter((u) => u.status === "Active").length}
//                 </p>
//                 <p className="text-sm text-gray-500">Active</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-[#D7201A]">
//                   {uoms.filter((u) => u.status === "Inactive").length}
//                 </p>
//                 <p className="text-sm text-gray-500">Inactive</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Unit Name
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Abbreviation
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Base Unit
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Conversion
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filtered.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-12 text-center">
//                       <div className="flex flex-col items-center">
//                         <svg
//                           className="mx-auto h-12 w-12 text-gray-400"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           aria-hidden="true"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                           />
//                         </svg>
//                         <h3 className="mt-2 text-sm font-medium text-gray-900">
//                           No units found
//                         </h3>
//                         <p className="mt-1 text-sm text-gray-500">
//                           {search
//                             ? "Try adjusting your search"
//                             : "Get started by adding a new unit"}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   filtered.map((u) => (
//                     <tr
//                       key={u.id}
//                       className="hover:bg-gray-50 transition-colors duration-150"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {u.name}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-500">
//                           {u.abbreviation}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-500">{u.type}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                             u.baseUnit
//                               ? "bg-green-100 text-green-800"
//                               : "bg-gray-100 text-gray-800"
//                           }`}
//                         >
//                           {u.baseUnit ? "Yes" : "No"}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-500">
//                           {u.conversion}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <StatusBadge status={u.status} />
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <button
//                           onClick={() => handleEdit(u)}
//                           className="text-[#258440] hover:text-[#1E803A] mr-3 transition-colors duration-150"
//                           title="Edit"
//                         >
//                           <FiEdit2 className="text-lg" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(u)}
//                           className="text-[#D7201A] hover:text-[#D51711] transition-colors duration-150"
//                           title="Delete"
//                         >
//                           <FiTrash2 className="text-lg" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Modals */}
//         {modal === "add" && <AddUOMModal onClose={() => setModal(null)} />}
//         {modal === "edit" && (
//           <EditUOMModal uom={selectedUOM} onClose={() => setModal(null)} />
//         )}
//         {modal === "delete" && (
//           <DeleteUOMModal uom={selectedUOM} onClose={() => setModal(null)} />
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiCheckCircle,
  FiXCircle,
  //   FiRuler,
} from "react-icons/fi";
import AddUOMModal from "../components/AddUOMModal";
import EditUOMModal from "../components/EditUOMModal";
import DeleteUOMModal from "../components/DeleteUOMModal";
import StatusBadge from "../../../../components/common/StatusBadge";

export default function UOMPage() {
  const { uoms } = useAppSelector((state) => state.uom);
  const [search, setSearch] = useState("");
  const [selectedUOM, setSelectedUOM] = useState<any>(null);
  const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);

  const filtered = uoms.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.abbreviation.toLowerCase().includes(search.toLowerCase()) ||
      u.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (uom: any) => {
    setSelectedUOM(uom);
    setModal("edit");
  };

  const handleDelete = (uom: any) => {
    setSelectedUOM(uom);
    setModal("delete");
  };

  const handleRefresh = () => {
    // Add refresh logic here
    console.log("Refreshing UOMs...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Units of Measure
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage product measurement units efficiently
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
                onClick={() => setModal("add")}
                className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <FiPlus className="text-lg" />
                <span>Add Unit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Units</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {uoms.length}
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
                  {uoms.filter((u) => u.status === "Active").length}
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
                  {uoms.filter((u) => u.status === "Inactive").length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiXCircle className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search units..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">
              Units of Measure ({filtered.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Abbreviation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Base Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion
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
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                          <FiRuler className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">
                          No units found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                          {search
                            ? "Try adjusting your search to find what you're looking for"
                            : "Get started by adding a new unit"}
                        </p>
                        {!search && (
                          <button
                            onClick={() => setModal("add")}
                            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
                          >
                            <FiPlus className="text-lg" />
                            <span>Add Unit</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {u.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {u.abbreviation}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{u.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            u.baseUnit
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {u.baseUnit ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {u.conversion}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={u.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(u)}
                          className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                          title="Edit"
                        >
                          <FiEdit2 className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(u)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-150 p-1 rounded-full hover:bg-red-50"
                          title="Delete"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {modal === "add" && <AddUOMModal onClose={() => setModal(null)} />}
        {modal === "edit" && (
          <EditUOMModal uom={selectedUOM} onClose={() => setModal(null)} />
        )}
        {modal === "delete" && (
          <DeleteUOMModal uom={selectedUOM} onClose={() => setModal(null)} />
        )}
      </div>
    </div>
  );
}
