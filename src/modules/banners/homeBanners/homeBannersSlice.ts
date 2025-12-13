// // src/modules/banners/homeBanners/homeBannersSlice.ts
// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// export interface HomeBanner {
//   id: string;
//   sno: number;
//   bannerType: string;
//   tags: string[];
//   bannerName: string;
//   bannerImage: string;
//   status: "Active" | "Inactive";
//   createdAt: string;
//   updatedAt: string;
// }

// interface HomeBannersState {
//   banners: HomeBanner[];
//   bannerTypes: string[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// // Function to generate mock banners
// const generateBanners = (): HomeBanner[] => {
//   const bannerTypes = [
//     "Hero Banner",
//     "Category Banner",
//     "Promotional Banner",
//     "Footer Banner",
//   ];

//   const bannerNames = [
//     "Summer Sale 2023",
//     "New Collection",
//     "Electronics Deal",
//     "Fashion Week",
//     "Home Appliances",
//     "Weekend Special",
//     "Flash Sale",
//     "Clearance Sale",
//   ];

//   const tags = [
//     "Sale",
//     "New",
//     "Popular",
//     "Featured",
//     "Limited",
//     "Exclusive",
//     "Seasonal",
//     "Trending",
//   ];

//   const banners: HomeBanner[] = [];

//   // Generate 15 banners
//   for (let i = 1; i <= 15; i++) {
//     const bannerType =
//       bannerTypes[Math.floor(Math.random() * bannerTypes.length)];
//     const bannerName =
//       bannerNames[Math.floor(Math.random() * bannerNames.length)];

//     // Generate 1-3 random tags
//     const bannerTags: string[] = [];
//     const tagCount = Math.floor(Math.random() * 3) + 1;
//     for (let j = 0; j < tagCount; j++) {
//       const tag = tags[Math.floor(Math.random() * tags.length)];
//       if (!bannerTags.includes(tag)) {
//         bannerTags.push(tag);
//       }
//     }

//     banners.push({
//       id: `banner-${i}`,
//       sno: i,
//       bannerType,
//       tags: bannerTags,
//       bannerName,
//       bannerImage: `https://picsum.photos/seed/banner${i}/800/400.jpg`,
//       status: Math.random() > 0.2 ? "Active" : "Inactive",
//       createdAt: new Date(
//         Date.now() - Math.random() * 10000000000
//       ).toISOString(),
//       updatedAt: new Date(
//         Date.now() - Math.random() * 1000000000
//       ).toISOString(),
//     });
//   }

//   return banners;
// };

// const initialState: HomeBannersState = {
//   banners: generateBanners(),
//   bannerTypes: [
//     "Hero Banner",
//     "Category Banner",
//     "Promotional Banner",
//     "Footer Banner",
//   ],
//   status: "idle",
//   error: null,
// };

// // Async thunk for fetching banners
// export const fetchHomeBanners = createAsyncThunk(
//   "homeBanners/fetchHomeBanners",
//   async () => {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     return initialState.banners;
//   }
// );

// const homeBannersSlice = createSlice({
//   name: "homeBanners",
//   initialState,
//   reducers: {
//     addBanner: (
//       state,
//       action: PayloadAction<
//         Omit<HomeBanner, "id" | "sno" | "createdAt" | "updatedAt">
//       >
//     ) => {
//       const newBanner: HomeBanner = {
//         ...action.payload,
//         id: Date.now().toString(),
//         sno: state.banners.length + 1,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };
//       state.banners.push(newBanner);
//     },
//     editBanner: (state, action: PayloadAction<HomeBanner>) => {
//       const index = state.banners.findIndex((b) => b.id === action.payload.id);
//       if (index !== -1) {
//         state.banners[index] = {
//           ...action.payload,
//           updatedAt: new Date().toISOString(),
//         };
//       }
//     },
//     deleteBanner: (state, action: PayloadAction<string>) => {
//       state.banners = state.banners.filter((b) => b.id !== action.payload);
//       // Renumber sno
//       state.banners.forEach((banner, index) => {
//         banner.sno = index + 1;
//       });
//     },
//     duplicateBanner: (state, action: PayloadAction<string>) => {
//       const bannerToDuplicate = state.banners.find(
//         (b) => b.id === action.payload
//       );
//       if (bannerToDuplicate) {
//         const duplicatedBanner: HomeBanner = {
//           ...bannerToDuplicate,
//           id: Date.now().toString(),
//           sno: state.banners.length + 1,
//           bannerName: `${bannerToDuplicate.bannerName} (Copy)`,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         };
//         state.banners.push(duplicatedBanner);
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchHomeBanners.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchHomeBanners.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.banners = action.payload;
//       })
//       .addCase(fetchHomeBanners.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Failed to fetch banners";
//       });
//   },
// });

