// src/modules/banners/categoryBanners/categoryBannersSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface CategoryBanner {
  id: string;
  sno: number;
  bannerType: string;
  selectedStore: string;
  bannerName: string;
  categoryName: string;
  bannerImage: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

interface CategoryBannersState {
  banners: CategoryBanner[];
  bannerTypes: string[];
  stores: string[];
  categories: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock category banners
const generateCategoryBanners = (): CategoryBanner[] => {
  const bannerTypes = [
    "Category Banner",
    "Subcategory Banner",
    "Store Banner",
    "Brand Banner",
  ];

  const stores = [
    "Main Store",
    "Electronics Store",
    "Fashion Store",
    "Home Store",
    "Sports Store",
    "Books Store",
  ];

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Sports",
    "Books",
    "Toys",
    "Beauty",
    "Automotive",
  ];

  const bannerNames = [
    "Electronics Sale",
    "Fashion Collection",
    "Home Essentials",
    "Sports Gear",
    "Book Fair",
    "Toy Festival",
    "Beauty Products",
    "Auto Parts",
  ];

  const banners: CategoryBanner[] = [];

  // Generate 15 category banners
  for (let i = 1; i <= 15; i++) {
    const bannerType =
      bannerTypes[Math.floor(Math.random() * bannerTypes.length)];
    const store = stores[Math.floor(Math.random() * stores.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const bannerName =
      bannerNames[Math.floor(Math.random() * bannerNames.length)];

    banners.push({
      id: `category-banner-${i}`,
      sno: i,
      bannerType,
      selectedStore: store,
      bannerName,
      categoryName: category,
      bannerImage: `https://picsum.photos/seed/category${i}/800/400.jpg`,
      status: Math.random() > 0.2 ? "Active" : "Inactive",
      createdAt: new Date(
        Date.now() - Math.random() * 10000000000
      ).toISOString(),
      updatedAt: new Date(
        Date.now() - Math.random() * 1000000000
      ).toISOString(),
    });
  }

  return banners;
};

const initialState: CategoryBannersState = {
  banners: generateCategoryBanners(),
  bannerTypes: [
    "Category Banner",
    "Subcategory Banner",
    "Store Banner",
    "Brand Banner",
  ],
  stores: [
    "Main Store",
    "Electronics Store",
    "Fashion Store",
    "Home Store",
    "Sports Store",
    "Books Store",
  ],
  categories: [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Sports",
    "Books",
    "Toys",
    "Beauty",
    "Automotive",
  ],
  status: "idle",
  error: null,
};

// Async thunk for fetching category banners
export const fetchCategoryBanners = createAsyncThunk(
  "categoryBanners/fetchCategoryBanners",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.banners;
  }
);

const categoryBannersSlice = createSlice({
  name: "categoryBanners",
  initialState,
  reducers: {
    addCategoryBanner: (
      state,
      action: PayloadAction<
        Omit<CategoryBanner, "id" | "sno" | "createdAt" | "updatedAt">
      >
    ) => {
      const newBanner: CategoryBanner = {
        ...action.payload,
        id: Date.now().toString(),
        sno: state.banners.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.banners.push(newBanner);
    },
    editCategoryBanner: (state, action: PayloadAction<CategoryBanner>) => {
      const index = state.banners.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.banners[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteCategoryBanner: (state, action: PayloadAction<string>) => {
      state.banners = state.banners.filter((b) => b.id !== action.payload);
      // Renumber sno
      state.banners.forEach((banner, index) => {
        banner.sno = index + 1;
      });
    },
    duplicateCategoryBanner: (state, action: PayloadAction<string>) => {
      const bannerToDuplicate = state.banners.find(
        (b) => b.id === action.payload
      );
      if (bannerToDuplicate) {
        const duplicatedBanner: CategoryBanner = {
          ...bannerToDuplicate,
          id: Date.now().toString(),
          sno: state.banners.length + 1,
          bannerName: `${bannerToDuplicate.bannerName} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        state.banners.push(duplicatedBanner);
      }
    },
    toggleCategoryBannerStatus: (state, action: PayloadAction<string>) => {
      const index = state.banners.findIndex((b) => b.id === action.payload);
      if (index !== -1) {
        state.banners[index].status =
          state.banners[index].status === "Active" ? "Inactive" : "Active";
        state.banners[index].updatedAt = new Date().toISOString();
      }
    },
    updateCategoryBannerImage: (
      state,
      action: PayloadAction<{ bannerId: string; imageUrl: string }>
    ) => {
      const { bannerId, imageUrl } = action.payload;
      const banner = state.banners.find((b) => b.id === bannerId);
      if (banner) {
        banner.bannerImage = imageUrl;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryBanners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryBanners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banners = action.payload;
      })
      .addCase(fetchCategoryBanners.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch category banners";
      });
  },
});

export const {
  addCategoryBanner,
  editCategoryBanner,
  deleteCategoryBanner,
  duplicateCategoryBanner,
  toggleCategoryBannerStatus,
  updateCategoryBannerImage,
} = categoryBannersSlice.actions;
export default categoryBannersSlice.reducer;
