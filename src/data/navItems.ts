// export type NavItem = {
//   id: string;
//   label: string;
//   path: string;
//   icon: string; // icon component name from react-icons/fi etc.
//   children?: NavItem[];
// };

// export const navItems: NavItem[] = [
//   { id: "nav-header", label: "Navigation", path: "/", icon: "FiList" },
//   { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "FiHome" },
//   { id: "shop", label: "Shop Module", path: "/shop", icon: "FiShoppingCart" },
//   {
//     id: "master",
//     label: "Master Store",
//     path: "/master-store",
//     icon: "FiPackage",
//   },
//   {
//     id: "store-mgmt",
//     label: "Store Management",
//     path: "/store-management",
//     icon: "FiServer",
//   },
//   { id: "franchise", label: "Franchise", path: "/franchise", icon: "FiUsers" },
//   { id: "diet", label: "Diet Module", path: "/diet", icon: "FiHeart" },
//   {
//     id: "fitness",
//     label: "Fitness Module",
//     path: "/fitness",
//     icon: "FiActivity",
//   },
//   {
//     id: "recipes",
//     label: "Recipes Module",
//     path: "/recipes",
//     icon: "FiBookOpen",
//   },
//   { id: "cms", label: "CMS", path: "/cms", icon: "FiEdit" },
//   { id: "users", label: "Users", path: "/users", icon: "FiUser" },
//   {
//     id: "payments",
//     label: "Payments",
//     path: "/payments",
//     icon: "FiCreditCard",
//   },
//   {
//     id: "reports",
//     label: "Reports",
//     path: "/reports",
//     icon: "FiBarChart2",
//     children: [
//       {
//         id: "reports-daily",
//         label: "Daily",
//         path: "/reports/daily",
//         icon: "FiCalendar",
//       },
//       {
//         id: "reports-monthly",
//         label: "Monthly",
//         path: "/reports/monthly",
//         icon: "FiClock",
//       },
//     ],
//   },
//   { id: "settings", label: "Settings", path: "/settings", icon: "FiSettings" },

//   // duplicates / placeholders to simulate heavy list
//   {
//     id: "shop-dup-1",
//     label: "Shop Module (Alt)",
//     path: "/shop",
//     icon: "FiShoppingCart",
//   },
//   {
//     id: "shop-dup-2",
//     label: "Shop Module (Alt2)",
//     path: "/shop",
//     icon: "FiShoppingCart",
//   },
//   { id: "cms-dup", label: "CMS (Pages)", path: "/cms", icon: "FiEdit" },
//   {
//     id: "reports-dup",
//     label: "Reports (Custom)",
//     path: "/reports",
//     icon: "FiBarChart2",
//   },
//   { id: "profile", label: "Profile", path: "/profile", icon: "FiUser" },
// ];