// export const { addBanner, editBanner, deleteBanner, duplicateBanner } =
//   homeBannersSlice.actions;
// export default homeBannersSlice.reducer;

// src/modules/banners/homeBanners/homeBannersSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface HomeBanner {
  id: string;
  sno: number;
  bannerType: string;
  tags: string[];
  bannerName: string;
  bannerImage: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

interface HomeBannersState {
  banners: HomeBanner[];
  bannerTypes: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock banners
const generateBanners = (): HomeBanner[] => {
  const bannerTypes = [
    "Hero Banner",
    "Category Banner",
    "Promotional Banner",
    "Footer Banner",
  ];

  const bannerNames = [
    "Summer Sale 2023",
    "New Collection",
    "Electronics Deal",
    "Fashion Week",
    "Home Appliances",
    "Weekend Special",
    "Flash Sale",
    "Clearance Sale",
  ];

  const tags = [
    "Sale",
    "New",
    "Popular",
    "Featured",
    "Limited",
    "Exclusive",
    "Seasonal",
    "Trending",
  ];

  const banners: HomeBanner[] = [];

  // Generate 15 banners
  for (let i = 1; i <= 15; i++) {
    const bannerType =
      bannerTypes[Math.floor(Math.random() * bannerTypes.length)];
    const bannerName =
      bannerNames[Math.floor(Math.random() * bannerNames.length)];

    // Generate 1-3 random tags
    const bannerTags: string[] = [];
    const tagCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < tagCount; j++) {
      const tag = tags[Math.floor(Math.random() * tags.length)];
      if (!bannerTags.includes(tag)) {
        bannerTags.push(tag);
      }
    }

    banners.push({
      id: `banner-${i}`,
      sno: i,
      bannerType,
      tags: bannerTags,
      bannerName,
      bannerImage: `https://picsum.photos/seed/banner${i}/800/400.jpg`,
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

const initialState: HomeBannersState = {
  banners: generateBanners(),
  bannerTypes: [
    "Hero Banner",
    "Category Banner",
    "Promotional Banner",
    "Footer Banner",
  ],
  status: "idle",
  error: null,
};

// Async thunk for fetching banners
export const fetchHomeBanners = createAsyncThunk(
  "homeBanners/fetchHomeBanners",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.banners;
  }
);

const homeBannersSlice = createSlice({
  name: "homeBanners",
  initialState,
  reducers: {
    addBanner: (
      state,
      action: PayloadAction<
        Omit<HomeBanner, "id" | "sno" | "createdAt" | "updatedAt">
      >
    ) => {
      const newBanner: HomeBanner = {
        ...action.payload,
        id: Date.now().toString(),
        sno: state.banners.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.banners.push(newBanner);
    },
    editBanner: (state, action: PayloadAction<HomeBanner>) => {
      const index = state.banners.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.banners[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteBanner: (state, action: PayloadAction<string>) => {
      state.banners = state.banners.filter((b) => b.id !== action.payload);
      // Renumber sno
      state.banners.forEach((banner, index) => {
        banner.sno = index + 1;
      });
    },
    duplicateBanner: (state, action: PayloadAction<string>) => {
      const bannerToDuplicate = state.banners.find(
        (b) => b.id === action.payload
      );
      if (bannerToDuplicate) {
        const duplicatedBanner: HomeBanner = {
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
    toggleBannerStatus: (state, action: PayloadAction<string>) => {
      const index = state.banners.findIndex((b) => b.id === action.payload);
      if (index !== -1) {
        state.banners[index].status =
          state.banners[index].status === "Active" ? "Inactive" : "Active";
        state.banners[index].updatedAt = new Date().toISOString();
      }
    },
    updateBannerImage: (
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
      .addCase(fetchHomeBanners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeBanners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banners = action.payload;
      })
      .addCase(fetchHomeBanners.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch banners";
      });
  },
});

export const {
  addBanner,
  editBanner,
  deleteBanner,
  duplicateBanner,
  toggleBannerStatus,
  updateBannerImage,
} = homeBannersSlice.actions;
export default homeBannersSlice.reducer;
