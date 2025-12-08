import React, { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import { useAppSelector } from "./store/hooks";
import { selectUi } from "./store/slices/uiSlice";

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
          className={`p-6 transition-all duration-200`}
          aria-live="polite"
        >
          <Suspense fallback={<div>Loading...</div>}>
            <AppRoutes />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
