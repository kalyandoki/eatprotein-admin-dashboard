// src/modules/monsterStores/components/MonsterCard.tsx
import React from "react";
import { MonsterStore } from "../monsterStoreSlice";
import {
  FaEdit,
  FaTrash,
  FaStar,
  FaHeart,
  FaShieldAlt,
  FaBolt,
  FaCheckSquare,
  FaSquare,
  FaFire,
  FaSnowflake,
  FaLeaf,
  FaMoon,
  FaSun,
} from "react-icons/fa";

interface MonsterCardProps {
  product: MonsterStore;
  isSelected: boolean;
  onToggleSelect: () => void;
  onEdit: () => void;
  onDelete: (product: MonsterStore) => void;
  getElementIcon: (element: string) => JSX.Element;
  getRarityColor: (rarity: string) => string;
}

const MonsterCard: React.FC<MonsterCardProps> = ({
  product,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
  getElementIcon,
  getRarityColor,
}) => {
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
              isSelected ? "bg-purple-600 text-white" : "bg-white text-gray-600"
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

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-purple-600">
            ₹{product.price}
          </span>
          <span
            className={`text-sm font-medium ${
              product.stock < 5 ? "text-red-600" : "text-gray-500"
            }`}
          >
            {product.stock < 5 ? "Rare Stock" : "In Stock"}: {product.stock}
          </span>
        </div>

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
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
            {product.category}
          </span>
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {product.subCategory}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {getElementIcon(product.element)}
            <span className="text-sm font-medium text-gray-700">
              {product.element}
            </span>
          </div>
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRarityColor(
              product.rarity
            )}`}
          >
            {product.rarity}
          </span>
        </div>

        <div className="border-t pt-3">
          <div className="grid grid-cols-2 gap-1 text-xs mb-2">
            <div className="flex items-center gap-1">
              <FaHeart className="text-red-500" />
              <span className="text-gray-600">HP: {product.stats.health}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBolt className="text-orange-500" />
              <span className="text-gray-600">ATK: {product.stats.attack}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaShieldAlt className="text-blue-500" />
              <span className="text-gray-600">
                DEF: {product.stats.defense}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaBolt className="text-yellow-500" />
              <span className="text-gray-600">SPD: {product.stats.speed}</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 mb-3">
            <div className="font-medium mb-1">Abilities:</div>
            <div className="flex flex-wrap gap-1">
              {product.abilities.map((ability, i) => (
                <span
                  key={i}
                  className="inline-block px-1.5 py-0.5 rounded bg-gray-100 text-gray-700"
                >
                  {ability}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4 pt-3 border-t">
          <button
            onClick={onEdit}
            className="flex items-center justify-center px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
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

export default MonsterCard;
