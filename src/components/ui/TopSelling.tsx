// const topProducts = [
//   {
//     id: "p1",
//     name: "Whey Protein Isolate",
//     units: "1,234 units sold",
//     price: "₹2,499",
//     growth: "+15%",
//     img: "https://via.placeholder.com/60x60?text=WP", // replace with real
//   },
//   {
//     id: "p2",
//     name: "Mass Gainer Pro",
//     units: "987 units sold",
//     price: "₹3,299",
//     growth: "+12%",
//     img: "https://via.placeholder.com/60x60?text=MG",
//   },
//   {
//     id: "p3",
//     name: "BCAA Energy",
//     units: "756 units sold",
//     price: "₹1,899",
//     growth: "+8%",
//     img: "https://via.placeholder.com/60x60?text=BC",
//   },
//   {
//     id: "p4",
//     name: "Pre-Workout Boost",
//     units: "654 units sold",
//     price: "₹1,599",
//     growth: "+6%",
//     img: "https://via.placeholder.com/60x60?text=PW",
//   },
// ];

// function TopSelling() {
//   return (
//     <div className="mt-10 bg-white shadow-sm border border-gray-200 rounded-xl p-5">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-semibold">Top Selling Products</h2>
//         <button className="text-sm text-blue-600 hover:underline">
//           View All
//         </button>
//       </div>

//       <div className="space-y-4">
//         {topProducts.map((p) => (
//           <div
//             key={p.id}
//             className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
//           >
//             {/* LEFT */}
//             <div className="flex items-center gap-3">
//               <img
//                 src={p.img}
//                 alt={p.name}
//                 className="w-14 h-14 rounded-lg object-cover"
//               />

//               <div>
//                 <div className="font-medium text-sm">{p.name}</div>
//                 <div className="text-xs text-gray-500">{p.units}</div>
//               </div>
//             </div>

//             {/* RIGHT */}
//             <div className="text-right">
//               <div className="font-semibold text-sm">{p.price}</div>
//               <div className="text-green-600 text-xs font-medium">
//                 {p.growth}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TopSelling;

import React from "react";
import { FiTrendingUp, FiShoppingCart, FiMoreHorizontal } from "react-icons/fi";

const topProducts = [
  {
    id: "p1",
    name: "Whey Protein Isolate",
    units: "1,234 units sold",
    price: "₹2,499",
    growth: "+15%",
    img: "https://rawmanda.com/wp-content/uploads/2014/10/raw-vegan-mushroom-burritos-recipe-collard-wraps.jpg",
    category: "Supplements",
    rating: 4.8,
  },
  {
    id: "p2",
    name: "Mass Gainer Pro",
    units: "987 units sold",
    price: "₹3,299",
    growth: "+12%",
    img: "https://avocadopesto.com/wp-content/uploads/2017/06/Raw-Vegan-Recipes-Collard-Wraps.jpg",
    category: "Weight Gain",
    rating: 4.6,
  },
  {
    id: "p3",
    name: "BCAA Energy",
    units: "756 units sold",
    price: "₹1,899",
    growth: "+8%",
    img: "https://vegan.com/wp-content/uploads/elementor/thumbs/Vegan_raw_food-pw5ekls4li3lewyfue37kq41tpyxp1efrhiqp4hvhk.jpg",
    category: "Energy",
    rating: 4.7,
  },
  {
    id: "p4",
    name: "Pre-Workout Boost",
    units: "654 units sold",
    price: "₹1,599",
    growth: "+6%",
    img: "https://nutriciously.com/wp-content/uploads/24-lettuce-wraps.jpg",
    category: "Performance",
    rating: 4.5,
  },
];

function TopSelling() {
  // Calculate max units for progress bar
  const maxUnits = Math.max(
    ...topProducts.map((p) => parseInt(p.units.split(" ")[0].replace(",", "")))
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FiTrendingUp className="text-blue-600 mr-2 text-xl" />
            <h2 className="text-xl font-semibold text-gray-800">
              Top Selling Products
            </h2>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          {topProducts.map((product, index) => {
            const unitsSold = parseInt(
              product.units.split(" ")[0].replace(",", "")
            );
            const progressPercentage = (unitsSold / maxUnits) * 100;

            return (
              <div
                key={product.id}
                className="group relative bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {/* Ranking Badge */}
                <div
                  className={`absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0
                      ? "bg-yellow-500"
                      : index === 1
                      ? "bg-gray-400"
                      : index === 2
                      ? "bg-orange-600"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="flex items-center justify-between">
                  {/* LEFT - Product Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-sm"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                        <FiShoppingCart className="text-blue-600 text-xs" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800">
                          {product.name}
                        </h3>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                          {product.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-1">
                        <div className="text-xs text-gray-500">
                          {product.units}
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.rating})
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT - Price & Growth */}
                  <div className="text-right">
                    <div className="font-bold text-lg text-gray-800">
                      {product.price}
                    </div>
                    <div className="flex items-center justify-end mt-1">
                      <span className="text-green-600 text-sm font-medium flex items-center">
                        {product.growth}
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {/* <button className="ml-3 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiMoreHorizontal />
                  </button> */}
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="mt-6 text-center">
          <button className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopSelling;
