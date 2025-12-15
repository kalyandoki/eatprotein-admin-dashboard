// src/modules/products/categorySlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Category {
  id: string;
  name: string;
  nameInTelugu?: string;
  image: string;
}

interface CategoryState {
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoryState = {
  categories: [
    {
      id: "1",
      name: "Veg",
      image: "https://picsum.photos/seed/veg/100/100.jpg",
    },
    {
      id: "2",
      name: "Non Veg",
      image: "https://picsum.photos/seed/nonveg/100/100.jpg",
    },
    {
      id: "3",
      name: "Restaurants",
      image: "https://picsum.photos/seed/restaurants/100/100.jpg",
    },
    {
      id: "4",
      name: "Eggs",
      image: "https://picsum.photos/seed/eggs/100/100.jpg",
    },
    {
      id: "5",
      name: "Dairy Foods",
      image: "https://picsum.photos/seed/dairy/100/100.jpg",
    },
    {
      id: "6",
      name: "Fruits & Vegetables",
      image: "https://picsum.photos/seed/fruits/100/100.jpg",
    },
    {
      id: "7",
      name: "Bakery & Sweets",
      image: "https://picsum.photos/seed/bakery/100/100.jpg",
    },
    {
      id: "8",
      name: "Home Foods",
      image: "https://picsum.photos/seed/homefoods/100/100.jpg",
    },
    {
      id: "9",
      name: "Diet",
      image: "https://picsum.photos/seed/diet/100/100.jpg",
    },
  ],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.categories;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch categories";
      });
  },
});

export default categorySlice.reducer;
