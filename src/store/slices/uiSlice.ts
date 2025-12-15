// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

// export type UiState = {
//   sidebarOpen: boolean;
//   sidebarCollapsed: boolean;
//   darkMode: boolean;
//   searchQuery: string;
// };

// const initialState: UiState = {
//   sidebarOpen: false,
//   sidebarCollapsed: false,
//   darkMode: false,
//   searchQuery: "",
// };

// const uiSlice = createSlice({
//   name: "ui",
//   initialState,
//   reducers: {
//     toggleSidebar(state) {
//       state.sidebarOpen = !state.sidebarOpen;
//     },
//     setSidebarCollapsed(state, action: PayloadAction<boolean>) {
//       state.sidebarCollapsed = action.payload;
//     },
//     toggleDarkMode(state) {
//       state.darkMode = !state.darkMode;
//       try {
//         localStorage.setItem("eatprotien:dark", JSON.stringify(state.darkMode));
//       } catch {}
//     },
//     setSearchQuery(state, action: PayloadAction<string>) {
//       state.searchQuery = action.payload;
//     },
//   },
// });

// export const {
//   toggleSidebar,
//   setSidebarCollapsed,
//   toggleDarkMode,
//   setSearchQuery,
// } = uiSlice.actions;

// export const selectUi = (state: RootState) => state.ui;

// export default uiSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// --- NEW: Define the shape of the confirmation modal's state ---
interface ConfirmationModalState {
  isVisible: boolean;
  title?: string;
  message?: string;
  confirmButtonText?: string;
  // NOTE: Storing functions in Redux state is generally discouraged
  // because state should be serializable. However, for UI-only state
  // that doesn't need to be persisted or rehydrated from storage,
  // this is a common and acceptable pattern that simplifies the logic.
  onConfirm?: () => void;
  onCancel?: () => void;
}

export type UiState = {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  darkMode: boolean;
  searchQuery: string;
  // --- NEW: Add the confirmation modal state to the UI state ---
  confirmationModal: ConfirmationModalState;
};

const initialState: UiState = {
  sidebarOpen: false,
  sidebarCollapsed: false,
  darkMode: false,
  searchQuery: "",
  // --- NEW: Add the initial state for the confirmation modal ---
  confirmationModal: {
    isVisible: false,
    title: "Confirm Action",
    message: "Are you sure you want to proceed?",
    confirmButtonText: "Confirm",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // --- Your existing reducers remain unchanged ---
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      try {
        localStorage.setItem("eatprotien:dark", JSON.stringify(state.darkMode));
      } catch {}
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },

    // --- NEW: Reducers for the Confirmation Modal ---

    /**
     * Action to show the modal with specific details.
     * The payload contains all modal properties except for `isVisible`.
     */
    showConfirmationModal: (
      state,
      action: PayloadAction<Omit<ConfirmationModalState, "isVisible">>
    ) => {
      state.confirmationModal = {
        isVisible: true,
        ...action.payload,
      };
    },

    /**
     * Action to hide the modal.
     */
    hideConfirmationModal: (state) => {
      state.confirmationModal.isVisible = false;
    },
  },
});

// --- Export all actions, including the new ones ---
export const {
  toggleSidebar,
  setSidebarCollapsed,
  toggleDarkMode,
  setSearchQuery,
  showConfirmationModal,
  hideConfirmationModal,
} = uiSlice.actions;

// Your existing selector remains unchanged
export const selectUi = (state: RootState) => state.ui;

export default uiSlice.reducer;
