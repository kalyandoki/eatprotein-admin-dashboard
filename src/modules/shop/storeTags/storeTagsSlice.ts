// // // src/modules/shop/storeTags/storeTagsSlice.ts
// // import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// // export interface StoreTag {
// //   id: string;
// //   name: string;
// //   description: string;
// //   store: string;
// //   priority: "High" | "Medium" | "Low";
// //   status: "Active" | "Inactive";
// // }

// // interface StoreTagsState {
// //   storeTags: StoreTag[];
// //   status: "idle" | "loading" | "succeeded" | "failed";
// //   error: string | null;
// // }

// // const initialState: StoreTagsState = {
// //   storeTags: [
// //     {
// //       id: "1",
// //       name: "Fast Service",
// //       description: "Stores known for quick service",
// //       store: "Downtown Store",
// //       priority: "High",
// //       status: "Active",
// //     },
// //     {
// //       id: "2",
// //       name: "24/7 Open",
// //       description: "Stores open 24 hours",
// //       store: "Airport Terminal",
// //       priority: "Medium",
// //       status: "Active",
// //     },
// //     {
// //       id: "3",
// //       name: "Premium Collection",
// //       description: "Stores with premium products",
// //       store: "Mall Branch",
// //       priority: "High",
// //       status: "Active",
// //     },
// //     {
// //       id: "4",
// //       name: "Kids Friendly",
// //       description: "Stores with kids play area",
// //       store: "Suburban Plaza",
// //       priority: "Medium",
// //       status: "Active",
// //     },
// //     {
// //       id: "5",
// //       name: "Drive Thru",
// //       description: "Stores with drive thru service",
// //       store: "Highway Outlet",
// //       priority: "Low",
// //       status: "Active",
// //     },
// //     {
// //       id: "6",
// //       name: "Pet Friendly",
// //       description: "Stores that allow pets",
// //       store: "Parkside Store",
// //       priority: "Low",
// //       status: "Inactive",
// //     },
// //     {
// //       id: "7",
// //       name: "Self Checkout",
// //       description: "Stores with self checkout options",
// //       store: "Tech Hub",
// //       priority: "Medium",
// //       status: "Active",
// //     },
// //     {
// //       id: "8",
// //       name: "Delivery Available",
// //       description: "Stores offering home delivery",
// //       store: "City Center",
// //       priority: "High",
// //       status: "Active",
// //     },
// //   ],
// //   status: "idle",
// //   error: null,
// // };

// // // Async thunk for fetching store tags (simulate API call)
// // export const fetchStoreTags = createAsyncThunk(
// //   "storeTags/fetchStoreTags",
// //   async () => {
// //     await new Promise((resolve) => setTimeout(resolve, 500));
// //     return initialState.storeTags;
// //   }
// // );

