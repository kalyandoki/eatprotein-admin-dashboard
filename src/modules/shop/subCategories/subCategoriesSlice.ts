// // import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // export interface SubCategory {
// //   id: number;
// //   name: string;
// //   mainCategory: string;
// //   description: string;
// //   status: "Active" | "Inactive";
// //   items: number;
// //   order: number;
// // }

// // interface SubCategoriesState {
// //   subCategories: SubCategory[];
// // }

// // const initialState: SubCategoriesState = {
// //   subCategories: [
// //     {
// //       id: 1,
// //       name: "Pizza",
// //       mainCategory: "Food & Beverages",
// //       description: "All types of pizza varieties",
// //       status: "Active",
// //       items: 45,
// //       order: 1,
// //     },
// //     {
// //       id: 2,
// //       name: "Burgers",
// //       mainCategory: "Food & Beverages",
// //       description: "Burger varieties and combos",
// //       status: "Active",
// //       items: 32,
// //       order: 2,
// //     },
// //     {
// //       id: 3,
// //       name: "Beverages",
// //       mainCategory: "Food & Beverages",
// //       description: "Cold and hot drinks",
// //       status: "Active",
// //       items: 28,
// //       order: 3,
// //     },
// //   ],
// // };

// // const subCategoriesSlice = createSlice({
// //   name: "subCategories",
// //   initialState,
// //   reducers: {
// //     addSubCategory: (state, action: PayloadAction<Omit<SubCategory, "id">>) => {
// //       state.subCategories.push({
// //         ...action.payload,
// //         id: Date.now(),
// //       });
// //     },

// //     editSubCategory: (state, action: PayloadAction<SubCategory>) => {
// //       const index = state.subCategories.findIndex(
// //         (c) => c.id === action.payload.id
// //       );
// //       if (index !== -1) {
// //         state.subCategories[index] = action.payload;
// //       }
// //     },

// //     deleteSubCategory: (state, action: PayloadAction<number>) => {
// //       state.subCategories = state.subCategories.filter(
// //         (c) => c.id !== action.payload
// //       );
// //     },
// //   },
// // });

// // export const { addSubCategory, editSubCategory, deleteSubCategory } =
// //   subCategoriesSlice.actions;

// // export default subCategoriesSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface SubCategory {
//   id: number;
//   name: string;
//   mainCategory: string;
//   description: string;
//   status: "Active" | "Inactive";
//   items: number;
//   order: number;
// }

// interface SubCategoriesState {
//   subCategories: SubCategory[];
// }

// const initialState: SubCategoriesState = {
//   subCategories: [
//     {
//       id: 1,
//       name: "Pizza",
//       mainCategory: "Food & Beverages",
//       description: "All types of pizza varieties",
//       status: "Active",
//       items: 45,
//       order: 1,
//     },
//     {
//       id: 2,
//       name: "Burgers",
//       mainCategory: "Food & Beverages",
//       description: "Burger varieties and combos",
//       status: "Active",
//       items: 32,
//       order: 2,
//     },
//     {
//       id: 3,
//       name: "Beverages",
//       mainCategory: "Food & Beverages",
//       description: "Cold and hot drinks",
//       status: "Active",
//       items: 28,
//       order: 3,
//     },
//   ],
// };

// const subCategoriesSlice = createSlice({
//   name: "subCategories",
//   initialState,
//   reducers: {
//     addSubCategory: (state, action: PayloadAction<Omit<SubCategory, "id">>) => {
//       state.subCategories.push({
//         ...action.payload,
//         id: Date.now(),
//       });
//     },
//     editSubCategory: (state, action: PayloadAction<SubCategory>) => {
//       const index = state.subCategories.findIndex(
//         (c) => c.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.subCategories[index] = action.payload;
//       }
//     },
//     deleteSubCategory: (state, action: PayloadAction<number>) => {
//       state.subCategories = state.subCategories.filter(
//         (c) => c.id !== action.payload
//       );
//     },
//   },
// });

// export const { addSubCategory, editSubCategory, deleteSubCategory } =
//   subCategoriesSlice.actions;

// export default subCategoriesSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SubCategory {
  id: number;
  name: string;
  mainCategory: string;
  description: string;
  status: "Active" | "Inactive";
  items: number;
  order: number;
}

interface SubCategoriesState {
  subCategories: SubCategory[];
}

const initialState: SubCategoriesState = {
  subCategories: [
    {
      id: 1,
      name: "Pizza",
      mainCategory: "Food & Beverages",
      description: "All types of pizza varieties",
      status: "Active",
      items: 45,
      order: 1,
    },
    {
      id: 2,
      name: "Burgers",
      mainCategory: "Food & Beverages",
      description: "Burger varieties and combos",
      status: "Active",
      items: 32,
      order: 2,
    },
    {
      id: 3,
      name: "Beverages",
      mainCategory: "Food & Beverages",
      description: "Cold and hot drinks",
      status: "Active",
      items: 28,
      order: 3,
    },
  ],
};

const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {
    addSubCategory: (state, action: PayloadAction<Omit<SubCategory, "id">>) => {
      state.subCategories.push({
        ...action.payload,
        id: Date.now(),
      });
    },
    editSubCategory: (state, action: PayloadAction<SubCategory>) => {
      const index = state.subCategories.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.subCategories[index] = action.payload;
      }
    },
    updateSubCategory: (state, action: PayloadAction<SubCategory>) => {
      const index = state.subCategories.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.subCategories[index] = action.payload;
      }
    },
    deleteSubCategory: (state, action: PayloadAction<number>) => {
      state.subCategories = state.subCategories.filter(
        (c) => c.id !== action.payload
      );
    },
  },
});

export const {
  addSubCategory,
  editSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = subCategoriesSlice.actions;

export default subCategoriesSlice.reducer;
