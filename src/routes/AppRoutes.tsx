import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import UsersPage from "../pages/UsersPage";
import SettingsPage from "../pages/SettingsPage";

const ShopModulePage = lazy(() => import("../pages/ShopModulePage"));
// const MasterStorePage = lazy(() => import("../pages/MasterStorePage"));
const StoreManagementPage = lazy(() => import("../pages/StoreManagementPage"));
const FranchisePage = lazy(() => import("../pages/FranchisePage"));
const DietModulePage = lazy(() => import("../pages/DietModulePage"));
const FitnessModulePage = lazy(() => import("../pages/FitnessModulePage"));
const RecipesModulePage = lazy(() => import("../pages/RecipesModulePage"));
const CMSPage = lazy(() => import("../pages/CMSPage"));
const PaymentsPage = lazy(() => import("../pages/PaymentsPage"));
const ReportsPage = lazy(() => import("../pages/ReportsPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const ShopProductsPage = lazy(
  () => import("../modules/shop/pages/ShopProductsPage")
);
const ShopCategoryPage = lazy(
  () => import("../modules/shop/categories/pages/CategoriesPage")
);
const ShopSubCategoriesPage = lazy(
  () => import("../modules/shop/subCategories/pages/SubCategoriesPage")
);
const ShopBrandsPage = lazy(
  () => import("../modules/shop/brands/pages/BrandsPage")
);
const ShopUOMPage = lazy(() => import("../modules/shop/uom/pages/UOMPage"));
const ShopTagsPage = lazy(() => import("../modules/shop/tags/pages/TagsPage"));
const StoreTagsPage = lazy(
  () => import("../modules/shop/storeTags/pages/StoreTagsPage")
);

const OrdersPage = lazy(() => import("../modules/orders/pages/OrdersPage"));
const LocationsPage = lazy(
  () => import("../modules/locations/pages/LocationsPage")
);

const MasterStorePage = lazy(
  () =>
    import("../modules/mosterStores/masterProducts/pages/MasterProductsPage")
);
// const MasterStoreAssignmentPage = lazy(
//   () =>
//     import("../modules/mosterStores/storeAssignment/pages/StoreAssignmentPage")
// );

const StoreListPage = lazy(
  () => import("../modules/stores/storeList/pages/StoreListPage")
);
const StoreWalletPage = lazy(
  () => import("../modules/stores/storeWallet/pages/StoreWalletPage")
);
const StoreAnalyticsPage = lazy(
  () => import("../modules/stores/storeAnalytics/pages/StoreAnalyticsPage")
);
const StorePayoutsPage = lazy(
  () => import("../modules/stores/storePayouts/pages/StorePayoutsPage")
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Shop Module Routes */}
      <Route path="/shop" element={<ShopModulePage />} />
      <Route path="/shop/products" element={<ShopProductsPage />} />
      <Route path="/shop/categories" element={<ShopCategoryPage />} />
      <Route path="/shop/sub-categories" element={<ShopSubCategoriesPage />} />
      <Route path="/shop/brands" element={<ShopBrandsPage />} />
      <Route path="/shop/uom" element={<ShopUOMPage />} />
      <Route path="/shop/tags" element={<ShopTagsPage />} />
      <Route path="/shop/store-tags" element={<StoreTagsPage />} />

      {/* Orders Module Route */}
      <Route path="/orders" element={<OrdersPage />} />
      {/* Locations Module Route */}
      <Route path="/locations" element={<LocationsPage />} />

      {/* Master Store Module Routes */}
      <Route path="/masterStore/master-store" element={<MasterStorePage />} />
      {/* <Route
        path="/masterStore/store-assignment"
        element={<MasterStoreAssignmentPage />}
      /> */}

      {/* Store Module Routes */}
      <Route path="/stores/store-list" element={<StoreListPage />} />
      <Route path="/stores/store-wallet" element={<StoreWalletPage />} />
      <Route path="/stores/store-analytics" element={<StoreAnalyticsPage />} />
      <Route path="/stores/store-payouts" element={<StorePayoutsPage />} />

      <Route path="/master-store" element={<MasterStorePage />} />
      <Route path="/store-management" element={<StoreManagementPage />} />
      <Route path="/franchise" element={<FranchisePage />} />
      <Route path="/diet" element={<DietModulePage />} />
      <Route path="/fitness" element={<FitnessModulePage />} />
      <Route path="/recipes" element={<RecipesModulePage />} />
      <Route path="/cms" element={<CMSPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}
