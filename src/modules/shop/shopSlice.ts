// // // src/modules/shop/shopSlice.ts
// // import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// // // Define the type for a single product
// // export interface ShopProduct {
// //   id: number;
// //   name: string;
// //   description: string;
// //   image: string;
// //   price: string;
// //   stock: number;
// //   category: string;
// //   subCategory: string;
// // }

// // // Define the state structure for the shop slice
// // interface ShopState {
// //   products: ShopProduct[];
// //   status: "idle" | "loading" | "succeeded" | "failed";
// //   error: string | null;
// // }

// // // Initial state with more mock data for a better demonstration
// // const initialState: ShopState = {
// //   products: [
// //     {
// //       id: 101,
// //       name: "Organic Almonds",
// //       description: "Healthy snack for daily energy",
// //       image:
// //         "https://images.unsplash.com/photo-1528321011259-1c8c1cf6f8b5?w=100",
// //       price: "450",
// //       stock: 25,
// //       category: "Nuts",
// //       subCategory: "Organic",
// //     },
// //     {
// //       id: 102,
// //       name: "Whole Wheat Flour",
// //       description: "Perfect for all your baking needs",
// //       image:
// //         "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100",
// //       price: "80",
// //       stock: 50,
// //       category: "Grains",
// //       subCategory: "Flour",
// //     },
// //     {
// //       id: 103,
// //       name: "Extra Virgin Olive Oil",
// //       description: "Cold-pressed from the finest olives",
// //       image:
// //         "https://images.unsplash.com/photo-1475289922223-8518b5c0c6d2?w=100",
// //       price: "350",
// //       stock: 15,
// //       category: "Oils",
// //       subCategory: "Organic",
// //     },
// //     {
// //       id: 104,
// //       name: "Natural Honey",
// //       description: "Pure, unprocessed honey from local farms",
// //       image:
// //         "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100",
// //       price: "220",
// //       stock: 30,
// //       category: "Sweeteners",
// //       subCategory: "Organic",
// //     },
// //     {
// //       id: 105,
// //       name: "Basmati Rice",
// //       description: "Long-grain, aromatic rice",
// //       image:
// //         "https://images.unsplash.com/photo-1586737282527-3a658d32c9c5?w=100",
// //       price: "150",
// //       stock: 100,
// //       category: "Grains",
// //       subCategory: "Rice",
// //     },
// //     {
// //       id: 106,
// //       name: "Greek Yogurt",
// //       description: "Creamy and protein-rich yogurt",
// //       image:
// //         "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100",
// //       price: "120",
// //       stock: 40,
// //       category: "Dairy",
// //       subCategory: "Yogurt",
// //     },
// //   ],
// //   status: "idle",
// //   error: null,
// // };

// // // In a real app, these would be async thunks fetching from an API
// // // For now, they are synchronous actions that modify the local state
// // const shopSlice = createSlice({
// //   name: "shop",
// //   initialState,
// //   reducers: {
// //     addShopProduct: (state, action: PayloadAction<ShopProduct>) => {
// //       // In a real app, you'd optimistically update or wait for API success
// //       state.products.push({ ...action.payload, id: Date.now() }); // simple unique id
// //     },
// //     editShopProduct: (state, action: PayloadAction<ShopProduct>) => {
// //       const index = state.products.findIndex((p) => p.id === action.payload.id);
// //       if (index !== -1) {
// //         state.products[index] = action.payload;
// //       }
// //     },
// //     deleteShopProduct: (state, action: PayloadAction<number>) => {
// //       state.products = state.products.filter((p) => p.id !== action.payload);
// //     },
// //   },
// // });

// // export const { addShopProduct, editShopProduct, deleteShopProduct } =
// //   shopSlice.actions;
// // export default shopSlice.reducer;

// // // src/modules/shop/shopSlice.ts
// // import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// // export interface Nutrition {
// //   calories: string;
// //   fat: string;
// //   carb: string;
// //   protein: string;
// // }

// // // Define type for a single product
// // export interface ShopProduct {
// //   id: number;
// //   name: string;
// //   description: string;
// //   image: string;
// //   price: string;
// //   stock: number;
// //   category: string;
// //   subCategory: string;
// //   nutrition: Nutrition;
// // }

// // // Define state structure for shop slice
// // interface ShopState {
// //   products: ShopProduct[];
// //   status: "idle" | "loading" | "succeeded" | "failed";
// //   error: string | null;
// // }

