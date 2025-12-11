// // src/modules/orders/orderSlice.ts
// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// export interface Order {
//   id: string;
//   orderId: string;
//   branch: string;
//   dateTime: string;
//   orderAmount: number;
//   customerName: string;
//   deliveryAddress: string;
//   coupon: string;
//   status: "Pending" | "Processing" | "Picked Up" | "Delivered" | "Cancelled";
//   paymentMode: string;
//   paymentStatus: "Paid" | "Pending" | "Failed";
//   storeRating?: number;
//   deliveryBoyRating?: number;
//   items: number;
// }

// interface OrdersState {
//   orders: Order[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: OrdersState = {
//   orders: [
//     {
//       id: "1",
//       orderId: "#EP0429",
//       branch: "Madhina Chicken & Mutton Center",
//       dateTime: "2025-11-30 10:08:04",
//       orderAmount: 223,
//       customerName: "radha",
//       deliveryAddress: "Kavali",
//       coupon: "",
//       status: "Picked Up",
//       paymentMode: "COD",
//       paymentStatus: "Paid",
//       storeRating: 0,
//       deliveryBoyRating: 0,
//       items: 5,
//     },
//     {
//       id: "2",
//       orderId: "#EP0428",
//       branch: "Madhina Chicken & Mutton Center",
//       dateTime: "2025-11-27 11:13:34",
//       orderAmount: 157,
//       customerName: "radha",
//       deliveryAddress: "Kavali",
//       coupon: "",
//       status: "Cancelled",
//       paymentMode: "COD",
//       paymentStatus: "Paid",
//       storeRating: 0,
//       deliveryBoyRating: 0,
//       items: 3,
//     },
//     {
//       id: "3",
//       orderId: "ORD001",
//       branch: "Downtown Store",
//       dateTime: "2024-01-15 14:30:00",
//       orderAmount: 85.5,
//       customerName: "John Doe",
//       deliveryAddress: "123 Main St, City",
//       coupon: "SAVE10",
//       status: "Delivered",
//       paymentMode: "Credit Card",
//       paymentStatus: "Paid",
//       storeRating: 4,
//       deliveryBoyRating: 5,
//       items: 3,
//     },
//     {
//       id: "4",
//       orderId: "ORD002",
//       branch: "Mall Branch",
//       dateTime: "2024-01-14 16:45:00",
//       orderAmount: 124.75,
//       customerName: "Jane Smith",
//       deliveryAddress: "456 Oak Ave, Town",
//       coupon: "",
//       status: "Processing",
//       paymentMode: "PayPal",
//       paymentStatus: "Paid",
//       storeRating: 0,
//       deliveryBoyRating: 0,
//       items: 5,
//     },
//     {
//       id: "5",
//       orderId: "ORD003",
//       branch: "Airport Terminal",
//       dateTime: "2024-01-14 09:20:00",
//       orderAmount: 67.25,
//       customerName: "Mike Johnson",
//       deliveryAddress: "789 Pine Rd, Village",
//       coupon: "WELCOME5",
//       status: "Pending",
//       paymentMode: "COD",
//       paymentStatus: "Pending",
//       storeRating: 0,
//       deliveryBoyRating: 0,
//       items: 2,
//     },
//   ],
//   status: "idle",
//   error: null,
// };

// // Async thunk for fetching orders (simulate API call)
// export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   return initialState.orders;
// });

// const ordersSlice = createSlice({
//   name: "orders",
//   initialState,
//   reducers: {
//     addOrder: (state, action: PayloadAction<Order>) => {
//       state.orders.unshift({ ...action.payload, id: Date.now().toString() });
//     },
//     editOrder: (state, action: PayloadAction<Order>) => {
//       const index = state.orders.findIndex((o) => o.id === action.payload.id);
//       if (index !== -1) state.orders[index] = action.payload;
//     },
//     deleteOrder: (state, action: PayloadAction<string>) => {
//       state.orders = state.orders.filter((o) => o.id !== action.payload);
//     },
//     updateOrderStatus: (
//       state,
//       action: PayloadAction<{ id: string; status: Order["status"] }>
//     ) => {
//       const order = state.orders.find((o) => o.id === action.payload.id);
//       if (order) {
//         order.status = action.payload.status;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchOrders.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchOrders.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.orders = action.payload;
//       })
//       .addCase(fetchOrders.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Failed to fetch orders";
//       });
//   },
// });

// export const { addOrder, editOrder, deleteOrder, updateOrderStatus } =
//   ordersSlice.actions;
// export default ordersSlice.reducer;

// src/modules/orders/orderSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Add OrderItem interface
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unit: string; // e.g., "kg", "pcs", "g"
  price: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  orderId: string;
  branch: string;
  dateTime: string;
  orderAmount: number;
  customerName: string;
  deliveryAddress: string;
  coupon: string;
  status: "Pending" | "Processing" | "Picked Up" | "Delivered" | "Cancelled";
  paymentMode: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
  storeRating?: number;
  deliveryBoyRating?: number;
  items: number;
  orderItems: OrderItem[]; // Add this new field
  customerPhone?: string; // Add customer phone
  deliveryBoyName?: string; // Add delivery boy name
  deliveryBoyPhone?: string; // Add delivery boy phone
}

