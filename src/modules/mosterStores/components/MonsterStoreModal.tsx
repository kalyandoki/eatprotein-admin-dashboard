// src/modules/monsterStores/components/MonsterStoreModal.tsx
import React, { useState, useEffect } from "react";
import { FaTimes, FaImage } from "react-icons/fa";
import { MonsterStore, MonsterStats } from "../monsterStoreSlice";

interface MonsterStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: MonsterStore) => void;
  product?: MonsterStore;
}

const MonsterStoreModal: React.FC<MonsterStoreModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
}) => {
  const [formData, setFormData] = useState<MonsterStore>({
    id: 0,
    name: "",
    description: "",
    image: "",
    price: "",
    stock: 0,
    category: "",
    subCategory: "",
    stats: { health: "", attack: "", defense: "", speed: "", image: "" },
    rating: 4.5,
    element: "",
    rarity: "",
    abilities: [],
  });

  const [imagePreview, setImagePreview] = useState("");
  const [statsImagePreview, setStatsImagePreview] = useState("");
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [statsImageFile, setStatsImageFile] = useState<File | null>(null);
  const [abilityInput, setAbilityInput] = useState("");

  const isEditMode = !!product;

  useEffect(() => {
    if (isEditMode && product) {
      setFormData(product);
      setImagePreview(product.image);
      setStatsImagePreview(product.stats.image || "");
    } else {
      setFormData({
        id: 0,
        name: "",
        description: "",
        image: "",
        price: "",
        stock: 0,
        category: "",
        subCategory: "",
        stats: { health: "", attack: "", defense: "", speed: "", image: "" },
        rating: 4.5,
        element: "",
        rarity: "",
        abilities: [],
      });
      setImagePreview("");
      setStatsImagePreview("");
      setProductImageFile(null);
      setStatsImageFile(null);
      setAbilityInput("");
    }
  }, [product, isEditMode, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.includes("stats.")) {
      const statsKey = name.split(".")[1] as keyof MonsterStats;
      setFormData((prev) => ({
        ...prev,
        stats: { ...prev.stats, [statsKey]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData((prev) => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStatsImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStatsImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setStatsImagePreview(base64String);
        setFormData((prev) => ({
          ...prev,
          stats: { ...prev.stats, image: base64String },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addAbility = () => {
    if (abilityInput.trim() && formData.abilities.length < 3) {
      setFormData((prev) => ({
        ...prev,
        abilities: [...prev.abilities, abilityInput.trim()],
      }));
      setAbilityInput("");
    }
  };

  const removeAbility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      abilities: prev.abilities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="bg-purple-600 flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-white">
            {isEditMode ? "Edit Monster" : "Add New Monster"}
          </h2>
          <button
            onClick={onClose}
            className="text-white bg-black p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monster Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monster Image
                </label>
                <div className="mt-1 flex items-center space-x-3">
                  <input
                    type="file"
                    id="monster-image-upload"
                    accept="image/*"
                    onChange={handleProductImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="monster-image-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <FaImage className="mr-2" />
                    Choose File
                  </label>
                  <span className="text-sm text-gray-500">
                    {productImageFile
                      ? productImageFile.name
                      : "No file chosen"}
                  </span>
                </div>
                {imagePreview && (
                  <div className="mt-2 h-32 w-full rounded-lg overflow-hidden bg-gray-100 border">
                    <img
                      src={imagePreview}
                      alt="Monster preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price (₹)
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sub-Category
                  </label>
                  <input
                    type="text"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Element
                  </label>
                  <select
                    name="element"
                    value={formData.element}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select Element</option>
                    <option value="Fire">Fire</option>
                    <option value="Water">Water</option>
                    <option value="Earth">Earth</option>
                    <option value="Ice">Ice</option>
                    <option value="Lightning">Lightning</option>
                    <option value="Dark">Dark</option>
                    <option value="Light">Light</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rarity
                  </label>
                  <select
                    name="rarity"
                    value={formData.rarity}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select Rarity</option>
                    <option value="Common">Common</option>
                    <option value="Uncommon">Uncommon</option>
                    <option value="Rare">Rare</option>
                    <option value="Epic">Epic</option>
                    <option value="Legendary">Legendary</option>
                    <option value="Mythic">Mythic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Abilities (Max 3)
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={abilityInput}
                    onChange={(e) => setAbilityInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addAbility())
                    }
                    placeholder="Add ability"
                    className="flex-1 border-gray-300 rounded-md shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                    disabled={formData.abilities.length >= 3}
                  />
                  <button
                    type="button"
                    onClick={addAbility}
                    disabled={formData.abilities.length >= 3}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400"
                  >
                    Add
                  </button>
                </div>
                {formData.abilities.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.abilities.map((ability, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {ability}
                        <button
                          type="button"
                          onClick={() => removeAbility(index)}
                          className="ml-1 text-purple-600 hover:text-purple-800"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-t pt-4 md:border-t-0 md:pt-0">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Monster Stats
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stats Image
                  </label>
                  <div className="mt-1 flex items-center space-x-3">
                    <input
                      type="file"
                      id="stats-image-upload"
                      accept="image/*"
                      onChange={handleStatsImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="stats-image-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <FaImage className="mr-2" />
                      Choose File
                    </label>
                    <span className="text-sm text-gray-500">
                      {statsImageFile ? statsImageFile.name : "No file chosen"}
                    </span>
                  </div>
                  {statsImagePreview && (
                    <div className="mt-2 h-32 w-full rounded-lg overflow-hidden bg-gray-100 border">
                      <img
                        src={statsImagePreview}
                        alt="Stats preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Health (HP)
                    </label>
                    <input
                      type="text"
                      name="stats.health"
                      value={formData.stats.health}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Attack (ATK)
                    </label>
                    <input
                      type="text"
                      name="stats.attack"
                      value={formData.stats.attack}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Defense (DEF)
                    </label>
                    <input
                      type="text"
                      name="stats.defense"
                      value={formData.stats.defense}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Speed (SPD)
                    </label>
                    <input
                      type="text"
                      name="stats.speed"
                      value={formData.stats.speed}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>

                {formData.stats.health && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Stats Preview
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-gray-600">Health:</span>
                        <span className="ml-2 font-medium">
                          {formData.stats.health}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600">Attack:</span>
                        <span className="ml-2 font-medium">
                          {formData.stats.attack}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600">Defense:</span>
                        <span className="ml-2 font-medium">
                          {formData.stats.defense}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600">Speed:</span>
                        <span className="ml-2 font-medium">
                          {formData.stats.speed}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              {isEditMode ? "Save Changes" : "Add Monster"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MonsterStoreModal;