// // // Initial state with more mock data including nutrition info
// // const initialState: ShopState = {
// //   products: [
// //     {
// //       id: 101,
// //       name: "Organic Almonds",
// //       description: "Healthy snack for daily energy",
// //       image:
// //         "https://thumbs.dreamstime.com/b/raw-fresh-almonds-shell-59456326.jpg",
// //       price: "450",
// //       stock: 25,
// //       category: "Nuts",
// //       subCategory: "Organic",
// //       nutrition: {
// //         calories: "385g",
// //         fat: "11.8g",
// //         carb: "28.5g",
// //         protein: "14.6g",
// //         image:
// //           "https://thumbs.dreamstime.com/b/raw-fresh-almonds-shell-59456326.jpg",
// //       },
// //     },
// //     {
// //       id: 102,
// //       name: "Whole Wheat Flour",
// //       description: "Perfect for all your baking needs",
// //       image:
// //         "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100",
// //       price: "80",
// //       stock: 50,
// //       category: "Grains",
// //       subCategory: "Flour",
// //       nutrition: {
// //         calories: "340g",
// //         fat: "2.2g",
// //         carb: "72.0g",
// //         protein: "13.0g",
// //         image:
// //           "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100",
// //       },
// //     },
// //     {
// //       id: 103,
// //       name: "Extra Virgin Olive Oil",
// //       description: "Cold-pressed from finest olives",
// //       image: "https://m.media-amazon.com/images/I/61Xy0mO+HtL.jpg",
// //       price: "350",
// //       stock: 15,
// //       category: "Oils",
// //       subCategory: "Organic",
// //       nutrition: {
// //         calories: "884g",
// //         fat: "100.0g",
// //         carb: "0.0g",
// //         protein: "0.0g",
// //         image: "https://m.media-amazon.com/images/I/61Xy0mO+HtL.jpg",
// //       },
// //     },
// //     {
// //       id: 104,
// //       name: "Natural Honey",
// //       description: "Pure, unprocessed honey from local farms",
// //       image:
// //         "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100",
// //       price: "220",
// //       stock: 30,
// //       category: "Sweeteners",
// //       subCategory: "Organic",
// //       nutrition: {
// //         calories: "304g",
// //         fat: "0.0g",
// //         carb: "82.4g",
// //         protein: "0.3g",
// //       },
// //     },
// //     {
// //       id: 105,
// //       name: "Basmati Rice",
// //       description: "Long-grain, aromatic rice",
// //       image:
// //         "https://cdn.loveandlemons.com/wp-content/uploads/2020/03/how-to-cook-rice.jpg",
// //       price: "150",
// //       stock: 100,
// //       category: "Grains",
// //       subCategory: "Rice",
// //       nutrition: {
// //         calories: "370g",
// //         fat: "1.0g",
// //         carb: "80.0g",
// //         protein: "8.0g",
// //       },
// //     },
// //     {
// //       id: 106,
// //       name: "Greek Yogurt",
// //       description: "Creamy and protein-rich yogurt",
// //       image:
// //         "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100",
// //       price: "120",
// //       stock: 40,
// //       category: "Dairy",
// //       subCategory: "Yogurt",
// //       nutrition: {
// //         calories: "59g",
// //         fat: "0.4g",
// //         carb: "3.6g",
// //         protein: "10.0g",
// //       },
// //     },
// //     {
// //       id: 109,
// //       name: "Basmati Rice",
// //       description: "Long-grain, aromatic rice",
// //       image:
// //         "https://cdn.loveandlemons.com/wp-content/uploads/2020/03/how-to-cook-rice.jpg",
// //       price: "150",
// //       stock: 100,
// //       category: "Grains",
// //       subCategory: "Rice",
// //       nutrition: {
// //         calories: "370g",
// //         fat: "1.0g",
// //         carb: "80.0g",
// //         protein: "8.0g",
// //       },
// //     },
// //     {
// //       id: 110,
// //       name: "Greek Yogurt",
// //       description: "Creamy and protein-rich yogurt",
// //       image:
// //         "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100",
// //       price: "120",
// //       stock: 40,
// //       category: "Dairy",
// //       subCategory: "Yogurt",
// //       nutrition: {
// //         calories: "59g",
// //         fat: "0.4g",
// //         carb: "3.6g",
// //         protein: "10.0g",
// //       },
// //     },
// //     {
// //       id: 11,
// //       name: "Organic Almonds",
// //       description: "Healthy snack for daily energy",
// //       image:
// //         "https://thumbs.dreamstime.com/b/raw-fresh-almonds-shell-59456326.jpg",
// //       price: "450",
// //       stock: 25,
// //       category: "Nuts",
// //       subCategory: "Organic",
// //       nutrition: {
// //         calories: "385g",
// //         fat: "11.8g",
// //         carb: "28.5g",
// //         protein: "14.6g",
// //       },
// //     },
// //     {
// //       id: 12,
// //       name: "Whole Wheat Flour",
// //       description: "Perfect for all your baking needs",
// //       image:
// //         "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100",
// //       price: "80",
// //       stock: 50,
// //       category: "Grains",
// //       subCategory: "Flour",
// //       nutrition: {
// //         calories: "340g",
// //         fat: "2.2g",
// //         carb: "72.0g",
// //         protein: "13.0g",
// //       },
// //     },
// //   ],
// //   status: "idle",
// //   error: null,
// // };

