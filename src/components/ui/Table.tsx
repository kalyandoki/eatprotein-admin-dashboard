import React from "react";

export default function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-auto bg-white rounded-2xl p-2 shadow-soft border border-gray-100">
      <table className="min-w-full text-sm">{children}</table>
    </div>
  );
}
