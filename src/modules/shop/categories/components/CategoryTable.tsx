// src/modules/categories/components/CategoryTable.tsx
import React from "react";
import { useAppSelector } from "../../../../store/hooks";
import CategoryRow from "./CategoryRow";

const CategoryTable = () => {
  const categories = useAppSelector((s) => s.categories.categories);
  const search = useAppSelector((s) => s.categories.search);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left p-4 font-medium text-gray-700">Image</th>
            <th className="text-left p-4 font-medium text-gray-700">Name</th>
            <th className="text-left p-4 font-medium text-gray-700">
              Description
            </th>
            <th className="text-left p-4 font-medium text-gray-700">Status</th>
            <th className="text-left p-4 font-medium text-gray-700">Items</th>
            <th className="text-left p-4 font-medium text-gray-700">Created</th>
            <th className="text-left p-4 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((cat) => (
            <CategoryRow key={cat.id} cat={cat} />
          ))}
        </tbody>
      </table>
      {filteredCategories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No categories found
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