// // // Create async thunk for fetching products
// // export const fetchProducts = createAsyncThunk(
// //   "shop/fetchProducts",
// //   async () => {
// //     // In a real app, this would be an API call
// //     // For now, we simulate it with a delay
// //     await new Promise((resolve) => setTimeout(resolve, 800));
// //     return initialState.products;
// //   }
// // );

// // const shopSlice = createSlice({
// //   name: "shop",
// //   initialState,
// //   reducers: {
// //     addShopProduct: (state, action: PayloadAction<ShopProduct>) => {
// //       state.products.push({ ...action.payload, id: Date.now() });
// //     },
// //     editShopProduct: (state, action: PayloadAction<ShopProduct>) => {
// //       const index = state.products.findIndex((p) => p.id === action.payload.id);
// //       if (index !== -1) {
// //         state.products[index] = action.payload;
// //       }
// //     },
// //     deleteShopProduct: (state, action: PayloadAction<number>) => {
// //       state.products = state.products.filter((p) => p.id !== action.payload);
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchProducts.pending, (state) => {
// //         state.status = "loading";
// //       })
// //       .addCase(fetchProducts.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.products = action.payload;
// //       })
// //       .addCase(fetchProducts.rejected, (state, action) => {
// //         state.status = "failed";
// //         state.error = action.error.message || "Something went wrong";
// //       });
// //   },
// // });

// // export const { addShopProduct, editShopProduct, deleteShopProduct } =
// //   shopSlice.actions;
// // export default shopSlice.reducer;

// // src/modules/shop/shopSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// export interface Nutrition {
//   calories: string;
//   fat: string;
//   carb: string;
//   protein: string;
//   image?: string; // Add image property to nutrition
// }

// // Define type for a single product
// export interface ShopProduct {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   price: string;
//   stock: number;
//   category: string;
//   subCategory: string;
//   nutrition: Nutrition;
//   rating?: number; // Add rating property
// }

// // Define state structure for shop slice
// interface ShopState {
//   products: ShopProduct[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// // Initial state with more mock data including nutrition info
// const initialState: ShopState = {
//   products: [
//     {
//       id: 101,
//       name: "Organic Almonds",
//       description: "Healthy snack for daily energy",
//       image:
//         "https://thumbs.dreamstime.com/b/raw-fresh-almonds-shell-59456326.jpg",
//       price: "450",
//       stock: 25,
//       category: "Nuts",
//       subCategory: "Organic",
//       nutrition: {
//         calories: "385",
//         fat: "11.8",
//         carb: "28.5",
//         protein: "14.6",
//         image:
//           "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
//       },
//       rating: 4.5,
//     },
//     {
//       id: 102,
//       name: "Whole Wheat Flour",
//       description: "Perfect for all your baking needs",
//       image:
//         "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100",
//       price: "80",
//       stock: 50,
//       category: "Grains",
//       subCategory: "Flour",
//       nutrition: {
//         calories: "340",
//         fat: "2.2",
//         carb: "72.0",
//         protein: "13.0",
//         image:
//           "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
//       },
//       rating: 4.2,
//     },
//     {
//       id: 103,
//       name: "Extra Virgin Olive Oil",
//       description: "Cold-pressed from finest olives",
//       image: "https://m.media-amazon.com/images/I/61Xy0mO+HtL.jpg",
//       price: "350",
//       stock: 15,
//       category: "Oils",
//       subCategory: "Organic",
//       nutrition: {
//         calories: "884",
//         fat: "100.0",
//         carb: "0.0",
//         protein: "0.0",
//         image:
//           "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
//       },
//       rating: 4.8,
//     },
//     {
//       id: 104,
//       name: "Natural Honey",
//       description: "Pure, unprocessed honey from local farms",
//       image:
//         "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100",
//       price: "220",
//       stock: 30,
//       category: "Sweeteners",
//       subCategory: "Organic",
//       nutrition: {
//         calories: "304",
//         fat: "0.0",
//         carb: "82.4",
//         protein: "0.3",
//         image:
//           "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
//       },
//       rating: 4.7,
//     },
//     {
//       id: 105,
//       name: "Basmati Rice",
//       description: "Long-grain, aromatic rice",
//       image:
//         "https://cdn.loveandlemons.com/wp-content/uploads/2020/03/how-to-cook-rice.jpg",
//       price: "150",
//       stock: 100,
//       category: "Grains",
//       subCategory: "Rice",
//       nutrition: {
//         calories: "370",
//         fat: "1.0",
//         carb: "80.0",
//         protein: "8.0",
//         image:
//           "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
//       },
//       rating: 4.3,
//     },
//     {
//       id: 106,
//       name: "Greek Yogurt",
//       description: "Creamy and protein-rich yogurt",
//       image:
//         "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100",
//       price: "120",
//       stock: 40,
//       category: "Dairy",
//       subCategory: "Yogurt",
//       nutrition: {
//         calories: "59",
//         fat: "0.4",
//         carb: "3.6",
//         protein: "10.0",
//         image:
//           "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
//       },
//       rating: 4.6,
//     },
//     {
//       id: 109,
//       name: "Basmati Rice",
//       description: "Long-grain, aromatic rice",
//       image:
//         "https://cdn.loveandlemons.com/wp-content/uploads/2020/03/how-to-cook-rice.jpg",
//       price: "150",
//       stock: 100,
//       category: "Grains",
//       subCategory: "Rice",
//       nutrition: {
//         calories: "370",
//         fat: "1.0",
//         carb: "80.0",
//         protein: "8.0",
//         image:
//           "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
//       },
//       rating: 4.3,
//     },
//     {
//       id: 110,
//       name: "Greek Yogurt",
//       description: "Creamy and protein-rich yogurt",
//       image:
//         "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100",
//       price: "120",
//       stock: 40,
//       category: "Dairy",
//       subCategory: "Yogurt",
//       nutrition: {
//         calories: "59",
//         fat: "0.4",
//         carb: "3.6",
//         protein: "10.0",
//         image:
//           "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
//       },
//       rating: 4.6,
//     },
//     {
//       id: 11,
//       name: "Organic Almonds",
//       description: "Healthy snack for daily energy",
//       image:
//         "https://thumbs.dreamstime.com/b/raw-fresh-almonds-shell-59456326.jpg",
//       price: "450",
//       stock: 25,
//       category: "Nuts",
//       subCategory: "Organic",
//       nutrition: {
//         calories: "385",
//         fat: "11.8",
//         carb: "28.5",
//         protein: "14.6",
//         image:
//           "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
//       },
//       rating: 4.5,
//     },
//     {
//       id: 12,
//       name: "Whole Wheat Flour",
//       description: "Perfect for all your baking needs",
//       image:
//         "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100",
//       price: "80",
//       stock: 50,
//       category: "Grains",
//       subCategory: "Flour",
//       nutrition: {
//         calories: "340",
//         fat: "2.2",
//         carb: "72.0",
//         protein: "13.0",
//         image:
//           "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
//       },
//       rating: 4.2,
//     },
//   ],
//   status: "idle",
//   error: null,
// };

// // Create async thunk for fetching products
// export const fetchProducts = createAsyncThunk(
//   "shop/fetchProducts",
//   async () => {
//     // In a real app, this would be an API call
//     // For now, we simulate it with a delay
//     await new Promise((resolve) => setTimeout(resolve, 800));
//     return initialState.products;
//   }
// );

// const shopSlice = createSlice({
//   name: "shop",
//   initialState,
//   reducers: {
//     addShopProduct: (state, action: PayloadAction<ShopProduct>) => {
//       state.products.push({ ...action.payload, id: Date.now() });
//     },
//     editShopProduct: (state, action: PayloadAction<ShopProduct>) => {
//       const index = state.products.findIndex((p) => p.id === action.payload.id);
//       if (index !== -1) {
//         state.products[index] = action.payload;
//       }
//     },
//     deleteShopProduct: (state, action: PayloadAction<number>) => {
//       state.products = state.products.filter((p) => p.id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.products = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Something went wrong";
//       });
//   },
// });

// export const { addShopProduct, editShopProduct, deleteShopProduct } =
//   shopSlice.actions;
// export default shopSlice.reducer;

// src/modules/shop/shopSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Nutrition {
  calories: string;
  fat: string;
  carb: string;
  protein: string;
  image?: string;
}

