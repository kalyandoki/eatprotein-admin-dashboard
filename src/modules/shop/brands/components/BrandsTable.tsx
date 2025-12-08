// import React from "react";
// import { Brand } from "../types";
// import StatusBadge from "../../../../components/common/StatusBadge";

// interface Props {
//   brands: Brand[];
//   onEdit: (b: Brand) => void;
//   onDelete: (id: number) => void;
// }

// export default function BrandsTable({ brands, onEdit, onDelete }: Props) {
//   return (
//     <div className="overflow-x-auto rounded-lg border border-gray-200">
//       <table className="min-w-full bg-white">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 text-left text-sm font-semibold">Logo</th>
//             <th className="p-3 text-left text-sm font-semibold">Brand</th>
//             <th className="p-3 text-left text-sm font-semibold">Category</th>
//             <th className="p-3 text-left text-sm font-semibold">SubCategory</th>
//             <th className="p-3 text-left text-sm font-semibold">Status</th>
//             <th className="p-3 text-right text-sm font-semibold">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {brands.length === 0 ? (
//             <tr>
//               <td colSpan={6} className="p-6 text-center text-gray-500">
//                 No brands found.
//               </td>
//             </tr>
//           ) : (
//             brands.map((b) => (
//               <tr key={b.id} className="border-t hover:bg-gray-50">
//                 <td className="p-3">
//                   {b.logo ? (
//                     <img
//                       src={b.logo}
//                       alt={b.name}
//                       className="h-12 w-12 object-cover rounded"
//                     />
//                   ) : (
//                     <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
//                       No Logo
//                     </div>
//                   )}
//                 </td>
//                 <td className="p-3 font-medium">{b.name}</td>
//                 <td className="p-3">{b.category}</td>
//                 <td className="p-3">{b.subCategory}</td>
//                 <td className="p-3">
//                   <StatusBadge status={b.status} />
//                 </td>
//                 <td className="p-3 text-right space-x-3">
//                   <button
//                     className="text-blue-600 hover:underline"
//                     onClick={() => onEdit(b)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="text-red-600 hover:underline"
//                     onClick={() => onDelete(b.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React from "react";
import { Brand } from "../types";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Props {
  brands: Brand[];
  onEdit: (b: Brand) => void;
  onDelete: (id: number) => void;
}

export default function BrandsTable({ brands, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Logo
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SubCategory
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {brands.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No brands found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by adding a new brand.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              brands.map((b) => (
                <tr
                  key={b.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {b.logo ? (
                      <img
                        src={b.logo}
                        alt={b.name}
                        className="h-12 w-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="h-6 w-6 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {b.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{b.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{b.subCategory}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        b.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(b)}
                      className="text-[#258440] hover:text-[#1E803A] mr-3 transition-colors duration-150"
                      title="Edit"
                    >
                      <FiEdit2 className="text-lg" />
                    </button>
                    <button
                      onClick={() => onDelete(b.id)}
                      className="text-[#D7201A] hover:text-[#D51711] transition-colors duration-150"
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
  );
}
