import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiStar,
  FiShoppingBag,
  FiMapPin,
} from "react-icons/fi";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import Pagination from "../../../components/common/Pagination"; // <-- Import the new component

// --- INTERFACES ---
export interface Product {
  id: string;
  productId: number;
  category: string;
  name: string;
  // The image can now be a URL string or a File object
  image: string | File;
  quantity: string;
  wholesalePrice: number;
  salePrice: number;
  offerPrice: number;
  cgst: number;
  sgst: number;
  appPercentage: number;
  rating: number;
  status: "Active" | "Inactive";
}

interface Store {
  id: string;
  storeId: number;
  category: string;
  name: string;
  logo: string;
  areaName: string;
  city: string;
  district: string;
  state: string;
  contactName: string;
  contactNo: string;
  fieldOfficer: string;
  radius: number;
  rating: number;
  status: "Active" | "Inactive";
  availableStatus: "Available" | "Unavailable";
  created: string;
}

// --- MOCK DATA GENERATORS ---
const generateProducts = (storeId: number): Product[] => {
  const products: Product[] = [];
  const categories = [
    "Seeds (విత్తనాలు)",
    "Fruits (పండ్లు)",
    "Vegetables (కూరగాయలు)",
    "Dairy (పాల ఉత్పత్తులు)",
    "Grains (ధాన్యాలు)",
  ];
  const productNames = [
    "Pumpkin Seeds (గుమ్మడికాయ గింజలు)",
    "Sunflower Seeds (సూర్యకాంతి గింజలు)",
    "Watermelon Seeds (పుచ్చకాయ గింజలు)",
    "Almonds (బాదం)",
    "Cashews (జీడిపప్పు)",
  ];
  const quantities = ["100g", "250g", "500g", "1kg", "2kg", "5kg"];
  const statuses: ("Active" | "Inactive")[] = ["Active", "Inactive"];

  for (let i = 1; i <= 20; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const name = productNames[Math.floor(Math.random() * productNames.length)];
    const quantity = quantities[Math.floor(Math.random() * quantities.length)];
    const wholesalePrice = Math.floor(Math.random() * 500) + 50;
    const salePrice = Math.floor(wholesalePrice * (1.2 + Math.random() * 0.5));
    const offerPrice =
      Math.random() > 0.5
        ? Math.floor(salePrice * (0.8 + Math.random() * 0.15))
        : 0;
    const cgst = Math.floor(Math.random() * 10) + 1;
    const sgst = Math.floor(Math.random() * 10) + 1;
    const appPercentage = Math.floor(Math.random() * 30);
    const rating = Math.round(Math.random() * 5 * 10) / 10;
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    products.push({
      id: `${storeId}-${i}`,
      productId: i,
      category,
      name,
      image: `https://picsum.photos/seed/product${storeId}-${i}/100/100.jpg`,
      quantity,
      wholesalePrice,
      salePrice,
      offerPrice,
      cgst,
      sgst,
      appPercentage,
      rating,
      status,
    });
  }
  return products;
};

const getStoreDetails = (storeName: string): Store => {
  return {
    id: "1",
    storeId: 1,
    category: "Veg",
    name: storeName,
    logo: "https://picsum.photos/seed/store1/100/100.jpg",
    areaName: "Rebala",
    city: "Gudur",
    district: "Nellore",
    state: "Andhra Pradesh",
    contactName: "yashu",
    contactNo: "7358362811",
    fieldOfficer: "TEST FO 1",
    radius: 5,
    rating: 5,
    status: "Active",
    availableStatus: "Available",
    created: "2024-08-10 17:39:43",
  };
};

