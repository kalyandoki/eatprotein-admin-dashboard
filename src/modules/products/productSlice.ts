// src/modules/products/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  nameInTelugu?: string;
  subCategoryId: string;
  status: "Active" | "Inactive";
  pricing?: {
    quantity: number;
    uom: string;
    purchasePrice: number;
    price: number;
    purchaseOffer: number;
    appSalePrice: number;
    cgst: number;
    sgst: number;
    appPercentage: number;
  };
}

interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [
    {
      id: "1",
      name: "Pumpkin Seeds",
      nameInTelugu: "గుమ్మడికాయ గింజలు",
      subCategoryId: "1",
      status: "Active",
    },
    {
      id: "2",
      name: "Watermelon Seeds",
      nameInTelugu: "పుచ్చకాయ గింజలు",
      subCategoryId: "1",
      status: "Active",
    },
    {
      id: "3",
      name: "Flax Seeds",
      nameInTelugu: "అవిసె గింజలు",
      subCategoryId: "1",
      status: "Active",
    },
    {
      id: "4",
      name: "Chia Seeds",
      nameInTelugu: "చియా విత్తనాలు",
      subCategoryId: "1",
      status: "Active",
    },
    {
      id: "5",
      name: "White Sesame Seeds",
      nameInTelugu: "తెల్ల నువ్వుల గింజలు",
      subCategoryId: "1",
      status: "Active",
    },
  ],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (subCategoryId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.products.filter(
      (product) => product.subCategoryId === subCategoryId
    );
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductPricing: (
      state,
      action: PayloadAction<{ productId: string; pricing: Product["pricing"] }>
    ) => {
      const { productId, pricing } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.pricing = pricing;
      }
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
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { updateProductPricing } = productSlice.actions;
export default productSlice.reducer;
