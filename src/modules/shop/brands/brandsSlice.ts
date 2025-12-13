import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Brand } from "./types";

interface BrandsState {
  brands: Brand[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BrandsState = {
  brands: [
    {
      id: 1001,
      name: "FireStone Pizza",
      category: "Food & Beverages",
      subCategory: "Pizza",
      status: "Active",
      logo: "", // you can put a placeholder URL if you want
    },
    {
      id: 1002,
      name: "BurgerHub",
      category: "Food & Beverages",
      subCategory: "Burgers",
      status: "Active",
      logo: "",
    },
    {
      id: 1003,
      name: "FreshDrinks",
      category: "Food & Beverages",
      subCategory: "Beverages",
      status: "Active",
      logo: "",
    },
  ],
  status: "idle",
  error: null,
};

// mock fetch (could be replaced with real API)
export const fetchBrands = createAsyncThunk("brands/fetch", async () => {
  await new Promise((r) => setTimeout(r, 400));
  return initialState.brands as Brand[];
});

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    addBrand: (state, action: PayloadAction<Omit<Brand, "id">>) => {
      const newBrand: Brand = {
        ...action.payload,
        id: Date.now(),
      };
      state.brands.unshift(newBrand);
    },
    updateBrand: (state, action: PayloadAction<Brand>) => {
      const index = state.brands.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.brands[index] = action.payload;
      }
    },
    editBrand: (state, action: PayloadAction<Brand>) => {
      const idx = state.brands.findIndex((b) => b.id === action.payload.id);
      if (idx !== -1) state.brands[idx] = action.payload;
    },
    deleteBrand: (state, action: PayloadAction<number>) => {
      state.brands = state.brands.filter((b) => b.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load brands";
      });
  },
});

export const { addBrand, updateBrand, editBrand, deleteBrand } =
  brandsSlice.actions;
export default brandsSlice.reducer;