interface OrdersState {
  orders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrdersState = {
  orders: [
    {
      id: "1",
      orderId: "#EP0429",
      branch: "Madhina Chicken & Mutton Center",
      dateTime: "2025-11-30 10:08:04",
      orderAmount: 223,
      customerName: "radha",
      customerPhone: "9030467469",
      deliveryAddress: "Kavali",
      coupon: "",
      status: "Delivered",
      paymentMode: "COD",
      paymentStatus: "Paid",
      storeRating: 4,
      deliveryBoyRating: 5,
      items: 2,
      deliveryBoyName: "Immanuel",
      deliveryBoyPhone: "7780695555",
      orderItems: [
        {
          id: "1",
          name: "Chicken Skinless Curry Cut (Medium) (చికెన్ స్కిన్‌లెస్ కర్రీ కట్ మీడియం)",
          quantity: 500,
          unit: "g",
          price: 198.48,
          imageUrl: "/images/chicken-curry-cut.jpg",
        },
        {
          id: "2",
          name: "Chicken Liver (చికెన్ లివర్)",
          quantity: 250,
          unit: "g",
          price: 24.52,
          imageUrl: "/images/chicken-liver.jpg",
        },
      ],
    },
    {
      id: "2",
      orderId: "#EP0428",
      branch: "Madhina Chicken & Mutton Center",
      dateTime: "2025-11-27 11:13:34",
      orderAmount: 157,
      customerName: "radha",
      customerPhone: "9030467469",
      deliveryAddress: "Kavali",
      coupon: "",
      status: "Cancelled",
      paymentMode: "COD",
      paymentStatus: "Paid",
      storeRating: 0,
      deliveryBoyRating: 0,
      items: 3,
      orderItems: [
        {
          id: "3",
          name: "Mutton Curry Cut",
          quantity: 1,
          unit: "kg",
          price: 157,
          imageUrl: "/images/mutton-curry.jpg",
        },
      ],
    },
    {
      id: "3",
      orderId: "ORD001",
      branch: "Downtown Store",
      dateTime: "2024-01-15 14:30:00",
      orderAmount: 85.5,
      customerName: "John Doe",
      customerPhone: "555-0101",
      deliveryAddress: "123 Main St, City",
      coupon: "SAVE10",
      status: "Delivered",
      paymentMode: "Credit Card",
      paymentStatus: "Paid",
      storeRating: 4,
      deliveryBoyRating: 5,
      items: 3,
      deliveryBoyName: "Alex Smith",
      deliveryBoyPhone: "555-0202",
      orderItems: [
        {
          id: "4",
          name: "Chicken Breast",
          quantity: 500,
          unit: "g",
          price: 45.5,
          imageUrl: "/images/chicken-breast.jpg",
        },
        {
          id: "5",
          name: "Eggs",
          quantity: 12,
          unit: "pcs",
          price: 40,
          imageUrl: "/images/eggs.jpg",
        },
      ],
    },
    {
      id: "4",
      orderId: "#ORD002",
      branch: "Mall Branch",
      dateTime: "2024-01-14 16:45:00",
      orderAmount: 124.75,
      customerName: "Jane Smith",
      customerPhone: "555-0102",
      deliveryAddress: "456 Oak Ave, Town",
      coupon: "",
      status: "Processing",
      paymentMode: "PayPal",
      paymentStatus: "Paid",
      storeRating: 0,
      deliveryBoyRating: 0,
      items: 5,
      orderItems: [
        {
          id: "6",
          name: "Whole Chicken",
          quantity: 1.2,
          unit: "kg",
          price: 124.75,
          imageUrl: "/images/whole-chicken.jpg",
        },
      ],
    },
    {
      id: "5",
      orderId: "ORD003",
      branch: "Airport Terminal",
      dateTime: "2024-01-14 09:20:00",
      orderAmount: 67.25,
      customerName: "Mike Johnson",
      customerPhone: "555-0103",
      deliveryAddress: "789 Pine Rd, Village",
      coupon: "WELCOME5",
      status: "Pending",
      paymentMode: "COD",
      paymentStatus: "Pending",
      storeRating: 0,
      deliveryBoyRating: 0,
      items: 2,
      orderItems: [
        {
          id: "7",
          name: "Chicken Wings",
          quantity: 500,
          unit: "g",
          price: 35.25,
          imageUrl: "/images/chicken-wings.jpg",
        },
        {
          id: "8",
          name: "Chicken Sausages",
          quantity: 200,
          unit: "g",
          price: 32,
          imageUrl: "/images/chicken-sausages.jpg",
        },
      ],
    },
  ],
  status: "idle",
  error: null,
};

// Async thunk for fetching orders (simulate API call)
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return initialState.orders;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift({ ...action.payload, id: Date.now().toString() });
    },
    editOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex((o) => o.id === action.payload.id);
      if (index !== -1) state.orders[index] = action.payload;
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: Order["status"] }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch orders";
      });
  },
});

export const { addOrder, editOrder, deleteOrder, updateOrderStatus } =
  ordersSlice.actions;
export default ordersSlice.reducer;
