// // src/modules/shop/components/ProductCard.tsx
// import React from "react";
// import { FaEdit, FaTrash, FaRupeeSign } from "react-icons/fa";

// interface ProductCardProps {
//   product: any; // Replace with your ShopProduct type
//   isSelected: boolean;
//   onToggleSelect: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({
//   product,
//   isSelected,
//   onToggleSelect,
//   onEdit,
//   onDelete,
// }) => {
//   return (
//     <div className="relative group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
//       <input
//         type="checkbox"
//         className="absolute top-4 left-4 z-10 w-5 h-5 text-[#258440] bg-white border-gray-300 rounded focus:ring-[#258440]"
//         checked={isSelected}
//         onChange={onToggleSelect}
//       />
//       <div className="flex flex-col h-full">
//         <div className="h-48 overflow-hidden bg-gray-100">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//           />
//         </div>
//         <div className="p-4 flex flex-col flex-1">
//           <h3 className="font-semibold text-gray-800 mb-1 truncate">
//             {product.name}
//           </h3>
//           <p className="text-sm text-gray-500 mb-3 line-clamp-2">
//             {product.description}
//           </p>
//           <div className="flex justify-between items-center mb-3">
//             <div>
//               <div className="flex items-center font-bold text-lg text-[#258440]">
//                 <FaRupeeSign className="mr-1" />
//                 {product.price}
//               </div>
//               <div className="text-xs text-gray-500">
//                 Stock: {product.stock}
//               </div>
//             </div>
//             <div className="text-xs bg-gray-100 px-2 py-1 rounded-full">
//               {product.category}
//             </div>
//           </div>
//           <div className="flex justify-end gap-2 mt-auto">
//             <button
//               onClick={onEdit}
//               className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
//               title="Edit"
//             >
//               <FaEdit />
//             </button>
//             <button
//               onClick={onDelete}
//               className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
//               title="Delete"
//             >
//               <FaTrash />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// src/modules/shop/components/ProductCard.tsx
import React from "react";
import { ShopProduct } from "../shopSlice";
import {
  FaEdit,
  FaTrash,
  FaStar,
  FaFire,
  FaBacon,
  FaBreadSlice,
  FaEgg,
  FaAppleAlt,
  FaCheese,
  FaFish,
  FaCheckSquare,
  FaSquare,
} from "react-icons/fa";

interface ProductCardProps {
  product: ShopProduct;
  isSelected: boolean;
  onToggleSelect: () => void;
  onEdit: () => void;
  onDelete: (product: ShopProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
}) => {
  const getNutritionIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "nuts":
        return <FaAppleAlt className="text-amber-500" />;
      case "dairy":
        return <FaCheese className="text-yellow-500" />;
      case "oils":
        return <FaBacon className="text-yellow-600" />;
      case "grains":
        return <FaBreadSlice className="text-amber-600" />;
      case "sweeteners":
        return <FaAppleAlt className="text-red-500" />;
      default:
        return <FaFish className="text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={onToggleSelect}
            className={`p-2 rounded-full ${
              isSelected
                ? "bg-emerald-600 text-white"
                : "bg-white text-gray-600"
            } shadow-md`}
          >
            {isSelected ? (
              <FaCheckSquare className="text-sm" />
            ) : (
              <FaSquare className="text-sm" />
            )}
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
          <h3 className="text-white font-semibold truncate">{product.name}</h3>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>

        {/* <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-emerald-600">
            ₹{product.price}
          </span>
          <span
            className={`text-sm font-medium ${
              product.stock < 10 ? "text-red-600" : "text-gray-500"
            }`}
          >
            {product.stock < 10 ? "Low Stock" : "In Stock"}: {product.stock}
          </span>
        </div> */}

        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-sm ${
                i < Math.floor(product.rating || 4)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({product.rating || 4.5})
          </span>
        </div>

        <div className="flex gap-1 mb-3">
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
            {product.category}
          </span>
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {product.subCategory}
          </span>
        </div>

        <div className="border-t pt-3">
          <div className="flex items-center mb-2">
            {getNutritionIcon(product.category)}
            <span className="text-sm font-medium text-gray-700 ml-1">
              Nutrition Facts
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="flex items-center gap-1">
              <FaFire className="text-orange-500" />
              <span className="text-gray-600">
                {product.nutrition.calories} cal
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaBacon className="text-yellow-500" />
              <span className="text-gray-600">{product.nutrition.fat}g</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBreadSlice className="text-amber-500" />
              <span className="text-gray-600">{product.nutrition.carb}g</span>
            </div>
            <div className="flex items-center gap-1">
              <FaEgg className="text-red-500" />
              <span className="text-gray-600">
                {product.nutrition.protein}g
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4 pt-3 border-t">
          <button
            onClick={onEdit}
            className="flex items-center justify-center px-3 py-1.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            <FaEdit className="mr-1" /> Edit
          </button>
          <button
            onClick={() => onDelete(product)}
            className="flex items-center justify-center px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
