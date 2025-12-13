// // src/modules/shop/uom/uomSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface UOM {
//   id: number;
//   name: string;
//   abbreviation: string;
//   type: "Quantity" | "Length" | "Weight" | "Volume";
//   baseUnit: boolean;
//   conversion: number;
//   status: "Active" | "Inactive";
// }

// interface UOMState {
//   uoms: UOM[];
// }

// const initialState: UOMState = {
//   uoms: [
//     {
//       id: 1,
//       name: "Piece",
//       abbreviation: "pcs",
//       type: "Quantity",
//       baseUnit: true,
//       conversion: 1,
//       status: "Active",
//     },
//     {
//       id: 2,
//       name: "Meter",
//       abbreviation: "m",
//       type: "Length",
//       baseUnit: true,
//       conversion: 1,
//       status: "Active",
//     },
//   ],
// };

// const uomSlice = createSlice({
//   name: "uom",
//   initialState,
//   reducers: {
//     addUOM: (state, action: PayloadAction<UOM>) => {
//       state.uoms.push({ ...action.payload, id: Date.now() });
//     },
//     editUOM: (state, action: PayloadAction<UOM>) => {
//       const index = state.uoms.findIndex((u) => u.id === action.payload.id);
//       if (index !== -1) state.uoms[index] = action.payload;
//     },
//     deleteUOM: (state, action: PayloadAction<number>) => {
//       state.uoms = state.uoms.filter((u) => u.id !== action.payload);
//     },
//   },
// });

// export const { addUOM, editUOM, deleteUOM } = uomSlice.actions;
// export default uomSlice.reducer;

// src/modules/shop/uom/uomSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UOM {
  id: number;
  name: string;
  abbreviation: string;
  type: "Quantity" | "Length" | "Weight" | "Volume";
  baseUnit: boolean;
  conversion: number;
  status: "Active" | "Inactive";
}

interface UOMState {
  uoms: UOM[];
}

const initialState: UOMState = {
  uoms: [
    {
      id: 1,
      name: "Piece",
      abbreviation: "pcs",
      type: "Quantity",
      baseUnit: true,
      conversion: 1,
      status: "Active",
    },
    {
      id: 2,
      name: "Meter",
      abbreviation: "m",
      type: "Length",
      baseUnit: true,
      conversion: 1,
      status: "Active",
    },
  ],
};

const uomSlice = createSlice({
  name: "uom",
  initialState,
  reducers: {
    addUOM: (state, action: PayloadAction<UOM>) => {
      state.uoms.push({ ...action.payload, id: Date.now() });
    },
    editUOM: (state, action: PayloadAction<UOM>) => {
      const index = state.uoms.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) state.uoms[index] = action.payload;
    },
    deleteUOM: (state, action: PayloadAction<number>) => {
      state.uoms = state.uoms.filter((u) => u.id !== action.payload);
    },
    toggleUOMStatus: (state, action: PayloadAction<number>) => {
      const index = state.uoms.findIndex((u) => u.id === action.payload);
      if (index !== -1) {
        state.uoms[index].status =
          state.uoms[index].status === "Active" ? "Inactive" : "Active";
      }
    },
  },
});

export const { addUOM, editUOM, deleteUOM, toggleUOMStatus } = uomSlice.actions;
export default uomSlice.reducer;
