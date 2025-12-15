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
//   status: "Active" | "Inactive";
// }

// export interface StoreTag {
//   id: string;
//   name: string;
//   description: string;
//   storeIds: string[]; // Changed from single store to array of store IDs
//   priority: "High" | "Medium" | "Low";
//   status: "Active" | "Inactive";
// }

// interface StoreTagsState {
//   stores: Store[];
//   storeTags: StoreTag[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// // Function to generate 1000 mock stores
// const generateStores = (): Store[] => {
//   const cities = [
//     "New York",
//     "Los Angeles",
//     "Chicago",
//     "Houston",
//     "Phoenix",
//     "Philadelphia",
//     "San Antonio",
//     "San Diego",
//     "Dallas",
//     "San Jose",
//     "Austin",
//     "Jacksonville",
//     "Fort Worth",
//     "Columbus",
//     "Charlotte",
//     "San Francisco",
//     "Indianapolis",
//     "Seattle",
//     "Denver",
//     "Washington",
//     "Boston",
//     "El Paso",
//     "Nashville",
//     "Detroit",
//     "Oklahoma City",
//     "Portland",
//     "Las Vegas",
//     "Memphis",
//     "Louisville",
//     "Baltimore",
//     "Milwaukee",
//     "Albuquerque",
//     "Tucson",
//     "Fresno",
//     "Sacramento",
//     "Kansas City",
//     "Mesa",
//     "Atlanta",
//     "Omaha",
//     "Colorado Springs",
//     "Raleigh",
//     "Long Beach",
//     "Virginia Beach",
//     "Miami",
//     "Oakland",
//     "Minneapolis",
//     "Tampa",
//     "Tulsa",
//     "Arlington",
//     "Wichita",
//     "New Orleans",
//     "Bakersfield",
//   ];

//   const states = [
//     "NY",
//     "CA",
//     "IL",
//     "TX",
//     "AZ",
//     "PA",
//     "FL",
//     "NC",
//     "IN",
//     "WA",
//     "CO",
//     "MD",
//     "MA",
//     "TN",
//     "MI",
//     "OK",
//     "OR",
//     "NV",
//     "NM",
//     "KY",
//     "WI",
//     "VA",
//     "MN",
//     "MO",
//   ];

//   const storeNames = [
//     "Downtown",
//     "Uptown",
//     "Midtown",
//     "Central",
//     "Westside",
//     "Eastside",
//     "Northside",
//     "Southside",
//     "Marketplace",
//     "Plaza",
//     "Center",
//     "Mall",
//     "Square",
//     "Galleria",
//     "Pavilion",
//     "Commons",
//     "Village",
//     "Corner",
//     "Station",
//     "Terminal",
//     "Hub",
//     "Point",
//     "Crossing",
//     "Gateway",
//     "Junction",
//     "Square",
//     "Center",
//     "Plaza",
//     "Market",
//     "Place",
//   ];

//   const streetTypes = ["St", "Ave", "Blvd", "Dr", "Ln", "Rd", "Ct", "Pl"];

//   const stores: Store[] = [];

//   for (let i = 1; i <= 1000; i++) {
//     const city = cities[Math.floor(Math.random() * cities.length)];
//     const state = states[Math.floor(Math.random() * states.length)];
//     const streetNumber = Math.floor(Math.random() * 9999) + 1;
//     const streetName = `Main${i}`;
//     const streetType =
//       streetTypes[Math.floor(Math.random() * streetTypes.length)];
//     const zipCode = `${Math.floor(Math.random() * 90000) + 10000}`;
//     const storeName = storeNames[Math.floor(Math.random() * storeNames.length)];
//     const managerName = `Manager ${i}`;

//     stores.push({
//       id: `store-${i}`,
//       name: `${storeName} Store #${i}`,
//       address: `${streetNumber} ${streetName} ${streetType}`,
//       city,
//       state,
//       zipCode,
//       phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${
//         Math.floor(Math.random() * 9000) + 1000
//       }`,
//       email: `store${i}@example.com`,
//       manager: managerName,
//       status: Math.random() > 0.1 ? "Active" : "Inactive",
//     });
//   }

