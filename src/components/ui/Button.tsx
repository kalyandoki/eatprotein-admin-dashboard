import React from "react";

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
}) {
  const base =
    "px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 inline-flex items-center gap-2";
  const variants: Record<string, string> = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    ghost: "bg-gray-100 hover:bg-gray-200 text-gray-800",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