export interface ShopProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  stock: number;
  category: string;
  subCategory: string;
  nutrition: Nutrition;
  rating?: number;
}

interface ShopState {
  products: ShopProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedProduct: ShopProduct | null;
}

const initialState: ShopState = {
  products: [
    {
      id: 101,
      name: "Organic Almonds",
      description: "Healthy snack for daily energy",
      image:
        "https://thumbs.dreamstime.com/b/raw-fresh-almonds-shell-59456326.jpg",
      price: "450",
      stock: 25,
      category: "Nuts",
      subCategory: "Organic",
      nutrition: {
        calories: "385",
        fat: "11.8",
        carb: "28.5",
        protein: "14.6",
        image:
          "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
      },
      rating: 4.5,
    },
    {
      id: 102,
      name: "Whole Wheat Flour",
      description: "Perfect for all your baking needs",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100",
      price: "80",
      stock: 50,
      category: "Grains",
      subCategory: "Flour",
      nutrition: {
        calories: "340",
        fat: "2.2",
        carb: "72.0",
        protein: "13.0",
        image:
          "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
      },
      rating: 4.2,
    },
    {
      id: 103,
      name: "Extra Virgin Olive Oil",
      description: "Cold-pressed from finest olives",
      image: "https://m.media-amazon.com/images/I/61Xy0mO+HtL.jpg",
      price: "350",
      stock: 15,
      category: "Oils",
      subCategory: "Organic",
      nutrition: {
        calories: "884",
        fat: "100.0",
        carb: "0.0",
        protein: "0.0",
        image:
          "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
      },
      rating: 4.8,
    },
    {
      id: 104,
      name: "Natural Honey",
      description: "Pure, unprocessed honey from local farms",
      image:
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100",
      price: "220",
      stock: 30,
      category: "Sweeteners",
      subCategory: "Organic",
      nutrition: {
        calories: "304",
        fat: "0.0",
        carb: "82.4",
        protein: "0.3",
        image:
          "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
      },
      rating: 4.7,
    },
    {
      id: 105,
      name: "Basmati Rice",
      description: "Long-grain, aromatic rice",
      image:
        "https://cdn.loveandlemons.com/wp-content/uploads/2020/03/how-to-cook-rice.jpg",
      price: "150",
      stock: 100,
      category: "Grains",
      subCategory: "Rice",
      nutrition: {
        calories: "370",
        fat: "1.0",
        carb: "80.0",
        protein: "8.0",
        image:
          "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
      },
      rating: 4.3,
    },
    {
      id: 106,
      name: "Greek Yogurt",
      description: "Creamy and protein-rich yogurt",
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100",
      price: "120",
      stock: 40,
      category: "Dairy",
      subCategory: "Yogurt",
      nutrition: {
        calories: "59",
        fat: "0.4",
        carb: "3.6",
        protein: "10.0",
        image:
          "https://www.shutterstock.com/shutterstock/photos/2477153851/display_1500/stock-photo-many-different-healthy-food-on-white-table-flat-lay-2477153851.jpg",
      },
      rating: 4.6,
    },
  ],
  status: "idle",
  error: null,
  selectedProduct: null,
};

export const fetchProducts = createAsyncThunk(
  "shop/fetchProducts",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return initialState.products;
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addShopProduct: (state, action: PayloadAction<ShopProduct>) => {
      state.products.push({ ...action.payload, id: Date.now() });
    },
    editShopProduct: (state, action: PayloadAction<ShopProduct>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteShopProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    setSelectedProduct: (state, action: PayloadAction<ShopProduct | null>) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const {
  addShopProduct,
  editShopProduct,
  deleteShopProduct,
  setSelectedProduct,
} = shopSlice.actions;
export default shopSlice.reducer;
