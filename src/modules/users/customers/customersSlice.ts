// src/modules/users/customers/customersSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Customer {
  id: string;
  sno: number;
  name: string;
  area: string;
  city: string;
  phone: string;
  type: "Direct" | "Referral";
  device: "WEB" | "ANDROID" | "IOS";
  status: "Active" | "Inactive";
  created: string; // ISO string
  createdAt: string;
  updatedAt: string;
}

interface CustomersState {
  customers: Customer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock customers
const generateCustomers = (): Customer[] => {
  const customerNames = [
    "khusi",
    "saurabh pal",
    "Madelyn Kiernan",
    "anusha",
    "Uppala Edukondalu",
    "Vilma Aitola",
    "Mupparapu Mechaiel Paul",
    "Rahul Sharma",
    "Priya Patel",
    "Amit Kumar",
    "Sneha Reddy",
    "Vikram Singh",
    "Anjali Gupta",
    "Rohit Verma",
  ];
  const areas = [
    "Madhapur",
    "Hitech City",
    "Kukatpally",
    "Uppal",
    "Gachibowli",
    "Jubilee Hills",
  ];
  const cities = [
    "Hyderabad",
    "Bangalore",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Pune",
  ];
  const types: ("Direct" | "Referral")[] = ["Direct", "Referral"];
  const devices: ("WEB" | "ANDROID" | "IOS")[] = ["WEB", "ANDROID", "IOS"];
  const statuses: ("Active" | "Inactive")[] = ["Active", "Inactive"];

  const customers: Customer[] = [];
  for (let i = 1; i <= 20; i++) {
    const createdDate = new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    );
    customers.push({
      id: `customer-${i}`,
      sno: i,
      name: customerNames[Math.floor(Math.random() * customerNames.length)],
      area: areas[Math.floor(Math.random() * areas.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      phone: `9${Math.floor(Math.random() * 9000000000) + 100000000}`,
      type: types[Math.floor(Math.random() * types.length)],
      device: devices[Math.floor(Math.random() * devices.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      created: createdDate.toISOString().replace("T", " ").substring(0, 19),
      createdAt: createdDate.toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  return customers;
};

const initialState: CustomersState = {
  customers: generateCustomers(),
  status: "idle",
  error: null,
};

// Async thunk for fetching customers
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return generateCustomers();
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (
      state,
      action: PayloadAction<
        Omit<Customer, "id" | "sno" | "createdAt" | "updatedAt">
      >
    ) => {
      const newCustomer: Customer = {
        ...action.payload,
        id: Date.now().toString(),
        sno: state.customers.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.customers.unshift(newCustomer); // Add to the beginning
    },
    editCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.customers[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter((c) => c.id !== action.payload);
      // Renumber sno
      state.customers.forEach((customer, index) => {
        customer.sno = index + 1;
      });
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const index = state.customers.findIndex((s) => s.id === action.payload);
      if (index !== -1) {
        state.customers[index].status =
          state.customers[index].status === "Active" ? "Inactive" : "Active";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch customers";
      });
  },
});

export const { addCustomer, editCustomer, deleteCustomer, toggleStatus } =
  customersSlice.actions;
export default customersSlice.reducer;
