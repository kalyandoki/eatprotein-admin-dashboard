// src/modules/franchise/franchise-location/franchiseLocationSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface FranchiseLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
  manager: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Maintenance";
  openingDate: string;
  area: number; // in sq ft
  type: "Owned" | "Rented" | "Leased";
  employees: number;
  dailyAverageSales: number;
  monthlyAverageSales: number;
  createdAt: string;
  updatedAt: string;
}

interface FranchiseLocationState {
  locations: FranchiseLocation[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock franchise location data
const generateFranchiseLocations = (): FranchiseLocation[] => {
  const locationNames = [
    "Downtown Plaza",
    "City Center Mall",
    "Westside Shopping Complex",
    "Northpoint Retail Park",
    "Eastside Market Square",
    "Southtown Business Center",
    "Central Avenue Store",
    "Riverside Commercial Hub",
    "Hilltop Shopping District",
    "Lakeside Retail Center",
    "Sunset Boulevard Mall",
    "Oceanview Commercial Plaza",
    "Mountain View Business Park",
    "Forest Hills Shopping Center",
    "Prairie Town Market",
    "Golden Gate Retail",
    "Emerald City Mall",
    "Harbor View Complex",
    "Grand Central Station",
    "Metropolitan Square",
  ];

  const managers = [
    "John Smith",
    "Emily Johnson",
    "Michael Brown",
    "Sarah Davis",
    "David Wilson",
    "Lisa Anderson",
    "Robert Taylor",
    "Jennifer Thomas",
    "William Jackson",
    "Patricia White",
    "Richard Harris",
    "Linda Martin",
    "James Thompson",
    "Mary Garcia",
    "Charles Martinez",
  ];

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
  ];

  const states = [
    "NY",
    "CA",
    "IL",
    "TX",
    "AZ",
    "PA",
    "TX",
    "CA",
    "TX",
    "CA",
    "TX",
    "FL",
    "TX",
    "OH",
    "NC",
  ];

  const locations: FranchiseLocation[] = [];

  // Generate 20 locations
  for (let i = 1; i <= 20; i++) {
    const name = locationNames[i - 1];
    const manager = managers[Math.floor(Math.random() * managers.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const status =
      Math.random() > 0.2
        ? "Active"
        : Math.random() > 0.5
        ? "Inactive"
        : "Maintenance";
    const type =
      Math.random() > 0.6 ? "Owned" : Math.random() > 0.3 ? "Rented" : "Leased";

    // Generate a random date within the last 5 years
    const yearsAgo = Math.floor(Math.random() * 5);
    const monthsAgo = Math.floor(Math.random() * 12);
    const openingDate = new Date(
      Date.now() - (yearsAgo * 365 + monthsAgo * 30) * 24 * 60 * 60 * 1000
    );

    // Generate random coordinates within the US
    const latitude = 25 + Math.random() * 25; // 25 to 50 (roughly US latitude range)
    const longitude = -125 + Math.random() * 55; // -125 to -70 (roughly US longitude range)

    locations.push({
      id: `location-${i}`,
      name,
      address: `${100 + i} Main Street`,
      city,
      state,
      zipCode: `${10000 + i}`,
      country: "USA",
      latitude: parseFloat(latitude.toFixed(6)),
      longitude: parseFloat(longitude.toFixed(6)),
      manager,
      email: `${manager.toLowerCase().replace(/\s+/g, ".")}@${name
        .toLowerCase()
        .replace(/\s+/g, "")}.com`,
      phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      status,
      openingDate: openingDate.toISOString().split("T")[0],
      area: Math.floor(Math.random() * 10000) + 2000, // 2000 to 12000 sq ft
      type,
      employees: Math.floor(Math.random() * 50) + 10, // 10 to 60 employees
      dailyAverageSales: Math.floor(Math.random() * 10000) + 2000, // $2000 to $12000
      monthlyAverageSales: Math.floor(Math.random() * 300000) + 50000, // $50000 to $350000
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return locations;
};

const initialState: FranchiseLocationState = {
  locations: generateFranchiseLocations(),
  status: "idle",
  error: null,
};

// Async thunk for fetching franchise locations
export const fetchFranchiseLocations = createAsyncThunk(
  "franchiseLocations/fetchFranchiseLocations",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return generateFranchiseLocations();
  }
);

const franchiseLocationSlice = createSlice({
  name: "franchiseLocations",
  initialState,
  reducers: {
    addFranchiseLocation: (
      state,
      action: PayloadAction<
        Omit<FranchiseLocation, "id" | "createdAt" | "updatedAt">
      >
    ) => {
      const newLocation: FranchiseLocation = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.locations.unshift(newLocation);
    },
    editFranchiseLocation: (
      state,
      action: PayloadAction<FranchiseLocation>
    ) => {
      const index = state.locations.findIndex(
        (l) => l.id === action.payload.id
      );
      if (index !== -1) {
        state.locations[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteFranchiseLocation: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter((l) => l.id !== action.payload);
    },
    updateLocationStatus: (
      state,
      action: PayloadAction<{ id: string; status: FranchiseLocation["status"] }>
    ) => {
      const location = state.locations.find((l) => l.id === action.payload.id);
      if (location) {
        location.status = action.payload.status;
        location.updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFranchiseLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFranchiseLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.locations = action.payload;
      })
      .addCase(fetchFranchiseLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch franchise locations";
      });
  },
});

export const {
  addFranchiseLocation,
  editFranchiseLocation,
  deleteFranchiseLocation,
  updateLocationStatus,
} = franchiseLocationSlice.actions;

export default franchiseLocationSlice.reducer;
