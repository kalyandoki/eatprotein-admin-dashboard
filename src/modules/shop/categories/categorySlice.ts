// src/modules/categories/categorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string; // Added image field
  status: "Active" | "Inactive";
  items: number;
  createdDate: string;
}

interface CategoryState {
  categories: Category[];
  search: string;
  selectedCategory: Category | null;
}

const initialState: CategoryState = {
  search: "",
  selectedCategory: null,
  categories: [
    {
      id: "1",
      name: "Fresh Ingredients",
      description: "Fresh vegetables, fruits, and raw ingredients",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      status: "Active",
      items: 245,
      createdDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Processed Foods",
      description: "Packaged and processed food items",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      status: "Active",
      items: 156,
      createdDate: "2024-01-12",
    },
    {
      id: "3",
      name: "Beverages",
      description: "Drinks and liquid refreshments",
      image:
        "https://images.unsplash.com/photo-1551024601-b5788e9bdc16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      status: "Active",
      items: 89,
      createdDate: "2024-01-10",
    },
  ],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    addCategory(state, action: PayloadAction<Category>) {
      state.categories.unshift(action.payload);
    },
    setSelectedCategory(state, action: PayloadAction<Category | null>) {
      state.selectedCategory = action.payload;
    },
    updateCategory(state, action: PayloadAction<Category>) {
      const index = state.categories.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) state.categories[index] = action.payload;
    },
    deleteCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload
      );
    },
    // New actions for managing items
    incrementItems(state, action: PayloadAction<string>) {
      const category = state.categories.find((c) => c.id === action.payload);
      if (category) {
        category.items += 1;
      }
    },
    decrementItems(state, action: PayloadAction<string>) {
      const category = state.categories.find((c) => c.id === action.payload);
      if (category && category.items > 0) {
        category.items -= 1;
      }
    },
    setItems(
      state,
      action: PayloadAction<{ categoryId: string; count: number }>
    ) {
      const category = state.categories.find(
        (c) => c.id === action.payload.categoryId
      );
      if (category) {
        category.items = action.payload.count;
      }
    },
  },
});

export const {
  setSearch,
  addCategory,
  setSelectedCategory,
  updateCategory,
  deleteCategory,
  incrementItems,
  decrementItems,
  setItems,
} = categorySlice.actions;

export default categorySlice.reducer;
