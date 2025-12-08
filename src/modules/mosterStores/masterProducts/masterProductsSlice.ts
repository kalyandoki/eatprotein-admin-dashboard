// // src/modules/shop/masterProducts/masterProductsSlice.ts
// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// export interface MasterProduct {
//   id: string;
//   name: string;
//   sku: string;
//   category: string;
//   subcategory: string;
//   brand: string;
//   unit: string;
//   price: number;
//   commission: number;
//   description: string;
//   image: string;
//   status: "Active" | "Inactive";
//   tags: string[];
// }

// interface MasterProductsState {
//   products: MasterProduct[];
//   categories: string[];
//   subcategories: string[];
//   brands: string[];
//   units: string[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// // Function to generate mock products
// const generateProducts = (): MasterProduct[] => {
//   const categories = [
//     "Food",
//     "Beverages",
//     "Dairy",
//     "Snacks",
//     "Personal Care",
//     "Household",
//   ];
//   const subcategories = [
//     "Breakfast",
//     "Lunch",
//     "Dinner",
//     "Snacks",
//     "Desserts",
//     "Organic",
//     "Soft Drinks",
//     "Juices",
//     "Tea",
//     "Coffee",
//     "Energy Drinks",
//     "Milk",
//     "Cheese",
//     "Yogurt",
//     "Butter",
//     "Ice Cream",
//     "Chips",
//     "Cookies",
//     "Nuts",
//     "Candies",
//     "Popcorn",
//     "Shampoo",
//     "Soap",
//     "Toothpaste",
//     "Deodorant",
//     "Lotion",
//     "Cleaning",
//     "Laundry",
//     "Dishwashing",
//     "Paper",
//     "Trash Bags",
//   ];
//   const brands = ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"];
//   const units = ["kg", "g", "l", "ml", "pcs", "pack", "bottle", "box"];
//   const tags = ["Popular", "New", "Sale", "Organic", "Premium", "Eco-friendly"];

//   const products: MasterProduct[] = [];

//   // Generate 50 products
//   for (let i = 1; i <= 50; i++) {
//     const category = categories[Math.floor(Math.random() * categories.length)];
//     const subcategory =
//       subcategories[Math.floor(Math.random() * subcategories.length)];
//     const brand = brands[Math.floor(Math.random() * brands.length)];
//     const unit = units[Math.floor(Math.random() * units.length)];
//     const price = Math.floor(Math.random() * 500) + 10;
//     const commission = Math.floor(Math.random() * 20) + 5;

//     // Generate 1-3 random tags
//     const productTags: string[] = [];
//     const tagCount = Math.floor(Math.random() * 3) + 1;
//     for (let j = 0; j < tagCount; j++) {
//       const tag = tags[Math.floor(Math.random() * tags.length)];
//       if (!productTags.includes(tag)) {
//         productTags.push(tag);
//       }
//     }

//     products.push({
//       id: `product-${i}`,
//       name: `Product ${i}`,
//       sku: `SKU-${1000 + i}`,
//       category,
//       subcategory,
//       brand,
//       unit,
//       price,
//       commission,
//       description: `This is a detailed description for Product ${i}. It's a high-quality product that meets all customer expectations.`,
//       image: `https://picsum.photos/seed/product${i}/200/200.jpg`,
//       status: Math.random() > 0.2 ? "Active" : "Inactive",
//       tags: productTags,
//     });
//   }

//   return products;
// };

// const initialState: MasterProductsState = {
//   products: generateProducts(),
//   categories: [
//     "Food",
//     "Beverages",
//     "Dairy",
//     "Snacks",
//     "Personal Care",
//     "Household",
//   ],
//   subcategories: [
//     "Breakfast",
//     "Lunch",
//     "Dinner",
//     "Snacks",
//     "Desserts",
//     "Organic",
//     "Soft Drinks",
//     "Juices",
//     "Tea",
//     "Coffee",
//     "Energy Drinks",
//     "Milk",
//     "Cheese",
//     "Yogurt",
//     "Butter",
//     "Ice Cream",
//     "Chips",
//     "Cookies",
//     "Nuts",
//     "Candies",
//     "Popcorn",
//     "Shampoo",
//     "Soap",
//     "Toothpaste",
//     "Deodorant",
//     "Lotion",
//     "Cleaning",
//     "Laundry",
//     "Dishwashing",
//     "Paper",
//     "Trash Bags",
//   ],
//   brands: ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"],
//   units: ["kg", "g", "l", "ml", "pcs", "pack", "bottle", "box"],
//   status: "idle",
//   error: null,
// };

// // Async thunk for fetching products
// export const fetchMasterProducts = createAsyncThunk(
//   "masterProducts/fetchMasterProducts",
//   async () => {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     return initialState.products;
//   }
// );

