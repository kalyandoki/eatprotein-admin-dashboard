import { configureStore } from "@reduxjs/toolkit";
// Shop Reducers
import shopReducer from "../modules/shop/shopSlice";
import categoryReducer from "../modules/shop/categories/categorySlice";
import subCategoriesReducer from "../modules/shop/subCategories/subCategoriesSlice";
import brandReducer from "../modules/shop/brands/brandsSlice";
import uomReducer from "../modules/shop/uom/uomSlice";
import tagReducer from "../modules/shop/tags/tagsSlice";
import storeTagReducer from "../modules/shop/storeTags/storeTagsSlice";
//Order Module Reducers
import orderReducer from "../modules/orders/orderSlice";

import locationReducer from "../modules/locations/locationsSlice";

import masterProductsReducer from "../modules/mosterStores/masterProducts/masterProductsSlice";
// import pricingReducer from "../modules/mosterStores/pricing/pricingSlice";
// import storeAssignmentReducer from "../modules/mosterStores/storeAssignment/storeAssignmentSlice";

// Store Module Reducers
import storeListReducer from "../modules/stores/storeList/storeListSlice";
import storeWalletReducer from "../modules/stores/storeWallet/storeWalletSlice";
import storeAnalyticsReducer from "../modules/stores/storeAnalytics/storeAnalyticsSlice";
import storePayoutsReducer from "../modules/stores/storePayouts/storePayoutsSlice";

import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import dataReducer from "./slices/dataSlice";

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    categories: categoryReducer,
    subCategories: subCategoriesReducer,
    brands: brandReducer,
    uom: uomReducer,
    tags: tagReducer,
    storeTags: storeTagReducer,

    orders: orderReducer,
    locations: locationReducer,

    masterProducts: masterProductsReducer,
    // pricing: pricingReducer,
    // storeAssignment: storeAssignmentReducer,

    storeList: storeListReducer,
    storeWallet: storeWalletReducer,
    storeAnalytics: storeAnalyticsReducer,
    storePayouts: storePayoutsReducer,

    ui: uiReducer,
    auth: authReducer,
    data: dataReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
