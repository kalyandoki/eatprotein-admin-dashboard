import React from "react";

export default function Avatar({
  name,
  size = 40,
}: {
  name: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="flex items-center justify-center bg-white text-brand-dark font-semibold rounded-full"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
