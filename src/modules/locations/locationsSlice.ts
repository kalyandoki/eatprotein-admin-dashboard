// src/modules/locations/locationsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Location {
  id: string;
  sno: number;
  city: string;
  areaName: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

interface LocationsState {
  locations: Location[];
  cities: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock locations
const generateLocations = (): Location[] => {
  const locationData = [
    { city: "A. S. Rao Nagar", areaName: "A. S. Rao Nagar" },
    { city: "A.S. Rao, Nagar", areaName: "A.S. Rao, Nagar" },
    { city: "Bapuji Nagar", areaName: "Bapuji Nagar" },
    { city: "Christian Peta", areaName: "Christian Peta" },
    { city: "Dammaiguda", areaName: "Dammaiguda" },
    { city: "Hyderabad", areaName: "Ramanthapur" },
    { city: "Janathapet", areaName: "Janathapet" },
    { city: "Kacherimitta", areaName: "Kacherimitta" },
    { city: "Kapra", areaName: "Kapra" },
    { city: "Kavali", areaName: "Kavali" },
    { city: "Kavali Bit - II Rural", areaName: "Kavali Bit - II Rural" },
    { city: "Kundanpally", areaName: "Kundanpally" },
    { city: "Kushaiguda", areaName: "Kushaiguda" },
  ];

  return locationData.map((loc, index) => ({
    id: `location-${index + 1}`,
    sno: index + 1,
    city: loc.city,
    areaName: loc.areaName,
    status: Math.random() > 0.2 ? "Active" : "Inactive",
    createdAt: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
    updatedAt: new Date().toISOString(),
  }));
};

const initialState: LocationsState = {
  locations: generateLocations(),
  cities: [
    "A. S. Rao Nagar",
    "A.S. Rao, Nagar",
    "Bapuji Nagar",
    "Christian Peta",
    "Dammaiguda",
    "Hyderabad",
    "Janathapet",
    "Kacherimitta",
    "Kapra",
    "Kavali",
    "Kavali Bit - II Rural",
    "Kundanpally",
    "Kushaiguda",
  ],
  status: "idle",
  error: null,
};

// Async thunk for fetching locations
export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.locations;
  }
);

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    addLocation: (
      state,
      action: PayloadAction<
        Omit<Location, "id" | "sno" | "createdAt" | "updatedAt">
      >
    ) => {
      const newLocation: Location = {
        ...action.payload,
        id: `location-${Date.now()}`,
        sno: state.locations.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.locations.push(newLocation);
    },
    editLocation: (state, action: PayloadAction<Location>) => {
      const index = state.locations.findIndex(
        (loc) => loc.id === action.payload.id
      );
      if (index !== -1) {
        state.locations[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteLocation: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(
        (loc) => loc.id !== action.payload
      );
      // Update serial numbers
      state.locations.forEach((loc, index) => {
        loc.sno = index + 1;
      });
    },
    toggleLocationStatus: (state, action: PayloadAction<string>) => {
      const index = state.locations.findIndex(
        (loc) => loc.id === action.payload
      );
      if (index !== -1) {
        state.locations[index].status =
          state.locations[index].status === "Active" ? "Inactive" : "Active";
        state.locations[index].updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch locations";
      });
  },
});

export const {
  addLocation,
  editLocation,
  deleteLocation,
  toggleLocationStatus,
} = locationsSlice.actions;
export default locationsSlice.reducer;
