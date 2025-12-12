// src/modules/monsterStores/pages/MonsterStorePage.tsx
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import {
  MonsterStore,
  addMonsterStore,
  editMonsterStore,
  deleteMonsterStore,
  fetchMonsterStores,
  setSelectedMonsterStore,
} from "../monsterStoreSlice";
import MonsterStoreModal from "../components/MonsterStoreModal";
import DeleteMonsterModal from "../components/DeleteMonsterModal";
import Pagination from "../../../components/common/Pagination";
import MonsterCard from "../components/MonsterCard";
import SkeletonLoader from "../components/SkeletonLoader";
import {
  FaTrash,
  FaPlus,
  FaSearch,
  FaTimes,
  FaTh,
  FaList,
  FaDragon,
  FaCheckSquare,
  FaSquare,
  FaEdit,
  FaFilter,
  FaSortAmountDown,
  FaChartBar,
  FaStar,
  FaHeart,
  FaShieldAlt,
  FaBolt,
  FaFire,
  FaSnowflake,
  FaLeaf,
  FaMoon,
  FaSun,
} from "react-icons/fa";

const MonsterStorePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status } = useSelector(
    (state: RootState) => state.monsterStores
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [subCategory, setSubCategory] = useState("all");
  const [element, setElement] = useState("all");
  const [rarity, setRarity] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<MonsterStore | undefined>(
    undefined
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "card">("card");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [filterOpen, setFilterOpen] = useState(false);
  const perPage = 8;

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );
  const subCategories = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.subCategory)))],
    [products]
  );
  const elements = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.element)))],
    [products]
  );
  const rarities = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.rarity)))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (category !== "all" ? p.category === category : true) &&
        (subCategory !== "all" ? p.subCategory === subCategory : true) &&
        (element !== "all" ? p.element === element : true) &&
        (rarity !== "all" ? p.rarity === rarity : true)
    );

    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === "stock") return b.stock - a.stock;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

    return filtered;
  }, [products, search, category, subCategory, element, rarity, sortBy]);

  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
      ),
    [filteredProducts, currentPage, perPage]
  );
  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const handleSave = (product: MonsterStore) => {
    if (editProduct) {
      dispatch(editMonsterStore(product));
    } else {
      dispatch(addMonsterStore(product));
    }
    setSelectedProducts([]);
  };

  const handleDelete = (product: MonsterStore) => {
    dispatch(setSelectedMonsterStore(product));
    setDeleteModalOpen(true);
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedProducts.length} selected monsters?`
      )
    ) {
      selectedProducts.forEach((id) => dispatch(deleteMonsterStore(id)));
      setSelectedProducts([]);
    }
  };

  const openModal = (product?: MonsterStore) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    dispatch(setSelectedMonsterStore(null));
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSubCategory("all");
    setElement("all");
    setRarity("all");
    setCurrentPage(1);
  };

  const toggleSelectProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map((p) => p.id));
    }
  };

  React.useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMonsterStores());
    }
  }, [status, dispatch]);

  const getElementIcon = (element: string) => {
    switch (element.toLowerCase()) {
      case "fire":
        return <FaFire className="text-red-500" />;
      case "water":
        return <FaBolt className="text-blue-500" />;
      case "earth":
        return <FaLeaf className="text-green-500" />;
      case "ice":
        return <FaSnowflake className="text-cyan-500" />;
      case "lightning":
        return <FaBolt className="text-yellow-500" />;
      case "dark":
        return <FaMoon className="text-purple-500" />;
      case "light":
        return <FaSun className="text-yellow-400" />;
      default:
        return <FaShieldAlt className="text-gray-500" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "bg-gray-100 text-gray-800";
      case "uncommon":
        return "bg-green-100 text-green-800";
      case "rare":
        return "bg-blue-100 text-blue-800";
      case "epic":
        return "bg-purple-100 text-purple-800";
      case "legendary":
        return "bg-orange-100 text-orange-800";
      case "mythic":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (status === "loading") {
    return <SkeletonLoader />;
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <FaDragon className="text-white/90" />
                  Monster Store
                </h1>
                <p className="text-white/80 mt-1">
                  Manage and view all monsters in your collection
                </p>
              </div>
              <button
                className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all shadow-md transform hover:scale-105 self-start sm:self-auto"
                onClick={() => openModal()}
              >
                <FaPlus /> Add Monster
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">
                {products.length}
              </div>
              <div className="text-sm text-gray-500">Total Monsters</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {filteredProducts.length}
              </div>
              <div className="text-sm text-gray-500">Filtered</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {products.filter((p) => p.stock < 5).length}
              </div>
              <div className="text-sm text-gray-500">Rare Stock</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {
                  products.filter(
                    (p) => p.rarity === "Legendary" || p.rarity === "Mythic"
                  ).length
                }
              </div>
              <div className="text-sm text-gray-500">Legendary/Mythic</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaFilter className="text-purple-600" />
              Filters & Search
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 md:hidden"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              {filterOpen ? <FaTimes /> : <FaFilter />}
            </button>
          </div>

          <div className={`${filterOpen ? "block" : "hidden md:block"}`}>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search monsters by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                >
                  {subCategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub === "all" ? "All Sub-Categories" : sub}
                    </option>
                  ))}
                </select>
                <select
                  value={element}
                  onChange={(e) => setElement(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                >
                  {elements.map((el) => (
                    <option key={el} value={el}>
                      {el === "all" ? "All Elements" : el}
                    </option>
                  ))}
                </select>
                <select
                  value={rarity}
                  onChange={(e) => setRarity(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                >
                  {rarities.map((r) => (
                    <option key={r} value={r}>
                      {r === "all" ? "All Rarities" : r}
                    </option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="stock">Sort by Stock</option>
                  <option value="rating">Sort by Rating</option>
                </select>
                <button
                  className="flex items-center gap-2 text-gray-600 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  onClick={clearFilters}
                >
                  <FaTimes /> Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSelectAll}
                className="text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-white"
                title="Select All"
              >
                {selectedProducts.length === paginatedProducts.length &&
                paginatedProducts.length > 0 ? (
                  <FaCheckSquare className="text-xl" />
                ) : (
                  <FaSquare className="text-xl" />
                )}
              </button>
              {selectedProducts.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-white px-3 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                >
                  <FaTrash /> Delete Selected ({selectedProducts.length})
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "card"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setViewMode("card")}
                title="Card View"
              >
                <FaTh />
              </button>
              <button
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "table"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setViewMode("table")}
                title="Table View"
              >
                <FaList />
              </button>
            </div>
          </div>

          {paginatedProducts.length > 0 ? (
            <>
              {viewMode === "card" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                  {paginatedProducts.map((p) => (
                    <MonsterCard
                      key={p.id}
                      product={p}
                      isSelected={selectedProducts.includes(p.id)}
                      onToggleSelect={() => toggleSelectProduct(p.id)}
                      onEdit={() => openModal(p)}
                      onDelete={() => handleDelete(p)}
                      getElementIcon={getElementIcon}
                      getRarityColor={getRarityColor}
                    />
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500"
                            checked={
                              selectedProducts.length ===
                                paginatedProducts.length &&
                              paginatedProducts.length > 0
                            }
                            onChange={toggleSelectAll}
                          />
                        </th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Monster
                        </th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price / Stock
                        </th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stats
                        </th>
                        <th className="p-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {paginatedProducts.map((p) => (
                        <tr
                          key={p.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-3">
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500"
                              checked={selectedProducts.includes(p.id)}
                              onChange={() => toggleSelectProduct(p.id)}
                            />
                          </td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <div className="h-16 w-16 rounded-lg overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">
                                  {p.name}
                                </div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {p.description}
                                </div>
                                <div className="flex items-center mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar
                                      key={i}
                                      className={`text-xs ${
                                        i < Math.floor(p.rating || 4)
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-xs text-gray-500 ml-1">
                                    ({p.rating || 4.5})
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-lg text-purple-600">
                              ₹{p.price}
                            </div>
                            <div
                              className={`text-sm font-medium ${
                                p.stock < 5 ? "text-red-600" : "text-gray-500"
                              }`}
                            >
                              {p.stock < 5 ? "Rare Stock: " : "Stock: "}
                              {p.stock}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-col gap-1">
                              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                {p.category}
                              </span>
                              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                {p.subCategory}
                              </span>
                              <div className="flex items-center gap-1 mt-1">
                                {getElementIcon(p.element)}
                                <span className="text-xs text-gray-600">
                                  {p.element}
                                </span>
                              </div>
                              <span
                                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRarityColor(
                                  p.rarity
                                )}`}
                              >
                                {p.rarity}
                              </span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-start gap-3">
                              {p.stats.image && (
                                <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  <img
                                    src={p.stats.image}
                                    alt="Stats"
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="grid grid-cols-2 gap-1 text-xs">
                                  <div className="flex items-center gap-1">
                                    <FaHeart className="text-red-500" />
                                    <span className="text-gray-600">
                                      HP: {p.stats.health}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FaBolt className="text-orange-500" />
                                    <span className="text-gray-600">
                                      ATK: {p.stats.attack}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FaShieldAlt className="text-blue-500" />
                                    <span className="text-gray-600">
                                      DEF: {p.stats.defense}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FaBolt className="text-yellow-500" />
                                    <span className="text-gray-600">
                                      SPD: {p.stats.speed}
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <div className="text-xs text-gray-500 mb-1">
                                    Abilities:
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {p.abilities.map((ability, i) => (
                                      <span
                                        key={i}
                                        className="inline-block px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-700"
                                      >
                                        {ability}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => openModal(p)}
                              className="text-purple-500 hover:text-purple-700 p-2 rounded-full hover:bg-purple-100 transition-colors"
                              title="Edit"
                            >
                              <FaEdit className="text-xl" />
                            </button>
                            <button
                              onClick={() => handleDelete(p)}
                              className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors ml-2"
                              title="Delete"
                            >
                              <FaTrash className="text-xl" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <FaDragon className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No monsters found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Try adjusting your search or filter criteria, or add a new
                monster to get started.
              </p>
              <button
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2 transform hover:scale-105"
                onClick={() => openModal()}
              >
                <FaPlus /> Add Your First Monster
              </button>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredProducts.length}
              perPage={perPage}
            />
          </div>
        )}
      </div>

      <MonsterStoreModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        product={editProduct}
      />

      <DeleteMonsterModal open={deleteModalOpen} onClose={closeDeleteModal} />
    </div>
  );
};

export default MonsterStorePage;
