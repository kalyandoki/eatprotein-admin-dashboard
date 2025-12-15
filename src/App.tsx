import React, { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import { useAppSelector } from "./store/hooks";
import { selectUi } from "./store/slices/uiSlice";
import ConfirmationModal from "./components/common/ConfirmationModal";

/**
 * App layout: Sidebar (persistent) + Header + Main
 */
export default function App() {
  const { sidebarCollapsed } = useAppSelector(selectUi);

  return (
    <div className="min-h-screen flex bg-page-bg">
      <Sidebar />
      <div
        className="flex-1 flex flex-col min-h-screen"
        style={{ minWidth: 0 }}
      >
        <Header />
        <main
          id="main"
          className={`p-1 transition-all duration-200`}
          aria-live="polite"
        >
          <Suspense
            fallback={
              <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                  <p className="mt-4 text-gray-600">Loading...</p>
                </div>
              </div>
            }
          >
            <AppRoutes />
          </Suspense>
        </main>
      </div>
      <ConfirmationModal />
    </div>
  );
}
