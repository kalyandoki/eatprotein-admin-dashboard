// src/components/common/NotFoundPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiAlertTriangle,
  FiSearch,
  FiHelpCircle,
} from "react-icons/fi";

interface NotFoundPageProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  customMessage?: string;
  showSearch?: boolean;
  searchUrl?: string;
}

export default function NotFoundPage({
  title = "Page Not Found",
  subtitle = "The page you are looking for does not exist or was moved.",
  showBackButton = true,
  customMessage,
  showSearch = true,
  searchUrl = "/customers",
}: NotFoundPageProps) {
  return (
    <div className="min-h-screen  flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon with Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="animate-ping absolute inline-flex h-full w-20 rounded-full bg-emerald-400 opacity-75"></div>
            <div className="relative inline-flex h-20 w-20 rounded-full bg-emerald-500 flex items-center justify-center">
              <FiAlertTriangle className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6 inline-flex items-center justify-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 font-mono text-lg font-bold">
            404
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>

        {/* Error Subtitle */}
        <p className="text-lg text-gray-600  mb-6">{subtitle}</p>

        {/* Custom Message */}
        {customMessage && (
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {customMessage}
          </p>
        )}

        {/* Back to Home Button */}
        {showBackButton && (
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
            >
              <FiHome className="h-5 w-5 mr-2" />
              Go Back Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
