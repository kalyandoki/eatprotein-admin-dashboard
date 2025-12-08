import React from "react";

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand"
    />
  );
}
