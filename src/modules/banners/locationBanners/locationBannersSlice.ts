// // src/modules/banners/locationBanners/locationBannersSlice.ts
// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// export interface LocationBanner {
//   id: string;
//   sno: number;
//   areaName: string;
//   city: string;
//   bannerName: string;
//   bannerImage: string;
//   status: "Active" | "Inactive";
//   createdAt: string;
//   updatedAt: string;
// }

// interface LocationBannersState {
//   banners: LocationBanner[];
//   areas: string[];
//   cities: string[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// // Function to generate mock location banners
// const generateLocationBanners = (): LocationBanner[] => {
//   const areas = [
//     "A. S. Rao Nagar",
//     "A.S. Rao, Nagar",
//     "Bapuji Nagar",
//     "Christian Peta",
//     "Dammaiguda",
//     "Ramanthapur",
//     "Janathapet",
//     "Kacherimitta",
//     "Kapra",
//     "Kavali",
//     "Kavali Bit - II Rural",
//     "Kundanpally",
//     "Kushaiguda",
//   ];

//   const cities = [
//     "Hyderabad",
//     "Secunderabad",
//     "Kavali",
//     "Vijayawada",
//     "Guntur",
//     "Nellore",
//     "Tirupati",
//     "Visakhapatnam",
//   ];

//   const bannerNames = [
//     "Local Market Special",
//     "City Wide Sale",
//     "Area Festival",
//     "Community Event",
//     "Business Promotion",
//     "Cultural Celebration",
//     "Seasonal Offer",
//   ];

//   const banners: LocationBanner[] = [];

//   // Generate 15 location banners
//   for (let i = 1; i <= 15; i++) {
//     const area = areas[Math.floor(Math.random() * areas.length)];
//     const city = cities[Math.floor(Math.random() * cities.length)];
//     const bannerName =
//       bannerNames[Math.floor(Math.random() * bannerNames.length)];

//     banners.push({
//       id: `location-banner-${i}`,
//       sno: i,
//       areaName: area,
//       city: city,
//       bannerName,
//       bannerImage: `https://picsum.photos/seed/location${i}/800/400.jpg`,
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

// const initialState: LocationBannersState = {
//   banners: generateLocationBanners(),
//   areas: [
//     "A. S. Rao Nagar",
//     "A.S. Rao, Nagar",
//     "Bapuji Nagar",
//     "Christian Peta",
//     "Dammaiguda",
//     "Ramanthapur",
//     "Janathapet",
//     "Kacherimitta",
//     "Kapra",
//     "Kavali",
//     "Kavali Bit - II Rural",
//     "Kundanpally",
//     "Kushaiguda",
//   ],
//   cities: [
//     "Hyderabad",
//     "Secunderabad",
//     "Kavali",
//     "Vijayawada",
//     "Guntur",
//     "Nellore",
//     "Tirupati",
//     "Visakhapatnam",
//   ],
//   status: "idle",
//   error: null,
// };

// // Async thunk for fetching location banners
// export const fetchLocationBanners = createAsyncThunk(
//   "locationBanners/fetchLocationBanners",
//   async () => {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     return initialState.banners;
//   }
// );

// const locationBannersSlice = createSlice({
//   name: "locationBanners",
//   initialState,
//   reducers: {
//     addLocationBanner: (
//       state,
//       action: PayloadAction<
//         Omit<LocationBanner, "id" | "sno" | "createdAt" | "updatedAt">
//       >
//     ) => {
//       const newBanner: LocationBanner = {
//         ...action.payload,
//         id: Date.now().toString(),
//         sno: state.banners.length + 1,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };
//       state.banners.push(newBanner);
//     },
//     editLocationBanner: (state, action: PayloadAction<LocationBanner>) => {
//       const index = state.banners.findIndex((b) => b.id === action.payload.id);
//       if (index !== -1) {
//         state.banners[index] = {
//           ...action.payload,
//           updatedAt: new Date().toISOString(),
//         };
//       }
//     },
//     deleteLocationBanner: (state, action: PayloadAction<string>) => {
//       state.banners = state.banners.filter((b) => b.id !== action.payload);
//       // Renumber sno
//       state.banners.forEach((banner, index) => {
//         banner.sno = index + 1;
//       });
//     },
//     duplicateLocationBanner: (state, action: PayloadAction<string>) => {
//       const bannerToDuplicate = state.banners.find(
//         (b) => b.id === action.payload
//       );
//       if (bannerToDuplicate) {
//         const duplicatedBanner: LocationBanner = {
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
//       .addCase(fetchLocationBanners.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchLocationBanners.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.banners = action.payload;
//       })
//       .addCase(fetchLocationBanners.rejected, (state, action) => {
//         state.status = "failed";
//         state.error =
//           action.error.message || "Failed to fetch location banners";
//       });
//   },
// });

