// src/modules/shop/tags/tagsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  image: string;
}

export interface Tag {
  id: string;
  name: string;
  description: string;
  products: Product[]; // Changed from category to products array
  usageCount: number;
  status: "Active" | "Inactive";
}

interface TagsState {
  tags: Tag[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Whey Protein",
    sku: "WP001",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p2",
    name: "BCAA Powder",
    sku: "BCAA001",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p3",
    name: "Creatine",
    sku: "CR001",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p4",
    name: "Pre-Workout",
    sku: "PW001",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p5",
    name: "Protein Bar",
    sku: "PB001",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const initialState: TagsState = {
  tags: [
    {
      id: "1",
      name: "Popular",
      description: "Most popular items",
      products: [mockProducts[0], mockProducts[2]], // Using products instead of category
      usageCount: 456,
      status: "Active",
    },
    {
      id: "2",
      name: "New Arrival",
      description: "Recently added products",
      products: [mockProducts[1], mockProducts[3]],
      usageCount: 89,
      status: "Active",
    },
    {
      id: "3",
      name: "Sale",
      description: "Items on discount",
      products: [mockProducts[0], mockProducts[4]],
      usageCount: 234,
      status: "Active",
    },
    {
      id: "4",
      name: "Limited Edition",
      description: "Limited quantity items",
      products: [mockProducts[2]],
      usageCount: 67,
      status: "Active",
    },
    {
      id: "5",
      name: "Bestseller",
      description: "Top selling products",
      products: [mockProducts[0], mockProducts[1], mockProducts[2]],
      usageCount: 312,
      status: "Active",
    },
    {
      id: "6",
      name: "Eco-friendly",
      description: "Environmentally sustainable products",
      products: [mockProducts[4]],
      usageCount: 128,
      status: "Active",
    },
    {
      id: "7",
      name: "Premium",
      description: "High-end quality products",
      products: [mockProducts[3]],
      usageCount: 95,
      status: "Active",
    },
    {
      id: "8",
      name: "Trending",
      description: "Currently trending items",
      products: [mockProducts[1], mockProducts[2]],
      usageCount: 187,
      status: "Active",
    },
    {
      id: "9",
      name: "Clearance",
      description: "Final sale items",
      products: [mockProducts[4]],
      usageCount: 42,
      status: "Inactive",
    },
    {
      id: "10",
      name: "Exclusive",
      description: "Exclusive to our store",
      products: [mockProducts[0], mockProducts[3]],
      usageCount: 76,
      status: "Active",
    },
  ],
  status: "idle",
  error: null,
};

// Async thunk for fetching tags (simulate API call)
export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return initialState.tags;
});

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<Tag>) => {
      state.tags.push({ ...action.payload, id: Date.now().toString() });
    },
    editTag: (state, action: PayloadAction<Tag>) => {
      const index = state.tags.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tags[index] = action.payload;
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter((t) => t.id !== action.payload);
    },
    toggleTagStatus: (state, action: PayloadAction<string>) => {
      const index = state.tags.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        state.tags[index].status =
          state.tags[index].status === "Active" ? "Inactive" : "Active";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tags";
      });
  },
});

export const { addTag, editTag, deleteTag, toggleTagStatus } =
  tagsSlice.actions;
export default tagsSlice.reducer;