//   return stores;
// };

// const initialState: StoreTagsState = {
//   stores: generateStores(),
//   storeTags: [
//     {
//       id: "1",
//       name: "Fast Service",
//       description: "Stores known for quick service",
//       storeIds: [
//         "store-1",
//         "store-15",
//         "store-32",
//         "store-45",
//         "store-67",
//         "store-89",
//       ],
//       priority: "High",
//       status: "Active",
//     },
//     {
//       id: "2",
//       name: "24/7 Open",
//       description: "Stores open 24 hours",
//       storeIds: [
//         "store-2",
//         "store-12",
//         "store-23",
//         "store-34",
//         "store-56",
//         "store-78",
//         "store-90",
//       ],
//       priority: "Medium",
//       status: "Active",
//     },
//     {
//       id: "3",
//       name: "Premium Collection",
//       description: "Stores with premium products",
//       storeIds: [
//         "store-3",
//         "store-13",
//         "store-24",
//         "store-35",
//         "store-46",
//         "store-57",
//       ],
//       priority: "High",
//       status: "Active",
//     },
//     {
//       id: "4",
//       name: "Kids Friendly",
//       description: "Stores with kids play area",
//       storeIds: [
//         "store-4",
//         "store-14",
//         "store-25",
//         "store-36",
//         "store-47",
//         "store-58",
//       ],
//       priority: "Medium",
//       status: "Active",
//     },
//     {
//       id: "5",
//       name: "Drive Thru",
//       description: "Stores with drive thru service",
//       storeIds: [
//         "store-5",
//         "store-16",
//         "store-27",
//         "store-38",
//         "store-49",
//         "store-60",
//       ],
//       priority: "Low",
//       status: "Active",
//     },
//     {
//       id: "6",
//       name: "Pet Friendly",
//       description: "Stores that allow pets",
//       storeIds: [
//         "store-6",
//         "store-17",
//         "store-28",
//         "store-39",
//         "store-50",
//         "store-61",
//       ],
//       priority: "Low",
//       status: "Inactive",
//     },
//     {
//       id: "7",
//       name: "Self Checkout",
//       description: "Stores with self checkout options",
//       storeIds: [
//         "store-7",
//         "store-18",
//         "store-29",
//         "store-40",
//         "store-51",
//         "store-62",
//       ],
//       priority: "Medium",
//       status: "Active",
//     },
//     {
//       id: "8",
//       name: "Delivery Available",
//       description: "Stores offering home delivery",
//       storeIds: [
//         "store-8",
//         "store-19",
//         "store-30",
//         "store-41",
//         "store-52",
//         "store-63",
//       ],
//       priority: "High",
//       status: "Active",
//     },
//   ],
//   status: "idle",
//   error: null,
// };

// // Async thunk for fetching stores (simulate API call)
// export const fetchStores = createAsyncThunk(
//   "storeTags/fetchStores",
//   async () => {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     return initialState.stores;
//   }
// );

// // Async thunk for fetching store tags (simulate API call)
// export const fetchStoreTags = createAsyncThunk(
//   "storeTags/fetchStoreTags",
//   async () => {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     return initialState.storeTags;
//   }
// );

// const storeTagsSlice = createSlice({
//   name: "storeTags",
//   initialState,
//   reducers: {
//     addStoreTag: (state, action: PayloadAction<StoreTag>) => {
//       state.storeTags.push({ ...action.payload, id: Date.now().toString() });
//     },
//     editStoreTag: (state, action: PayloadAction<StoreTag>) => {
//       const index = state.storeTags.findIndex(
//         (t) => t.id === action.payload.id
//       );
//       if (index !== -1) state.storeTags[index] = action.payload;
//     },
//     deleteStoreTag: (state, action: PayloadAction<string>) => {
//       state.storeTags = state.storeTags.filter((t) => t.id !== action.payload);
//     },
//     toggleStoreTagStatus: (state, action: PayloadAction<string>) => {
//       const index = state.storeTags.findIndex((t) => t.id === action.payload);
//       if (index !== -1) {
//         state.storeTags[index].status =
//           state.storeTags[index].status === "Active" ? "Inactive" : "Active";
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStores.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchStores.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.stores = action.payload;
//       })
//       .addCase(fetchStores.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Failed to fetch stores";
//       })
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
//       });
//   },
// });