// --- MAIN COMPONENT ---
export default function StoreProductsPage() {
  const { storeName } = useParams<{ storeName: string }>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (storeName) {
      setTimeout(() => {
        const storeDetails = getStoreDetails(storeName);
        setStore(storeDetails);
        setProducts(generateProducts(storeDetails.storeId));
        setLoading(false);
      }, 500);
    }
  }, [storeName]);

  // --- HELPER & HANDLER FUNCTIONS ---

  // Helper to convert a File to a Base64 string for storage
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAddProduct = async (
    newProduct: Omit<Product, "id" | "productId">
  ) => {
    let productToAdd = { ...newProduct };
    // If the image is a File, convert it to Base64 before adding
    if (newProduct.image instanceof File) {
      const base64Image = await convertFileToBase64(newProduct.image);
      productToAdd = { ...productToAdd, image: base64Image };
    }
    const newId = Date.now().toString();
    const newProductId = Math.max(...products.map((p) => p.productId), 0) + 1;
    setProducts([
      ...products,
      { ...productToAdd, id: newId, productId: newProductId },
    ]);
    setShowAddModal(false);
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    let productToSave = { ...updatedProduct };
    // If the image is a File, it means it's a new upload, so convert it
    if (updatedProduct.image instanceof File) {
      const base64Image = await convertFileToBase64(updatedProduct.image);
      productToSave = { ...productToSave, image: base64Image };
    }
    setProducts(
      products.map((p) => (p.id === productToSave.id ? productToSave : p))
    );
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  // Filtering, pagination, and other UI logic
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.productId.toString().includes(search)
  );
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      if (store) {
        setProducts(generateProducts(store.storeId));
      }
      setLoading(false);
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={i} className="fill-current text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FiStar key="half" className="text-yellow-400" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="text-gray-300" />);
    }
    return stars;
  };

  // Handler to pass to the Pagination component
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 bg-gray-50 min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-gray-600">Loading store products...</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="flex justify-center items-center py-20 bg-gray-50 min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Store not found
          </h2>
          <button
            onClick={() => navigate("/stores")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
          >
            Back to Stores
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with store details */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate("/stores")}
              className="mr-4 p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-200"
            >
              <FiArrowLeft className="text-lg" />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold">{store.name}</h1>
              <div className="flex items-center mt-2 text-emerald-100">
                <FiMapPin className="mr-2" />
                <span>
                  {store.areaName}, {store.city}(m), {store.district}(d),{" "}
                  {store.state}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img
                className="h-16 w-16 rounded-full object-cover border-2 border-white/50"
                src={store.logo}
                alt={store.name}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
              <span className="text-emerald-100 mr-2">Store ID:</span>
              <span className="font-medium">{store.storeId}</span>
            </div>
            <div className="flex items-center">
              <span className="text-emerald-100 mr-2">Contact:</span>
              <span className="font-medium">
                {store.contactName} ({store.contactNo})
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-emerald-100 mr-2">Field Officer:</span>
              <span className="font-medium">{store.fieldOfficer}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Products ({filteredProducts.length})
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-1"
              >
                <FiRefreshCw className="text-sm" /> Refresh
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-1"
              >
                <FiPlus className="text-sm" /> Add Product
              </button>
            </div>
          </div>
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by product name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    QTY
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Whole Sale Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sale Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Offer Price
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    colSpan={2}
                  >
                    GST
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    APP%
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CGST%
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SGST%
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProducts.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                          <FiShoppingBag className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">
                          {filteredProducts.length === 0
                            ? "No products found"
                            : "No products on this page"}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                          {search
                            ? "Try adjusting your search to find what you're looking for"
                            : filteredProducts.length === 0
                            ? "Get started by adding a new product"
                            : "Try a different page"}
                        </p>
                        {!search && filteredProducts.length === 0 && (
                          <button
                            onClick={() => setShowAddModal(true)}
                            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
                          >
                            <FiPlus className="text-lg" />
                            <span>Add Product</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.productId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                              typeof product.image === "string"
                                ? product.image
                                : URL.createObjectURL(product.image)
                            }
                            alt={product.name}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{product.wholesalePrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{product.salePrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.offerPrice > 0 ? (
                          <>
                            ₹{product.offerPrice}
                            <span className="text-xs text-gray-500 ml-1">
                              (
                              {Math.round(
                                (1 - product.offerPrice / product.salePrice) *
                                  100
                              )}
                              %)
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-400">No Offer</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.cgst}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.sgst}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.appPercentage}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {getRatingStars(product.rating)}
                          </div>
                          <span className="text-sm text-gray-500">
                            {product.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            product.status
                          )}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                          title="Edit"
                        >
                          <FiEdit2 className="text-lg" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(product)}
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

          {/* --- PAGINATION COMPONENT --- */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>

        {/* Modals */}
        {showAddModal && (
          <AddProductModal
            onClose={() => setShowAddModal(false)}
            onAddProduct={handleAddProduct}
          />
        )}
        {showEditModal && selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            onClose={() => {
              setShowEditModal(false);
              setSelectedProduct(null);
            }}
            onEditProduct={handleEditProduct}
          />
        )}
        {showDeleteModal && selectedProduct && (
          <DeleteProductModal
            product={selectedProduct}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedProduct(null);
            }}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </div>
    </div>
  );
}
