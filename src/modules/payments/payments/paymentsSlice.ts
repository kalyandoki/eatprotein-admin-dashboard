// // src/modules/payments/paymentsSlice.ts
// import { createSlice } from "@reduxjs/toolkit";

// export interface PaymentRow {
//   id: number;
//   date: string;
//   storeName: string;
//   totalOrders: number;
//   totalAmount: number;
//   storeAmount: number;
//   dBoyAmount: number;
//   foAmount: number;
//   appAmount: number;
// }

// interface PaymentState {
//   list: PaymentRow[];
// }

// const initialState: PaymentState = {
//   list: [
//     {
//       id: 0,
//       date: "19 September 2025",
//       storeName: "Madhina Chicken & Mutton Center",
//       totalOrders: 1,
//       totalAmount: 157,
//       storeAmount: 104.92343758325,
//       dBoyAmount: 25,
//       foAmount: 8.1229687250255,
//       appAmount: 26,
//     },
//     {
//       id: 1,
//       date: "16 September 2025",
//       storeName: "Rajahamundry Homemade Foods",
//       totalOrders: 1,
//       totalAmount: 153,
//       storeAmount: 99.758,
//       dBoyAmount: 25,
//       foAmount: 8.4726,
//       appAmount: 28,
//     },
//     {
//       id: 2,
//       date: "26 August 2025",
//       storeName: "Branded Store",
//       totalOrders: 2,
//       totalAmount: 512,
//       storeAmount: 399.032,
//       dBoyAmount: 100,
//       foAmount: 33.8904,
//       appAmount: 112,
//     },
//     {
//       id: 3,
//       date: "25 August 2025",
//       storeName: "Yashu Mart",
//       totalOrders: 1,
//       totalAmount: 86,
//       storeAmount: 60,
//       dBoyAmount: 10,
//       foAmount: 4.8,
//       appAmount: 17,
//     },
//     {
//       id: 4,
//       date: "09 July 2025",
//       storeName: "Branded Store",
//       totalOrders: 3,
//       totalAmount: 849,
//       storeAmount: 684.3,
//       dBoyAmount: 150,
//       foAmount: 49.41,
//       appAmount: 164,
//     },
//   ],
// };

// const paymentsSlice = createSlice({
//   name: "payments",
//   initialState,
//   reducers: {},
// });

// export default paymentsSlice.reducer;

// src/modules/payments/paymentsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface PaymentRow {
  id: number;
  date: string;
  storeName: string;
  totalOrders: number;
  totalAmount: number;
  storeAmount: number;
  dBoyAmount: number;
  foAmount: number;
  appAmount: number;
}

interface PaymentState {
  list: PaymentRow[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PaymentState = {
  list: [
    {
      id: 0,
      date: "19 September 2025",
      storeName: "Madhina Chicken & Mutton Center",
      totalOrders: 1,
      totalAmount: 157,
      storeAmount: 104.92343758325,
      dBoyAmount: 25,
      foAmount: 8.1229687250255,
      appAmount: 26,
    },
    {
      id: 1,
      date: "16 September 2025",
      storeName: "Rajahamundry Homemade Foods",
      totalOrders: 1,
      totalAmount: 153,
      storeAmount: 99.758,
      dBoyAmount: 25,
      foAmount: 8.4726,
      appAmount: 28,
    },
    {
      id: 2,
      date: "26 August 2025",
      storeName: "Branded Store",
      totalOrders: 2,
      totalAmount: 512,
      storeAmount: 399.032,
      dBoyAmount: 100,
      foAmount: 33.8904,
      appAmount: 112,
    },
    {
      id: 3,
      date: "25 August 2025",
      storeName: "Yashu Mart",
      totalOrders: 1,
      totalAmount: 86,
      storeAmount: 60,
      dBoyAmount: 10,
      foAmount: 4.8,
      appAmount: 17,
    },
    {
      id: 4,
      date: "09 July 2025",
      storeName: "Branded Store",
      totalOrders: 3,
      totalAmount: 849,
      storeAmount: 684.3,
      dBoyAmount: 150,
      foAmount: 49.41,
      appAmount: 164,
    },
    {
      id: 5,
      date: "15 July 2025",
      storeName: "Super Mart",
      totalOrders: 2,
      totalAmount: 324,
      storeAmount: 254.88,
      dBoyAmount: 50,
      foAmount: 16.2,
      appAmount: 62,
    },
    {
      id: 6,
      date: "28 June 2025",
      storeName: "Fresh Foods",
      totalOrders: 1,
      totalAmount: 178,
      storeAmount: 140.22,
      dBoyAmount: 25,
      foAmount: 8.9,
      appAmount: 34,
    },
    {
      id: 7,
      date: "14 June 2025",
      storeName: "Organic Store",
      totalOrders: 4,
      totalAmount: 652,
      storeAmount: 511.04,
      dBoyAmount: 100,
      foAmount: 32.6,
      appAmount: 124,
    },
    {
      id: 8,
      date: "30 May 2025",
      storeName: "Quick Shop",
      totalOrders: 1,
      totalAmount: 95,
      storeAmount: 74.1,
      dBoyAmount: 15,
      foAmount: 4.75,
      appAmount: 18,
    },
    {
      id: 9,
      date: "18 May 2025",
      storeName: "City Market",
      totalOrders: 3,
      totalAmount: 421,
      storeAmount: 330.39,
      dBoyAmount: 75,
      foAmount: 21.05,
      appAmount: 80,
    },
  ],
  status: "idle",
  error: null,
};

// Async thunk for fetching payments
export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.list;
  }
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch payments";
      });
  },
});

export default paymentsSlice.reducer;