// export const {
//   addStoreTag,
//   editStoreTag,
//   deleteStoreTag,
//   toggleStoreTagStatus,
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
  // New fields
  category: string;
  categoryName: string;
  subcategory: string;
  subcategoryName: string;
  region: string;
  regionName: string;
}

export interface StoreTag {
  id: string;
  name: string;
  description: string;
  storeIds: string[];
  priority: "High" | "Medium" | "Low";
  status: "Active" | "Inactive";
}

interface StoreTagsState {
  stores: Store[];
  storeTags: StoreTag[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define store categories and subcategories
const storeCategories = [
  {
    id: "flagship",
    name: "Flagship",
    subcategories: [
      { id: "downtown", name: "Downtown" },
      { id: "mall", name: "Shopping Mall" },
      { id: "airport", name: "Airport" },
    ],
  },
  {
    id: "community",
    name: "Community",
    subcategories: [
      { id: "suburban", name: "Suburban" },
      { id: "urban", name: "Urban" },
      { id: "rural", name: "Rural" },
    ],
  },
  {
    id: "express",
    name: "Express",
    subcategories: [
      { id: "kiosk", name: "Kiosk" },
      { id: "small-format", name: "Small Format" },
      { id: "pickup-point", name: "Pickup Point" },
    ],
  },
  {
    id: "outlet",
    name: "Outlet",
    subcategories: [
      { id: "factory-outlet", name: "Factory Outlet" },
      { id: "clearance-center", name: "Clearance Center" },
      { id: "discount-store", name: "Discount Store" },
    ],
  },
];

// Define regions
const regions = [
  { id: "northeast", name: "Northeast" },
  { id: "southeast", name: "Southeast" },
  { id: "midwest", name: "Midwest" },
  { id: "southwest", name: "Southwest" },
  { id: "west", name: "West" },
];

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

    // Select category and subcategory
    const category =
      storeCategories[Math.floor(Math.random() * storeCategories.length)];
    const subcategory =
      category.subcategories[
        Math.floor(Math.random() * category.subcategories.length)
      ];

    // Select region based on state
    let regionId = "northeast"; // default
    if (["CA", "OR", "WA", "NV", "AZ"].includes(state)) regionId = "west";
    else if (["TX", "OK", "NM", "CO", "UT"].includes(state))
      regionId = "southwest";
    else if (["FL", "GA", "AL", "MS", "LA", "SC", "NC", "TN"].includes(state))
      regionId = "southeast";
    else if (
      [
        "OH",
        "MI",
        "IN",
        "IL",
        "WI",
        "MN",
        "IA",
        "MO",
        "KS",
        "NE",
        "SD",
        "ND",
      ].includes(state)
    )
      regionId = "midwest";

    const region = regions.find((r) => r.id === regionId);

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
      category: category.id,
      categoryName: category.name,
      subcategory: subcategory.id,
      subcategoryName: subcategory.name,
      region: region.id,
      regionName: region.name,
    });
  }

  return stores;
};

// Export the categories and regions for use in components
export { storeCategories, regions };

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
    toggleStoreTagStatus: (state, action: PayloadAction<string>) => {
      const index = state.storeTags.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        state.storeTags[index].status =
          state.storeTags[index].status === "Active" ? "Inactive" : "Active";
      }
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

export const {
  addStoreTag,
  editStoreTag,
  deleteStoreTag,
  toggleStoreTagStatus,
} = storeTagsSlice.actions;
export default storeTagsSlice.reducer;