// export const {
//   addLocationBanner,
//   editLocationBanner,
//   deleteLocationBanner,
//   duplicateLocationBanner,
// } = locationBannersSlice.actions;
// export default locationBannersSlice.reducer;

// src/modules/banners/locationBanners/locationBannersSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface LocationBanner {
  id: string;
  sno: number;
  areaName: string;
  city: string;
  bannerName: string;
  bannerImage: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

interface LocationBannersState {
  banners: LocationBanner[];
  areas: string[];
  cities: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock location banners
const generateLocationBanners = (): LocationBanner[] => {
  const areas = [
    "A. S. Rao Nagar",
    "A.S. Rao, Nagar",
    "Bapuji Nagar",
    "Christian Peta",
    "Dammaiguda",
    "Ramanthapur",
    "Janathapet",
    "Kacherimitta",
    "Kapra",
    "Kavali",
    "Kavali Bit - II Rural",
    "Kundanpally",
    "Kushaiguda",
  ];

  const cities = [
    "Hyderabad",
    "Secunderabad",
    "Kavali",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Tirupati",
    "Visakhapatnam",
  ];

  const bannerNames = [
    "Local Market Special",
    "City Wide Sale",
    "Area Festival",
    "Community Event",
    "Business Promotion",
    "Cultural Celebration",
    "Seasonal Offer",
  ];

  const banners: LocationBanner[] = [];

  // Generate 15 location banners
  for (let i = 1; i <= 15; i++) {
    const area = areas[Math.floor(Math.random() * areas.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const bannerName =
      bannerNames[Math.floor(Math.random() * bannerNames.length)];

    banners.push({
      id: `location-banner-${i}`,
      sno: i,
      areaName: area,
      city: city,
      bannerName,
      bannerImage: `https://picsum.photos/seed/location${i}/800/400.jpg`,
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

const initialState: LocationBannersState = {
  banners: generateLocationBanners(),
  areas: [
    "A. S. Rao Nagar",
    "A.S. Rao, Nagar",
    "Bapuji Nagar",
    "Christian Peta",
    "Dammaiguda",
    "Ramanthapur",
    "Janathapet",
    "Kacherimitta",
    "Kapra",
    "Kavali",
    "Kavali Bit - II Rural",
    "Kundanpally",
    "Kushaiguda",
  ],
  cities: [
    "Hyderabad",
    "Secunderabad",
    "Kavali",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Tirupati",
    "Visakhapatnam",
  ],
  status: "idle",
  error: null,
};

// Async thunk for fetching location banners
export const fetchLocationBanners = createAsyncThunk(
  "locationBanners/fetchLocationBanners",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.banners;
  }
);

const locationBannersSlice = createSlice({
  name: "locationBanners",
  initialState,
  reducers: {
    addLocationBanner: (
      state,
      action: PayloadAction<
        Omit<LocationBanner, "id" | "sno" | "createdAt" | "updatedAt">
      >
    ) => {
      const newBanner: LocationBanner = {
        ...action.payload,
        id: Date.now().toString(),
        sno: state.banners.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.banners.push(newBanner);
    },
    editLocationBanner: (state, action: PayloadAction<LocationBanner>) => {
      const index = state.banners.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.banners[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteLocationBanner: (state, action: PayloadAction<string>) => {
      state.banners = state.banners.filter((b) => b.id !== action.payload);
      // Renumber sno
      state.banners.forEach((banner, index) => {
        banner.sno = index + 1;
      });
    },
    duplicateLocationBanner: (state, action: PayloadAction<string>) => {
      const bannerToDuplicate = state.banners.find(
        (b) => b.id === action.payload
      );
      if (bannerToDuplicate) {
        const duplicatedBanner: LocationBanner = {
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
    toggleLocationBannerStatus: (state, action: PayloadAction<string>) => {
      const index = state.banners.findIndex((b) => b.id === action.payload);
      if (index !== -1) {
        state.banners[index].status =
          state.banners[index].status === "Active" ? "Inactive" : "Active";
        state.banners[index].updatedAt = new Date().toISOString();
      }
    },
    updateLocationBannerImage: (
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
      .addCase(fetchLocationBanners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocationBanners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banners = action.payload;
      })
      .addCase(fetchLocationBanners.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch location banners";
      });
  },
});

export const {
  addLocationBanner,
  editLocationBanner,
  deleteLocationBanner,
  duplicateLocationBanner,
  toggleLocationBannerStatus,
  updateLocationBannerImage,
} = locationBannersSlice.actions;
export default locationBannersSlice.reducer;