export type NavItem = {
  id: string;
  label: string;
  path: string;
  icon: string; // icon component name from react-icons/fi etc.
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  { id: "nav-header", label: "Navigation", path: "/", icon: "FiList" },
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "FaHome" },
  {
    id: "shop",
    label: "Shop Module",
    path: "/shop",
    icon: "FaShoppingCart",
    children: [
      { id: "products", label: "Products", path: "shop/products" },
      { id: "categories", label: "Categories", path: "shop/categories" },
      {
        id: "sub-categories",
        label: "Sub Categories",
        path: "shop/sub-categories",
      },
      { id: "brands", label: "Brands", path: "shop/brands" },
      { id: "uom", label: "UOM", path: "shop/uom" },
      { id: "tags", label: "Tags", path: "shop/tags" },
      { id: "store-tags", label: "Store Tags", path: "shop/store-tags" },

      // { id: "orders", label: "Orders", path: "/orders" },
      // { id: "delivery", label: "Delivery Boys", path: "/delivery" },
    ],
  },
  { id: "orders", label: "Orders", path: "/orders", icon: "FaBoxOpen" },
  {
    id: "locations",
    label: "Locations",
    path: "/locations",
    icon: "FaMapMarkerAlt",
  },
  {
    id: "master",
    label: "Master Store",
    path: "/master-store",
    icon: "FaStore",
    children: [
      {
        id: "master-products",
        label: "Product Config",
        path: "/masterStore/master-store",
      },
      {
        id: "pricing",
        label: "Pricing & Commission",
        path: "/masterStore/pricing",
      },
      {
        id: "store-assignment",
        label: "Store Assignment",
        path: "/masterStore/store-assignment",
      },
    ],
  },
  {
    id: "stores",
    label: "Stores",
    path: "/stores",
    icon: "FaShop",
    children: [
      { id: "store-list", label: "Store List", path: "/stores/store-list" },
      {
        id: "store-wallet",
        label: "Store Wallet",
        path: "/stores/store-wallet",
      },
      { id: "store-payouts", label: "Payouts", path: "/stores/store-payouts" },
      {
        id: "store-analytics",
        label: "Analytics",
        path: "/stores/store-analytics",
      },
    ],
  },
  {
    id: "franchise",
    label: "Franchise",
    path: "/franchise",
    icon: "FaNetworkWired",
    children: [
      {
        id: "franchise-list",
        label: "Franchise List",
        path: "/franchise-list",
      },
      { id: "franchise-regions", label: "Regions", path: "/franchise-regions" },
      {
        id: "franchise-commission",
        label: "Commission",
        path: "/franchise-commission",
      },
      { id: "franchise-payouts", label: "Payouts", path: "/franchise-payouts" },
    ],
  },
  {
    id: "diet",
    label: "Diet Module",
    path: "/diet",
    icon: "FaAppleAlt",
    children: [
      { id: "nutritionists", label: "Nutritionists", path: "/nutritionists" },
      { id: "diet-plans", label: "Diet Plans", path: "/diet-plans" },
      {
        id: "family-profiles",
        label: "Family Profiles",
        path: "/family-profiles",
      },
      { id: "labs", label: "Labs", path: "/labs" },
      { id: "lab-reports", label: "Lab Reports", path: "/lab-reports" },
    ],
  },
  {
    id: "fitness",
    label: "Fitness Module",
    path: "/fitness",
    icon: "FaDumbbell",
    children: [
      { id: "fitpass", label: "FitPass Plans", path: "/fitpass" },
      {
        id: "fitness-centres",
        label: "Fitness Centres",
        path: "/fitness-centres",
      },
      { id: "classes", label: "Classes", path: "/classes" },
      { id: "rewards", label: "Rewards System", path: "/rewards" },
      { id: "attendance", label: "Attendance", path: "/attendance" },
    ],
  },
  {
    id: "recipes",
    label: "Recipes",
    path: "/recipes",
    icon: "FaUtensils",
    children: [
      { id: "recipe-list", label: "Recipe List", path: "/recipe-list" },
      {
        id: "recipe-categories",
        label: "Categories",
        path: "/recipe-categories",
      },
      { id: "creators", label: "Creators", path: "/creators" },
      {
        id: "creator-payouts",
        label: "Creator Payouts",
        path: "/creator-payouts",
      },
    ],
  },
  // {
  //   id: "cms",
  //   label: "CMS",
  //   path: "/cms",
  //   icon: "FaFileAlt",
  //   children: [
  //     { id: "banners", label: "Banners", path: "/banners" },
  //     { id: "offers", label: "Offers", path: "/offers" },
  //     { id: "sections", label: "Home Sections", path: "/sections" },
  //     { id: "notifications", label: "Notifications", path: "/notifications" },
  //     { id: "pages", label: "Static Pages", path: "/pages" },
  //     { id: "blogs", label: "Blogs", path: "/blogs" },
  //   ],
  // },
  { id: "users", label: "Users", path: "/users", icon: "FaUsers" },
  {
    id: "payments",
    label: "Payments",
    path: "/payments",
    icon: "FaCreditCard",
    children: [
      { id: "transactions", label: "Transactions", path: "/transactions" },
      { id: "settlements", label: "Settlements", path: "/settlements" },
      { id: "refunds", label: "Refunds", path: "/refunds" },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    path: "/reports",
    icon: "FaChartBar",
    children: [
      { id: "sales-reports", label: "Sales Reports", path: "/sales-reports" },
      { id: "analytics", label: "Analytics", path: "/analytics" },
      { id: "performance", label: "Performance", path: "/performance" },
    ],
  },
  { id: "settings", label: "Settings", path: "/settings", icon: "FaCog" },
];