// // const storeTagsSlice = createSlice({
// //   name: "storeTags",
// //   initialState,
// //   reducers: {
// //     addStoreTag: (state, action: PayloadAction<StoreTag>) => {
// //       state.storeTags.push({ ...action.payload, id: Date.now().toString() });
// //     },
// //     editStoreTag: (state, action: PayloadAction<StoreTag>) => {
// //       const index = state.storeTags.findIndex(
// //         (t) => t.id === action.payload.id
// //       );
// //       if (index !== -1) state.storeTags[index] = action.payload;
// //     },
// //     deleteStoreTag: (state, action: PayloadAction<string>) => {
// //       state.storeTags = state.storeTags.filter((t) => t.id !== action.payload);
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchStoreTags.pending, (state) => {
// //         state.status = "loading";
// //       })
// //       .addCase(fetchStoreTags.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.storeTags = action.payload;
// //       })
// //       .addCase(fetchStoreTags.rejected, (state, action) => {
// //         state.status = "failed";
// //         state.error = action.error.message || "Failed to fetch store tags";
// //       });
// //   },
// // });

// // export const { addStoreTag, editStoreTag, deleteStoreTag } =
// //   storeTagsSlice.actions;
// // export default storeTagsSlice.reducer;

// // src/modules/shop/storeTags/storeTagsSlice.ts
// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// export interface Store {
//   id: string;
//   name: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   phone: string;
//   email: string;
//   manager: string;
//   image: string;
//   category: string;
//   subcategory: string;
// }

// export interface StoreTag {
//   id: string;
//   name: string;
//   description: string;
//   stores: string[];
//   storeDetails?: Store[];
//   priority: "High" | "Medium" | "Low";
//   status: "Active" | "Inactive";
//   productsCount?: number;
//   createdAt: string;
//   updatedAt: string;
// }

// interface StoreTagsState {
//   storeTags: StoreTag[];
//   stores: Store[];
//   storeCategories: {
//     id: string;
//     name: string;
//     subcategories: { id: string; name: string }[];
//   }[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// // Valid Unsplash image URLs for stores
// const storeImages = [
//   "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1560472354-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1522336577668-9b38e2ebf32b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1563013544-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1556742502-56751487f6ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1560472354-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1493612272215-4a9de40bc986?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
// ];

// // Mock stores data with categories and subcategories
// const mockStores: Store[] = Array.from({ length: 500 }, (_, i) => ({
//   id: `s${i + 1}`,
//   name: `Store ${i + 1}`,
//   address: `${123 + i} Main St`,
//   city: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][i % 5],
//   state: ["NY", "CA", "IL", "TX", "AZ"][i % 5],
//   zipCode: `${10000 + i}`,
//   phone: `(212) 555-${String(i).padStart(4, "0")}`,
//   email: `store${i + 1}@example.com`,
//   manager: `Manager ${i + 1}`,
//   // Fixed: Use a valid image URL from the array
//   image: storeImages[i % storeImages.length],
//   category: ["Retail", "Food", "Electronics", "Fashion", "Health"][i % 5],
//   subcategory: [
//     ["Supermarket", "Convenience", "Specialty"],
//     ["Restaurant", "Cafe", "Fast Food"],
//     ["Mobile", "Computers", "Accessories"],
//     ["Clothing", "Footwear", "Accessories"],
//     ["Pharmacy", "Fitness", "Wellness"],
//   ][i % 5][Math.floor(i / 5) % 3],
// }));

// // Store categories and subcategories
// const mockStoreCategories = [
//   {
//     id: "retail",
//     name: "Retail",
//     subcategories: [
//       { id: "supermarket", name: "Supermarket" },
//       { id: "convenience", name: "Convenience" },
//       { id: "specialty", name: "Specialty" },
//     ],
//   },
//   {
//     id: "food",
//     name: "Food",
//     subcategories: [
//       { id: "restaurant", name: "Restaurant" },
//       { id: "cafe", name: "Cafe" },
//       { id: "fastfood", name: "Fast Food" },
//     ],
//   },
//   {
//     id: "electronics",
//     name: "Electronics",
//     subcategories: [
//       { id: "mobile", name: "Mobile" },
//       { id: "computers", name: "Computers" },
//       { id: "accessories", name: "Accessories" },
//     ],
//   },
//   {
//     id: "fashion",
//     name: "Fashion",
//     subcategories: [
//       { id: "clothing", name: "Clothing" },
//       { id: "footwear", name: "Footwear" },
//       { id: "fashion-accessories", name: "Accessories" },
//     ],
//   },
//   {
//     id: "health",
//     name: "Health",
//     subcategories: [
//       { id: "pharmacy", name: "Pharmacy" },
//       { id: "fitness", name: "Fitness" },
//       { id: "wellness", name: "Wellness" },
//     ],
//   },
// ];

// const initialState: StoreTagsState = {
//   storeTags: [
//     {
//       id: "1",
//       name: "Fast Service",
//       description: "Stores known for quick service",
//       stores: ["s1", "s3", "s5", "s7"],
//       priority: "High",
//       status: "Active",
//       productsCount: 24,
//       createdAt: "2023-01-15",
//       updatedAt: "2023-01-15",
//     },
//     {
//       id: "2",
//       name: "24/7 Open",
//       description: "Stores open 24 hours",
//       stores: ["s2", "s4", "s6"],
//       priority: "Medium",
//       status: "Active",
//       productsCount: 18,
//       createdAt: "2023-01-16",
//       updatedAt: "2023-01-16",
//     },
//     {
//       id: "3",
//       name: "Premium Collection",
//       description: "Stores with premium products",
//       stores: ["s1", "s8", "s15", "s22"],
//       priority: "High",
//       status: "Active",
//       productsCount: 32,
//       createdAt: "2023-01-17",
//       updatedAt: "2023-01-17",
//     },
//     {
//       id: "4",
//       name: "Kids Friendly",
//       description: "Stores with kids play area",
//       stores: ["s3", "s7", "s11"],
//       priority: "Medium",
//       status: "Active",
//       productsCount: 15,
//       createdAt: "2023-01-18",
//       updatedAt: "2023-01-18",
//     },
//     {
//       id: "5",
//       name: "Drive Thru",
//       description: "Stores with drive thru service",
//       stores: ["s5", "s10", "s15"],
//       priority: "Low",
//       status: "Active",
//       productsCount: 8,
//       createdAt: "2023-01-19",
//       updatedAt: "2023-01-19",
//     },
//     {
//       id: "6",
//       name: "Pet Friendly",
//       description: "Stores that allow pets",
//       stores: ["s6", "s12"],
//       priority: "Low",
//       status: "Inactive",
//       productsCount: 5,
//       createdAt: "2023-01-20",
//       updatedAt: "2023-01-20",
//     },
//     {
//       id: "7",
//       name: "Self Checkout",
//       description: "Stores with self checkout options",
//       stores: ["s7", "s14", "s21", "s28"],
//       priority: "Medium",
//       status: "Active",
//       productsCount: 12,
//       createdAt: "2023-01-21",
//       updatedAt: "2023-01-21",
//     },
//     {
//       id: "8",
//       name: "Delivery Available",
//       description: "Stores offering home delivery",
//       stores: ["s8", "s16", "s24", "s32"],
//       priority: "High",
//       status: "Active",
//       productsCount: 28,
//       createdAt: "2023-01-22",
//       updatedAt: "2023-01-22",
//     },
//   ],
//   stores: mockStores,
//   storeCategories: mockStoreCategories,
//   status: "idle",
//   error: null,
// };

// // Async thunk for fetching store tags (simulate API call)
// export const fetchStoreTags = createAsyncThunk(
//   "storeTags/fetchStoreTags",
//   async () => {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     return initialState.storeTags;
//   }
// );

// // Async thunk for fetching stores (simulate API call)
// export const fetchStores = createAsyncThunk(
//   "storeTags/fetchStores",
//   async () => {
//     await new Promise((resolve) => setTimeout(resolve, 300));
//     return initialState.stores;
//   }
// );

// // Async thunk for fetching store categories (simulate API call)
// export const fetchStoreCategories = createAsyncThunk(
//   "storeTags/fetchStoreCategories",
//   async () => {
//     await new Promise((resolve) => setTimeout(resolve, 200));
//     return initialState.storeCategories;
//   }
// );

// const storeTagsSlice = createSlice({
//   name: "storeTags",
//   initialState,
//   reducers: {
//     addStoreTag: (state, action: PayloadAction<StoreTag>) => {
//       const newTag = {
//         ...action.payload,
//         id: Date.now().toString(),
//         createdAt: new Date().toISOString().split("T")[0],
//         updatedAt: new Date().toISOString().split("T")[0],
//       };

//       // Add store details if stores exist
//       const storeDetails = state.stores.filter((s) =>
//         newTag.stores.includes(s.id)
//       );
//       if (storeDetails.length > 0) {
//         newTag.storeDetails = storeDetails;
//       }

//       state.storeTags.push(newTag);
//     },
//     editStoreTag: (state, action: PayloadAction<StoreTag>) => {
//       const index = state.storeTags.findIndex(
//         (t) => t.id === action.payload.id
//       );
//       if (index !== -1) {
//         const updatedTag = {
//           ...action.payload,
//           updatedAt: new Date().toISOString().split("T")[0],
//         };

//         // Update store details if stores exist
//         const storeDetails = state.stores.filter((s) =>
//           updatedTag.stores.includes(s.id)
//         );
//         if (storeDetails.length > 0) {
//           updatedTag.storeDetails = storeDetails;
//         }

//         state.storeTags[index] = updatedTag;
//       }
//     },
//     deleteStoreTag: (state, action: PayloadAction<string>) => {
//       state.storeTags = state.storeTags.filter((t) => t.id !== action.payload);
//     },
//     toggleTagStatus: (state, action: PayloadAction<string>) => {
//       const tag = state.storeTags.find((t) => t.id === action.payload);
//       if (tag) {
//         tag.status = tag.status === "Active" ? "Inactive" : "Active";
//         tag.updatedAt = new Date().toISOString().split("T")[0];
//       }
//     },
//     bulkUpdateStatus: (
//       state,
//       action: PayloadAction<{ tagIds: string[]; status: "Active" | "Inactive" }>
//     ) => {
//       const { tagIds, status } = action.payload;
//       state.storeTags.forEach((tag) => {
//         if (tagIds.includes(tag.id)) {
//           tag.status = status;
//           tag.updatedAt = new Date().toISOString().split("T")[0];
//         }
//       });
//     },
//     addStoreToTag: (
//       state,
//       action: PayloadAction<{ tagId: string; storeId: string }>
//     ) => {
//       const { tagId, storeId } = action.payload;
//       const tag = state.storeTags.find((t) => t.id === tagId);
//       if (tag && !tag.stores.includes(storeId)) {
//         tag.stores.push(storeId);
//         tag.updatedAt = new Date().toISOString().split("T")[0];

//         // Update store details
//         const store = state.stores.find((s) => s.id === storeId);
//         if (store && !tag.storeDetails?.find((s) => s.id === storeId)) {
//           if (!tag.storeDetails) tag.storeDetails = [];
//           tag.storeDetails.push(store);
//         }
//       }
//     },
//     removeStoreFromTag: (
//       state,
//       action: PayloadAction<{ tagId: string; storeId: string }>
//     ) => {
//       const { tagId, storeId } = action.payload;
//       const tag = state.storeTags.find((t) => t.id === tagId);
//       if (tag) {
//         tag.stores = tag.stores.filter((id) => id !== storeId);
//         tag.updatedAt = new Date().toISOString().split("T")[0];

//         // Update store details
//         if (tag.storeDetails) {
//           tag.storeDetails = tag.storeDetails.filter((s) => s.id !== storeId);
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStoreTags.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchStoreTags.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.storeTags = action.payload;
//       })
//       .addCase(fetchStoreTags.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Failed to fetch store tags";
//       })
//       .addCase(fetchStores.fulfilled, (state, action) => {
//         state.stores = action.payload;
//       })
//       .addCase(fetchStoreCategories.fulfilled, (state, action) => {
//         state.storeCategories = action.payload;
//       });
//   },
// });

// export const {
//   addStoreTag,
//   editStoreTag,
//   deleteStoreTag,
//   toggleTagStatus,
//   bulkUpdateStatus,
//   addStoreToTag,
//   removeStoreFromTag,
// } = storeTagsSlice.actions;
// export default storeTagsSlice.reducer;

// src/modules/shop/storeTags/storeTagsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  manager: string;
  status: "Active" | "Inactive";
}

