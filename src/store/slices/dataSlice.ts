import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

/**
 * Mock dataset that mimics server results
 */
export type ProductItem = {
  id: string;
  title: string;
  tags: string[];
  price: number;
  img?: string;
};

const generateProducts = (n = 16): ProductItem[] =>
  Array.from({ length: n }).map((_, i) => ({
    id: `p-${i + 1}`,
    title: `Protein Product ${i + 1}`,
    tags: ["Protein", i % 2 ? "Store" : "Diet"],
    price: Math.round(499 + Math.random() * 2000),
    img: `https://via.placeholder.com/240x140?text=Product+${i + 1}`,
  }));

const initialProducts = generateProducts(24);

export const fetchProducts = createAsyncThunk(
  "data/fetchProducts",
  async () => {
    // placeholder for API call
    return new Promise<ProductItem[]>((resolve) => {
      setTimeout(() => resolve(initialProducts), 350);
    });
  }
);

type DataState = {
  products: ProductItem[];
  loading: boolean;
};

const initialState: DataState = {
  products: initialProducts,
  loading: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.products.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { addProduct } = dataSlice.actions;

export const selectData = (state: RootState) => state.data;

export default dataSlice.reducer;
