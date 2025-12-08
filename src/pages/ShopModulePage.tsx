import React from "react";
import Card from "../components/ui/Card";

export default function ShopModulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Shop Module</h2>
        <p className="text-sm text-gray-600">Manage products and inventory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <Card key={i}>
            <div className="h-40 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
              Image {i + 1}
            </div>
            <div className="font-medium">Product {i + 1}</div>
            <div className="text-xs text-gray-500">Tags: Protein, Store</div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-2 rounded bg-brand text-white">
                View
              </button>
              <button className="px-3 py-2 rounded border">Edit</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
