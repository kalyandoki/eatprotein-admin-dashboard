import { configureStore } from "@reduxjs/toolkit";
// Shop Reducers
import shopReducer from "../modules/shop/shopSlice";
import storeReducer from "../modules/stores/storeSlice";
import categoryReducer from "../modules/shop/categories/categorySlice";
import subCategoriesReducer from "../modules/shop/subCategories/subCategoriesSlice";
import brandReducer from "../modules/shop/brands/brandsSlice";
import uomReducer from "../modules/shop/uom/uomSlice";
import tagReducer from "../modules/shop/tags/tagsSlice";
import storeTagReducer from "../modules/shop/storeTags/storeTagsSlice";
//Order Module Reducers
import orderReducer from "../modules/orders/orderSlice";

// Banners Module Reducers
import bannerReducer from "../modules/banners/homeBanners/homeBannersSlice";
import categoryBannerReducer from "../modules/banners/categoryBanners/categoryBannersSlice";
import locationBannerReducer from "../modules/banners/locationBanners/locationBannersSlice";

import locationReducer from "../modules/locations/locationsSlice";

import productsReducer from "../modules/masterStore/productsSlice";
import monsterStoreReducer from "../modules/mosterStores/monsterStoreSlice";
import masterProductsReducer from "../modules/mosterStores/masterProducts/masterProductsSlice";

// Store Module Reducers
import storeListReducer from "../modules/stores/storeList/storeListSlice";
import storeWalletReducer from "../modules/stores/storeWallet/storeWalletSlice";
import storeAnalyticsReducer from "../modules/stores/storeAnalytics/storeAnalyticsSlice";
import storePayoutsReducer from "../modules/stores/storePayouts/storePayoutsSlice";
import storePaymentDetailsReducer from "../modules/payments/storePayments/storePaymentDetailsSlice";

// Coupons Module Reducers
import appCouponReducer from "../modules/coupons/appCoupons/appCouponsSlice";
import storeCouponReducer from "../modules/coupons/storeCoupons/storeCouponsSlice";
import locationCouponReducer from "../modules/coupons/locationCoupons/locationCouponsSlice";

// Payments Module Reducers
import paymentsReducer from "../modules/payments/payments/paymentsSlice";
import storePaymentsReducer from "../modules/payments/storePayments/storePaymentsSlice";
import franchisePaymentsReducer from "../modules/payments/franchise/franchisePaymentsSlice";
import deliveryBoysReducer from "../modules/payments/deliveryBoys/deliveryBoysSlice";

//Users Module Reducers
import customersReducer from "../modules/users/customers/customersSlice";
import franchiseOwnersReducer from "../modules/users/franchiseOwners/franchiseOwnersSlice";
import storeAdminsReducer from "../modules/users/storeAdmins/storeAdminsSlice";
import deliveryBoysUsersReducer from "../modules/users/deliveryBoys/deliveryBoysSlice";
import teamReducer from "../modules/users/team/teamSlice";

// Settlements Modules Reducer
import storeSettlementsReducer from "../modules/settlements/storeSettlements/storeSettlementsSlice";
import dbSettlementsReducer from "../modules/settlements/dbSettlements/dbSettlementsSlice";
import foSettlementsReducer from "../modules/settlements/foSettlements/foSettlementsSlice";
import storeSettlementDetailsReducer from "../modules/settlements/storeSettlementDetails/storeSettlementDetailsSlice";

// Franchise Modules Reducer
import franchiseReducer from "../modules/franchise/franchiseList/franchiseSlice";
import franchiseLocationReducer from "../modules/franchise/franchiseLocation/franchiseLocationSlice";

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

    homeBanners: bannerReducer,
    categoryBanners: categoryBannerReducer,
    locationBanners: locationBannerReducer,

    locations: locationReducer,

    products: productsReducer,
    monsterStores: monsterStoreReducer,
    masterProducts: masterProductsReducer,

    stores: storeReducer,
    storeList: storeListReducer,
    storeWallet: storeWalletReducer,
    storeAnalytics: storeAnalyticsReducer,
    storePayouts: storePayoutsReducer,
    storePaymentDetails: storePaymentDetailsReducer,

    appCoupons: appCouponReducer,
    storeCoupons: storeCouponReducer,
    locationCoupons: locationCouponReducer,

    payments: paymentsReducer,
    storePayments: storePaymentsReducer,
    franchisePayments: franchisePaymentsReducer,
    deliveryBoysPayments: deliveryBoysReducer,

    customers: customersReducer,
    franchiseOwners: franchiseOwnersReducer,
    storeAdmins: storeAdminsReducer,
    deliveryBoys: deliveryBoysUsersReducer,
    team: teamReducer,

    storeSettlements: storeSettlementsReducer,
    dbSettlements: dbSettlementsReducer,
    foSettlements: foSettlementsReducer,
    storeSettlementDetails: storeSettlementDetailsReducer,

    franchises: franchiseReducer,
    franchiseLocations: franchiseLocationReducer,

    ui: uiReducer,
    auth: authReducer,
    data: dataReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