// const masterProductsSlice = createSlice({
//   name: "masterProducts",
//   initialState,
//   reducers: {
//     addProduct: (state, action: PayloadAction<MasterProduct>) => {
//       state.products.push({ ...action.payload, id: Date.now().toString() });
//     },
//     editProduct: (state, action: PayloadAction<MasterProduct>) => {
//       const index = state.products.findIndex((p) => p.id === action.payload.id);
//       if (index !== -1) state.products[index] = action.payload;
//     },
//     deleteProduct: (state, action: PayloadAction<string>) => {
//       state.products = state.products.filter((p) => p.id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMasterProducts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchMasterProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.products = action.payload;
//       })
//       .addCase(fetchMasterProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Failed to fetch products";
//       });
//   },
// });

// export const { addProduct, editProduct, deleteProduct } =
//   masterProductsSlice.actions;
// export default masterProductsSlice.reducer;

// src/modules/shop/masterProducts/masterProductsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface MasterProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  subcategory: string;
  brand: string;
  unit: string;
  price: number;
  commission: number;
  description: string;
  image: string;
  status: "Active" | "Inactive";
  tags: string[];
}

interface MasterProductsState {
  products: MasterProduct[];
  categories: string[];
  subcategories: string[];
  brands: string[];
  units: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock products
const generateProducts = (): MasterProduct[] => {
  const categories = [
    "Food",
    "Beverages",
    "Dairy",
    "Snacks",
    "Personal Care",
    "Household",
  ];
  const subcategories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Desserts",
    "Organic",
    "Soft Drinks",
    "Juices",
    "Tea",
    "Coffee",
    "Energy Drinks",
    "Milk",
    "Cheese",
    "Yogurt",
    "Butter",
    "Ice Cream",
    "Chips",
    "Cookies",
    "Nuts",
    "Candies",
    "Popcorn",
    "Shampoo",
    "Soap",
    "Toothpaste",
    "Deodorant",
    "Lotion",
    "Cleaning",
    "Laundry",
    "Dishwashing",
    "Paper",
    "Trash Bags",
  ];
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"];
  const units = ["kg", "g", "l", "ml", "pcs", "pack", "bottle", "box"];
  const tags = ["Popular", "New", "Sale", "Organic", "Premium", "Eco-friendly"];

  const products: MasterProduct[] = [];

  // Generate 50 products
  for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const subcategory =
      subcategories[Math.floor(Math.random() * subcategories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const unit = units[Math.floor(Math.random() * units.length)];
    const price = Math.floor(Math.random() * 500) + 10;
    const commission = Math.floor(Math.random() * 20) + 5;

    // Generate 1-3 random tags
    const productTags: string[] = [];
    const tagCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < tagCount; j++) {
      const tag = tags[Math.floor(Math.random() * tags.length)];
      if (!productTags.includes(tag)) {
        productTags.push(tag);
      }
    }

    products.push({
      id: `product-${i}`,
      name: `Product ${i}`,
      sku: `SKU-${1000 + i}`,
      category,
      subcategory,
      brand,
      unit,
      price,
      commission,
      description: `This is a detailed description for Product ${i}. It's a high-quality product that meets all customer expectations.`,
      image: `https://picsum.photos/seed/product${i}/200/200.jpg`,
      status: Math.random() > 0.2 ? "Active" : "Inactive",
      tags: productTags,
    });
  }

  return products;
};

const initialState: MasterProductsState = {
  products: generateProducts(),
  categories: [
    "Food",
    "Beverages",
    "Dairy",
    "Snacks",
    "Personal Care",
    "Household",
  ],
  subcategories: [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Desserts",
    "Organic",
    "Soft Drinks",
    "Juices",
    "Tea",
    "Coffee",
    "Energy Drinks",
    "Milk",
    "Cheese",
    "Yogurt",
    "Butter",
    "Ice Cream",
    "Chips",
    "Cookies",
    "Nuts",
    "Candies",
    "Popcorn",
    "Shampoo",
    "Soap",
    "Toothpaste",
    "Deodorant",
    "Lotion",
    "Cleaning",
    "Laundry",
    "Dishwashing",
    "Paper",
    "Trash Bags",
  ],
  brands: ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"],
  units: ["kg", "g", "l", "ml", "pcs", "pack", "bottle", "box"],
  status: "idle",
  error: null,
};

// Async thunk for fetching products
export const fetchMasterProducts = createAsyncThunk(
  "masterProducts/fetchMasterProducts",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.products;
  }
);

const masterProductsSlice = createSlice({
  name: "masterProducts",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<MasterProduct>) => {
      state.products.push({ ...action.payload, id: Date.now().toString() });
    },
    editProduct: (state, action: PayloadAction<MasterProduct>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMasterProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMasterProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchMasterProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { addProduct, editProduct, deleteProduct } =
  masterProductsSlice.actions;
export default masterProductsSlice.reducer;