export interface StoreTag {
  id: string;
  name: string;
  description: string;
  storeIds: string[]; // Changed from single store to array of store IDs
  priority: "High" | "Medium" | "Low";
  status: "Active" | "Inactive";
}

interface StoreTagsState {
  stores: Store[];
  storeTags: StoreTag[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate 1000 mock stores
const generateStores = (): Store[] => {
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
    "Austin",
    "Jacksonville",
    "Fort Worth",
    "Columbus",
    "Charlotte",
    "San Francisco",
    "Indianapolis",
    "Seattle",
    "Denver",
    "Washington",
    "Boston",
    "El Paso",
    "Nashville",
    "Detroit",
    "Oklahoma City",
    "Portland",
    "Las Vegas",
    "Memphis",
    "Louisville",
    "Baltimore",
    "Milwaukee",
    "Albuquerque",
    "Tucson",
    "Fresno",
    "Sacramento",
    "Kansas City",
    "Mesa",
    "Atlanta",
    "Omaha",
    "Colorado Springs",
    "Raleigh",
    "Long Beach",
    "Virginia Beach",
    "Miami",
    "Oakland",
    "Minneapolis",
    "Tampa",
    "Tulsa",
    "Arlington",
    "Wichita",
    "New Orleans",
    "Bakersfield",
  ];

  const states = [
    "NY",
    "CA",
    "IL",
    "TX",
    "AZ",
    "PA",
    "FL",
    "NC",
    "IN",
    "WA",
    "CO",
    "MD",
    "MA",
    "TN",
    "MI",
    "OK",
    "OR",
    "NV",
    "NM",
    "KY",
    "WI",
    "VA",
    "MN",
    "MO",
  ];

  const storeNames = [
    "Downtown",
    "Uptown",
    "Midtown",
    "Central",
    "Westside",
    "Eastside",
    "Northside",
    "Southside",
    "Marketplace",
    "Plaza",
    "Center",
    "Mall",
    "Square",
    "Galleria",
    "Pavilion",
    "Commons",
    "Village",
    "Corner",
    "Station",
    "Terminal",
    "Hub",
    "Point",
    "Crossing",
    "Gateway",
    "Junction",
    "Square",
    "Center",
    "Plaza",
    "Market",
    "Place",
  ];

  const streetTypes = ["St", "Ave", "Blvd", "Dr", "Ln", "Rd", "Ct", "Pl"];

  const stores: Store[] = [];

  for (let i = 1; i <= 1000; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const streetNumber = Math.floor(Math.random() * 9999) + 1;
    const streetName = `Main${i}`;
    const streetType =
      streetTypes[Math.floor(Math.random() * streetTypes.length)];
    const zipCode = `${Math.floor(Math.random() * 90000) + 10000}`;
    const storeName = storeNames[Math.floor(Math.random() * storeNames.length)];
    const managerName = `Manager ${i}`;

    stores.push({
      id: `store-${i}`,
      name: `${storeName} Store #${i}`,
      address: `${streetNumber} ${streetName} ${streetType}`,
      city,
      state,
      zipCode,
      phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${
        Math.floor(Math.random() * 9000) + 1000
      }`,
      email: `store${i}@example.com`,
      manager: managerName,
      status: Math.random() > 0.1 ? "Active" : "Inactive",
    });
  }

  return stores;
};

const initialState: StoreTagsState = {
  stores: generateStores(),
  storeTags: [
    {
      id: "1",
      name: "Fast Service",
      description: "Stores known for quick service",
      storeIds: [
        "store-1",
        "store-15",
        "store-32",
        "store-45",
        "store-67",
        "store-89",
      ],
      priority: "High",
      status: "Active",
    },
    {
      id: "2",
      name: "24/7 Open",
      description: "Stores open 24 hours",
      storeIds: [
        "store-2",
        "store-12",
        "store-23",
        "store-34",
        "store-56",
        "store-78",
        "store-90",
      ],
      priority: "Medium",
      status: "Active",
    },
    {
      id: "3",
      name: "Premium Collection",
      description: "Stores with premium products",
      storeIds: [
        "store-3",
        "store-13",
        "store-24",
        "store-35",
        "store-46",
        "store-57",
      ],
      priority: "High",
      status: "Active",
    },
    {
      id: "4",
      name: "Kids Friendly",
      description: "Stores with kids play area",
      storeIds: [
        "store-4",
        "store-14",
        "store-25",
        "store-36",
        "store-47",
        "store-58",
      ],
      priority: "Medium",
      status: "Active",
    },
    {
      id: "5",
      name: "Drive Thru",
      description: "Stores with drive thru service",
      storeIds: [
        "store-5",
        "store-16",
        "store-27",
        "store-38",
        "store-49",
        "store-60",
      ],
      priority: "Low",
      status: "Active",
    },
    {
      id: "6",
      name: "Pet Friendly",
      description: "Stores that allow pets",
      storeIds: [
        "store-6",
        "store-17",
        "store-28",
        "store-39",
        "store-50",
        "store-61",
      ],
      priority: "Low",
      status: "Inactive",
    },
    {
      id: "7",
      name: "Self Checkout",
      description: "Stores with self checkout options",
      storeIds: [
        "store-7",
        "store-18",
        "store-29",
        "store-40",
        "store-51",
        "store-62",
      ],
      priority: "Medium",
      status: "Active",
    },
    {
      id: "8",
      name: "Delivery Available",
      description: "Stores offering home delivery",
      storeIds: [
        "store-8",
        "store-19",
        "store-30",
        "store-41",
        "store-52",
        "store-63",
      ],
      priority: "High",
      status: "Active",
    },
  ],
  status: "idle",
  error: null,
};

// Async thunk for fetching stores (simulate API call)
export const fetchStores = createAsyncThunk(
  "storeTags/fetchStores",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.stores;
  }
);

// Async thunk for fetching store tags (simulate API call)
export const fetchStoreTags = createAsyncThunk(
  "storeTags/fetchStoreTags",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.storeTags;
  }
);

const storeTagsSlice = createSlice({
  name: "storeTags",
  initialState,
  reducers: {
    addStoreTag: (state, action: PayloadAction<StoreTag>) => {
      state.storeTags.push({ ...action.payload, id: Date.now().toString() });
    },
    editStoreTag: (state, action: PayloadAction<StoreTag>) => {
      const index = state.storeTags.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) state.storeTags[index] = action.payload;
    },
    deleteStoreTag: (state, action: PayloadAction<string>) => {
      state.storeTags = state.storeTags.filter((t) => t.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch stores";
      })
      .addCase(fetchStoreTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoreTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.storeTags = action.payload;
      })
      .addCase(fetchStoreTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch store tags";
      });
  },
});

export const { addStoreTag, editStoreTag, deleteStoreTag } =
  storeTagsSlice.actions;
export default storeTagsSlice.reducer;
